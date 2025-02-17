import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Tämä sallii kaikkien IP-osoitteiden käytön
    port: 5174, // Oletusportti, voit vaihtaa tarvittaessa
  },
}) 
*/

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Osoittaa palvelimelle
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/api/, '') // Poistaa ylimääräisen "/api"-prefiksin
      }
    }
  }/*,
  build: {
    rollupOptions: {
      external: ['src/context/config.js']
    }
  }*/
});

