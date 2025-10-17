import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,    // permite escuchar en 0.0.0.0 (accesible desde el host/devcontainer)
    port: 5173,    // opcional, puerto por defecto de Vite
    strictPort: false // si el 5173 está ocupado, Vite buscará otro puerto
  }
})