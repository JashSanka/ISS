import { create } from 'zustand'
import { CACHE_KEYS, CHAT_MESSAGE_LIMIT } from '../../../constants/cache'
import { safeReadStorage, safeRemoveStorage, safeWriteStorage } from '../../../utils/storage/localStorage'
import type { ChatMessage } from '../types/chatbot.types'

type ChatbotState = {
  isOpen: boolean
  messages: ChatMessage[]
  setIsOpen: (isOpen: boolean) => void
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

const initialMessages = safeReadStorage<ChatMessage[]>(CACHE_KEYS.chatHistory, [])

export const useChatbotStore = create<ChatbotState>((set) => ({
  isOpen: false,
  messages: initialMessages.slice(-CHAT_MESSAGE_LIMIT),
  setIsOpen: (isOpen) => set({ isOpen }),
  addMessage: (message) =>
    set((state) => {
      const messages = [...state.messages, message].slice(-CHAT_MESSAGE_LIMIT)
      safeWriteStorage(CACHE_KEYS.chatHistory, messages)
      return { messages }
    }),
  clearMessages: () => {
    safeRemoveStorage(CACHE_KEYS.chatHistory)
    set({ messages: [] })
  },
}))
