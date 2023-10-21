import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), eslintPlugin(), tsconfigPaths()],
  resolve: {
    preserveSymlinks: true,
  },
})
