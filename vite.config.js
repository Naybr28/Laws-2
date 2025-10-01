import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: 
  [react(),
    tailwindcss(),
  ],
  base: '/Laws-2/',   // 👈 replace with your repo name
})
