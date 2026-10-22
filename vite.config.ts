import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',

  plugins: [
    react(),
// généeration de service worker
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],

      manifest: {
        name: 'Baddies',
        short_name: 'Baddies',
        description: 'Assistant pour les douleurs menstruelles',
        lang: 'fr',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ],
      },
// Demander à Workbox de mettre en cache les fichiers nécessaires à l' interface : HTML, JavaScript, CSS, images et polices.
      workbox: {
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        globPatterns: [
          '**/*.{html,js,css,ico,png,svg,webp,jpg,jpeg,woff2,json}',
        ],
      },
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: { silenceDeprecations: ['import'] },
    },
  },
});