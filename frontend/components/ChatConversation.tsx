import { Box, Flex, VStack, HStack, Badge } from "@chakra-ui/react";
import { LuUser, LuBot } from "react-icons/lu";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

export interface Message {
  id: string;
  content: string | React.ReactNode;
  type: "human" | "ai" | "tool";
  tool_calls?: unknown;
  name?: string;
}

interface ChatConversationProps {
  messages: Message[];
}

export interface ChatConversationRef {
  scrollToBottom: () => void;
}

export const ChatConversation = forwardRef<
  ChatConversationRef,
  ChatConversationProps
>(({ messages }, ref) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));

  // Auto-scroll when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <VStack
      ref={scrollContainerRef}
      flex={1}
      gap={4}
      align="stretch"
      overflowY="auto"
      padding={4}
      width="full"
    >
      {messages?.map((message) => {
        if (message?.type === "tool") {
          return (
            <Flex
              key={`${message.id}}`}
              justify={"center"}
              alignItems={"center"}
              marginY={4}
              alignSelf="center"
              width="full"
            >
              {message?.content}
            </Flex>
          );
        } else {
          return (
            <Flex
              key={`${message.id}}`}
              justify={message.type === "human" ? "flex-end" : "flex-start"}
            >
              <HStack
                maxW="70%"
                gap={3}
                align="flex-start"
                direction={message.type === "human" ? "row-reverse" : "row"}
              >
                <Box
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg={message.type === "human" ? "blue.500" : "gray.500"}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  {message.type === "human" ? (
                    <LuUser size={16} />
                  ) : (
                    <LuBot size={16} />
                  )}
                </Box>
                <Box
                  bg={message?.type === "human" ? "blue.500" : "gray.100"}
                  color={message?.type === "human" ? "white" : "black"}
                  padding={3}
                  borderRadius="lg"
                  maxW="100%"
                  wordBreak="break-word"
                >
                  <Box fontSize="sm">{message?.content}</Box>
                </Box>
              </HStack>
            </Flex>
          );
        }
      })}
    </VStack>
  );
});

ChatConversation.displayName = "ChatConversation";
