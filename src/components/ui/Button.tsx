import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-orbit-600 text-white hover:bg-orbit-500 focus-visible:ring-orbit-500',
  secondary:
    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
}

export function Button({ className, icon, children, variant = 'secondary', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 dark:focus-visible:ring-offset-slate-950',
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
