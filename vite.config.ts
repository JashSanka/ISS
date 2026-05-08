import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/hf-router': {
        target: 'https://router.huggingface.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/hf-router/, ''),
      },
      '/newsapi': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/newsapi/, ''),
      },
      '/open-notify': {
        target: 'http://api.open-notify.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/open-notify/, ''),
      },
    },
  },
})
