/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Container,
  Flex,
  Input,
  IconButton,
  Card,
  VStack,
  Text,
  HStack,
  Box,
  Code,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";
import qs from "query-string";
import {
  ChatConversation,
  Message,
  ChatConversationRef,
} from "../components/ChatConversation";
import { useEffect, useRef, useState } from "react";
import { LuExternalLink } from "react-icons/lu";

type AGENT_STATE = {
  mode: "slot-filling" | "search" | "qa" | "wait-feedback";
  queryOptimized: string;
  requirementOptimized: string;
  hiringFeedback: string[];
  orderCodes: string[];
};

export default function Home() {
  const eventSourceRef = useRef<EventSource | null>(null);
  const eventSourceFeedbackRef = useRef<EventSource | null>(null);
  const chatConversationRef = useRef<ChatConversationRef>(null);

  // Sample messages to demonstrate the chat conversation
  const sampleMessages: Message[] = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      type: "ai",
    },
  ];

  const [threadId] = useState<string>(new Date().getTime().toString());
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agentState, setAgentState] = useState<AGENT_STATE | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      console.log("Starting to send message:", inputValue.trim());
      setInputValue("");

      // Close existing connection if any
      if (eventSourceRef.current) {
        console.log("Closing existing connection");
        eventSourceRef.current.close();
      }

      // Create new EventSource connection
      const encodedQuery = encodeURIComponent(inputValue.trim());
      const url = `http://localhost:8080/ai/agent/v1/search.assistant?q=${encodedQuery.trim()}&thread_id=${threadId}`;
      console.log("Connecting to:", url);

      eventSourceRef.current = new EventSource(url);

      // Set up event handlers
      eventSourceRef.current.onopen = () => {
        console.log("Connection established successfully");
        console.log("Initial readyState:", eventSourceRef.current?.readyState);
      };

      eventSourceRef.current.addEventListener("connected", () => {
        console.log("connected");
        setIsLoading(true);
      });
      eventSourceRef.current.addEventListener("updated", (event) => {
        const response = JSON.parse(event.data) as {
          message: Message;
          state: AGENT_STATE;
        };

        if (["human"].includes(response?.message?.type)) {
          setMessages((prev) => [...prev, response.message]);
        } else if (["tool"].includes(response?.message?.type)) {
          if (response?.message?.name === "search_product") {
            const products = JSON.parse(
              response?.message?.content as string
            ) as unknown as {
              id: string;
              image: string;
              title: string;
              description: string;
              base_price: string;
            }[];
            setSearchedProducts(products);

            setMessages((prev) => [
              ...prev,
              {
                ...response.message,
                content: (
                  <Flex maxW="full" overflowX="auto" padding={4} gap={2}>
                    {products?.map((product) => {
                      return (
                        <Card.Root key={product?.id} minW="280px">
                          <Card.Body gap="2" padding={2}>
                            <Image
                              width={"full"}
                              src={product?.image}
                              alt="test"
                            />
                            <Card.Title mt="2" fontSize="md" lineClamp="2">
                              {product?.title}
                            </Card.Title>
                            <Card.Description>
                              <Text truncate lineClamp="1">
                                {product?.description}
                              </Text>
                            </Card.Description>
                          </Card.Body>
                          <Card.Footer padding={2}>
                            <Text fontWeight="bold" fontSize="small">
                              {product?.base_price} บาท
                            </Text>
                          </Card.Footer>
                        </Card.Root>
                      );
                    })}
                  </Flex>
                ),
              },
            ]);
          }
        } else if (["ai"].includes(response?.message?.type)) {
          if (response?.message?.content) {
            setMessages((prev) => [...prev, response.message]);
          } else if (response?.message?.tool_calls) {
            setMessages((prev) => [
              ...prev,
              {
                ...response.message,
                type: "tool",
                content: (
                  <Code
                    padding={2}
                    maxW="500px"
                    colorPalette="white"
                    whiteSpace="pre-wrap"
                  >
                    {JSON.stringify(response.message?.tool_calls)}
                  </Code>
                ),
              },
            ]);
          }
        }

        if (response.state) {
          setAgentState(response.state);
        }
      });
      eventSourceRef.current.addEventListener("end", () => {
        eventSourceRef.current?.close();
        setIsLoading(false);
        chatConversationRef.current?.scrollToBottom();
      });

      eventSourceRef.current.onerror = (error) => {
        console.error("EventSource error:", error);
        console.log(
          "EventSource readyState:",
          eventSourceRef.current?.readyState
        );
        eventSourceRef.current?.close();
      };
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleAcceptHiring = () => {
    // Close existing connection if any
    if (eventSourceFeedbackRef.current) {
      console.log("Closing existing connection");
      eventSourceFeedbackRef.current.close();
    }

    // Create new EventSource connection

    const url = `http://localhost:8080/ai/agent/v1/search.assistantFeedback?${qs.stringify(
      {
        product_ids: searchedProducts.map((product) => product.id),
        thread_id: threadId,
      }
    )}`;
    // console.log("Connecting to:", url);

    eventSourceFeedbackRef.current = new EventSource(url);

    // Set up event handlers
    eventSourceFeedbackRef.current.onopen = () => {
      console.log("Connection established successfully");
      console.log(
        "Initial readyState:",
        eventSourceFeedbackRef.current?.readyState
      );
    };

    eventSourceFeedbackRef.current.addEventListener("connected", () => {
      console.log("connected");
      setIsLoading(true);
    });
    eventSourceFeedbackRef.current.addEventListener("updated", (event) => {
      const response = JSON.parse(event.data) as {
        message: Message;
        state: AGENT_STATE;
      };

      console.log(response);
      if (["human"].includes(response?.message?.type)) {
        setMessages((prev) => [...prev, response.message]);
      } else if (["tool"].includes(response?.message?.type)) {
        if (response?.message?.name === "search_product") {
          const products = JSON.parse(
            response?.message?.content as string
          ) as unknown as {
            id: string;
            image: string;
            title: string;
            description: string;
            base_price: string;
          }[];
          setSearchedProducts(products);

          setMessages((prev) => [
            ...prev,
            {
              ...response.message,
              content: (
                <Flex maxW="full" overflowX="auto" padding={4} gap={2}>
                  {products?.map((product) => {
                    return (
                      <Card.Root key={product?.id} minW="280px">
                        <Card.Body gap="2" padding={2}>
                          <Image
                            width={"full"}
                            src={product?.image}
                            alt="test"
                          />
                          <Card.Title mt="2" fontSize="md" lineClamp="2">
                            {product?.title}
                          </Card.Title>
                          <Card.Description>
                            <Text truncate lineClamp="1">
                              {product?.description}
                            </Text>
                          </Card.Description>
                        </Card.Body>
                        <Card.Footer padding={2}>
                          <Text fontWeight="bold" fontSize="small">
                            {product?.base_price} บาท
                          </Text>
                        </Card.Footer>
                      </Card.Root>
                    );
                  })}
                </Flex>
              ),
            },
          ]);
        }
        if (response?.message?.name === "order_ids") {
          const orderCodes = JSON.parse(
            response?.message?.content as string
          ) as unknown as string[];

          setMessages((prev) => [
            ...prev,
            {
              ...response.message,
              content: (
                <Flex maxW="full" overflowX="auto" padding={4} gap={2}>
                  {orderCodes?.map((code) => {
                    return (
                      <Link
                        href={`https://chat-staging.fastwork.co/message/${code}`}
                        target="_blank"
                        key={code}
                      >
                        <Code colorPalette="purple" variant="surface">
                          {code}

                          <LuExternalLink />
                        </Code>
                      </Link>
                    );
                  })}
                </Flex>
              ),
            },
          ]);
        }
      } else if (["ai"].includes(response?.message?.type)) {
        if (response?.message?.content) {
          setMessages((prev) => [...prev, response.message]);
        } else if (response?.message?.tool_calls) {
          setMessages((prev) => [
            ...prev,
            {
              ...response.message,
              type: "tool",
              content: (
                <Code
                  padding={2}
                  maxW="500px"
                  colorPalette="white"
                  whiteSpace="pre-wrap"
                >
                  {JSON.stringify(response.message?.tool_calls)}
                </Code>
              ),
            },
          ]);
        }
      }

      if (response.state) {
        setAgentState(response.state);
      }
    });
    eventSourceFeedbackRef.current.addEventListener("end", () => {
      eventSourceFeedbackRef.current?.close();
      setIsLoading(false);
      chatConversationRef.current?.scrollToBottom();
    });

    eventSourceFeedbackRef.current.onerror = (error) => {
      console.error("EventSource error:", error);
      console.log(
        "EventSource readyState:",
        eventSourceFeedbackRef.current?.readyState
      );
      eventSourceFeedbackRef.current?.close();
    };
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      if (eventSourceFeedbackRef.current) {
        eventSourceFeedbackRef.current.close();
      }
    };
  }, []);

  return (
    <Container
      height={"100dvh"}
      margin="auto"
      as="main"
      maxW="container.xl"
      display="flex"
      flexDirection={"column"}
    >
      <HStack height="full" marginY={4}>
        <VStack
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          height="full"
          width="2/3"
        >
          <ChatConversation ref={chatConversationRef} messages={messages} />
          <VStack width="full" gap={0}>
            {agentState?.mode === "wait-feedback" && (
              <Flex
                width={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={4}
              >
                <Button
                  colorPalette="red"
                  variant="surface"
                  paddingX={4}
                  rounded="full"
                  onClick={() =>
                    alert("do not implemented. please click accept only")
                  }
                >
                  decline
                </Button>
                <Button
                  colorPalette="green"
                  variant="surface"
                  paddingX={4}
                  rounded="full"
                  onClick={handleAcceptHiring}
                >
                  accept
                </Button>
              </Flex>
            )}

            <HStack width="full" gap={2} padding={4}>
              <Input
                paddingX={4}
                flex={1}
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <IconButton
                aria-label="Send message"
                onClick={handleSendMessage}
                disabled={!inputValue}
                loading={isLoading}
              >
                <LuSend />
              </IconButton>
            </HStack>
          </VStack>
        </VStack>
        <VStack alignItems="flex-start" height="full" width="1/3">
          <Box
            padding={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            width="full"
          >
            <Text>
              Mode:{" "}
              <Code colorPalette="yellow">{agentState?.mode || "N/A"}</Code>
            </Text>
            <Text>
              Query Optimized:{" "}
              <Code>{agentState?.queryOptimized || "N/A"}</Code>
            </Text>
            <Text>
              Brief Optimized:{" "}
              <Code>{agentState?.requirementOptimized || "N/A"}</Code>
            </Text>
            <Text>Hiring Products: </Text>
            <HStack flexWrap="wrap" gap={2}>
              {agentState?.hiringFeedback?.map((feedback) => {
                return (
                  <Code variant="solid" key={feedback}>
                    {feedback}
                  </Code>
                );
              }) || "N/A"}
            </HStack>
            <Text>Order Codes: </Text>
            <HStack flexWrap="wrap" gap={2}>
              {agentState?.orderCodes?.map((code) => {
                return (
                  //   <Code variant="solid" key={code}>
                  //     {code}
                  //   </Code>

                  <Link
                    href={`https://chat-staging.fastwork.co/message/${code}`}
                    target="_blank"
                    key={code}
                  >
                    <Code colorPalette="purple" variant="surface">
                      {code}

                      <LuExternalLink />
                    </Code>
                  </Link>
                );
              }) || "N/A"}
            </HStack>
          </Box>
        </VStack>
      </HStack>
    </Container>
  );
}
