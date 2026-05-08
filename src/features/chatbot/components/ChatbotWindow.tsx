import { X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { aiService } from '../api/aiService'
import { createChatMessage, useChatbot } from '../hooks/useChatbot'
import { useDashboardContext } from '../hooks/useDashboardContext'
import { getOutOfScopeMessage, isQuestionInDashboardScope } from '../utils/chatbotGuards'
import { ChatInput } from './ChatInput'
import { ChatMessageList } from './ChatMessageList'

export function ChatbotWindow() {
  const { addMessage, clearMessages, close, messages } = useChatbot()
  const dashboardContext = useDashboardContext()
  const [isTyping, setIsTyping] = useState(false)

  async function handleSend(question: string) {
    const userMessage = createChatMessage('user', question)
    addMessage(userMessage)

    if (!isQuestionInDashboardScope(question)) {
      addMessage(createChatMessage('assistant', getOutOfScopeMessage()))
      return
    }

    setIsTyping(true)

    try {
      const answer = await aiService.askDashboardQuestion({
        context: dashboardContext,
        question,
      })
      addMessage(createChatMessage('assistant', answer))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The dashboard assistant is temporarily unavailable.'
      toast.error(message)
      addMessage(createChatMessage('assistant', message))
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <Card className="grid max-h-[calc(100svh-7rem)] overflow-hidden p-0" id="chat">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <div>
          <h2 className="font-semibold text-slate-950 dark:text-white">Dashboard Chat</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Restricted to loaded ISS and news data</p>
        </div>
        <div className="flex items-center gap-1">
          <Button aria-label="Clear chat" className="px-3" onClick={clearMessages} variant="ghost">
            Clear
          </Button>
          <Button aria-label="Close chatbot" className="size-9 px-0" icon={<X className="size-4" />} onClick={close} variant="ghost" />
        </div>
      </div>
      <ChatMessageList isTyping={isTyping} messages={messages} />
      <ChatInput disabled={isTyping} onSend={(message) => void handleSend(message)} />
    </Card>
  )
}
