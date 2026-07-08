import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({
    png: {
      quality: 80,
      compressionLevel: 6,
    },
    jpg: {
      quality: 75,
      mozjpeg: true,
    },
    jpeg: {
      quality: 75,
      mozjpeg: true,
    },
    webp: {
      quality: 80,
    },
    avif: {
      quality: 80,
    },
  })],
  server: {
    port: 3000,
  },
})
