import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetWebFonts({
          provider: 'google', // default provider
          fonts: {
            // these will extend the default theme
            roboto: 'Roboto',
          },
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
