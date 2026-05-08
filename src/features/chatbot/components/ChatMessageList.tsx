import { Bot, User } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from '../../../components/ui/cn'
import type { ChatMessage } from '../types/chatbot.types'
import { TypingIndicator } from './TypingIndicator'

type ChatMessageListProps = {
  isTyping: boolean
  messages: ChatMessage[]
}

export function ChatMessageList({ isTyping, messages }: ChatMessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [isTyping, messages])

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
        <Bot className="size-8 text-orbit-500" aria-hidden="true" />
        <h3 className="mt-3 font-semibold text-slate-950 dark:text-white">Ask about this dashboard</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          I can answer only from loaded ISS tracking, people in space, and news data.
        </p>
      </div>
    )
  }

  return (
    <div className="max-h-[420px] min-h-64 overflow-y-auto px-4 py-3">
      <div className="grid gap-3">
        {messages.map((message) => {
          const isUser = message.role === 'user'
          const Icon = isUser ? User : Bot

          return (
            <div className={cn('flex gap-2', isUser && 'justify-end')} key={message.id}>
              {!isUser ? (
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-orbit-500/10 text-orbit-600 dark:text-orbit-300">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
              ) : null}
              <div
                className={cn(
                  'max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6',
                  isUser
                    ? 'bg-orbit-600 text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200',
                )}
              >
                {message.content}
              </div>
            </div>
          )
        })}
        {isTyping ? <TypingIndicator /> : null}
        <div ref={endRef} />
      </div>
    </div>
  )
}
