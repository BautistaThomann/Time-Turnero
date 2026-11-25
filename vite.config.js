import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages publica el sitio en /Time-Turnero/ (el nombre del repo), no en la raíz
  base: process.env.VERCEL ? '/' : '/Time-Turnero/',
})
