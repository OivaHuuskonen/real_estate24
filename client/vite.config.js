import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Tämä sallii kaikkien IP-osoitteiden käytön
    port: 5174, // Oletusportti, voit vaihtaa tarvittaessa
  },
})
