import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),    
    AutoImport({
    resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }), 
    eslintPlugin({ cache:false})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    
  },
  build:{
    rollupOptions:{
      input:{
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        custom: fileURLToPath(new URL('./custom.html', import.meta.url)),
      }
    }
  }
})
