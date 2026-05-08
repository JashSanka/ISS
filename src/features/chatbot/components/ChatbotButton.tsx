import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { useChatbot } from '../hooks/useChatbot'
import { ChatbotWindow } from './ChatbotWindow'

export function ChatbotButton() {
  const { isOpen, toggle } = useChatbot()

  return (
    <div className="fixed bottom-20 right-4 z-40 lg:bottom-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm"
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <ChatbotWindow />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Button
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        className="size-14 rounded-full px-0 shadow-lg"
        icon={isOpen ? <X className="size-5" /> : <Bot className="size-5" />}
        onClick={toggle}
        variant="primary"
      />
    </div>
  )
}
