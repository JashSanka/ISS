import { SendHorizonal } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '../../../components/ui/Button'

type ChatInputProps = {
  disabled: boolean
  onSend: (message: string) => void
}

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    onSend(trimmedMessage)
    setMessage('')
  }

  return (
    <form className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-800" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-message">
        Ask dashboard assistant
      </label>
      <input
        className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orbit-500 focus:ring-2 focus:ring-orbit-500/20 dark:border-slate-700 dark:bg-slate-900"
        disabled={disabled}
        id="chat-message"
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask about ISS or loaded news"
        value={message}
      />
      <Button aria-label="Send message" className="size-11 px-0" disabled={disabled} icon={<SendHorizonal className="size-4" />} type="submit" variant="primary" />
    </form>
  )
}
