import { useChatbotStore } from '../store/chatbotStore'
import type { ChatMessage } from '../types/chatbot.types'

export function useChatbot() {
  const isOpen = useChatbotStore((state) => state.isOpen)
  const setIsOpen = useChatbotStore((state) => state.setIsOpen)
  const messages = useChatbotStore((state) => state.messages)
  const addMessage = useChatbotStore((state) => state.addMessage)
  const clearMessages = useChatbotStore((state) => state.clearMessages)

  return {
    addMessage,
    clearMessages,
    close: () => setIsOpen(false),
    isOpen,
    messages,
    open: () => setIsOpen(true),
    toggle: () => setIsOpen(!isOpen),
  }
}

export function createChatMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    content,
    createdAt: Date.now(),
    id: crypto.randomUUID(),
    role,
  }
}
