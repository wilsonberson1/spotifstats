
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// HTTPS local automático (sem OpenSSL).
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: { port: 5173, https: true }
})
