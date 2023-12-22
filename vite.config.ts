/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [react(), svgr(), eslintPlugin(), tsconfigPaths()],
    resolve: {
      preserveSymlinks: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }
})
