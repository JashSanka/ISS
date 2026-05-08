export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
      <span className="size-2 animate-bounce rounded-full bg-orbit-500 [animation-delay:-0.2s]" />
      <span className="size-2 animate-bounce rounded-full bg-orbit-500 [animation-delay:-0.1s]" />
      <span className="size-2 animate-bounce rounded-full bg-orbit-500" />
      <span className="ml-1">Thinking</span>
    </div>
  )
}
