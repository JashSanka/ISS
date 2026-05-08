import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from './app/providers/QueryProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { ToastProvider } from './app/providers/ToastProvider'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
        <ToastProvider />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
