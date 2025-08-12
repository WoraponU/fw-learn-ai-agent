import {
  Annotation,
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph'

import {
  hiringActionNode,
  hiringFeedbackNode,
} from '@/workflows/search-assistant/nodes/hiring-feedback.node'
import {
  productRetrieverNode,
  semanticSearchProductToolNode,
} from '@/workflows/search-assistant/nodes/product-retriever.node'
import { queryOptimizerNode } from '@/workflows/search-assistant/nodes/query-optimizer.node'
import { requirementOptimizerNode } from '@/workflows/search-assistant/nodes/requirement-optimizer.node'
import {
  supervisorAction,
  supervisorNode,
} from '@/workflows/search-assistant/nodes/supervisor.node'

export const GraphState = Annotation.Root({
  ...MessagesAnnotation.spec,
  mode: Annotation<
    'slot-filling' | 'search' | 'qa' | 'wait-feedback' | 'hiring'
  >(),
  queryOptimized: Annotation<string>(),
  requirementOptimized: Annotation<string>(),
  hiringFeedback: Annotation<string[]>(),
  orderCodes: Annotation<string[]>(),
})

export function searchAssistantWorkflow() {
  const workflow = new StateGraph(GraphState)

  workflow
    // nodes
    .addNode('supervisor-node', supervisorNode)
    .addNode('query-optimizer-node', queryOptimizerNode)
    .addNode('requirement-optimizer-node', requirementOptimizerNode)
    .addNode('product-retriever-node', productRetrieverNode)
    .addNode('semantic-search-product-tool-node', semanticSearchProductToolNode)
    .addNode('hiring-feedback-node', hiringFeedbackNode)
    .addNode('hiring-action-node', hiringActionNode)

    // flow
    .addEdge(START, 'supervisor-node')
    .addConditionalEdges('supervisor-node', supervisorAction, {
      'slot-filling': END,
      'wait-feedback': END,
      hiring: END,
      search: 'query-optimizer-node',
      qa: END,
    })
    .addEdge('query-optimizer-node', 'requirement-optimizer-node')
    .addEdge('requirement-optimizer-node', 'product-retriever-node')
    .addEdge('product-retriever-node', 'semantic-search-product-tool-node')
    .addEdge('semantic-search-product-tool-node', 'hiring-feedback-node')
    .addEdge('hiring-feedback-node', 'hiring-action-node')
    .addEdge('hiring-action-node', END)

  return { workflow }
}
