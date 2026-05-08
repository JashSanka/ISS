import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4_000,
        style: {
          borderRadius: '8px',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          background: 'var(--toast-bg, #ffffff)',
          color: 'var(--toast-fg, #111827)',
        },
      }}
    />
  )
}
