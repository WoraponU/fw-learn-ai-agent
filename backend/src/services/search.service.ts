import { checkPointer } from '@/utils/store'
import { searchAssistantWorkflow } from '@/workflows/search-assistant/workflow'

const searchService = {
  searchAssistant: () => {
    const { workflow } = searchAssistantWorkflow()
    const app = workflow.compile({ checkpointer: checkPointer() })

    return app
  },
  searchAssistantFeedback: () => {
    const { workflow } = searchAssistantWorkflow()
    const app = workflow.compile({ checkpointer: checkPointer() })

    return app
  },
}

export default searchService
