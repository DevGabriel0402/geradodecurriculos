import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons.png', 'imagelogo.png'],
      manifest: {
        name: 'CurrículoGenerator',
        short_name: 'CurrículoGen',
        description: 'Crie currículos profissionais em minutos',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  server: {
    open: true
  }
})
