import admin from 'firebase-admin'
import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return cypressFirebasePlugin(on, config, admin, { projectId: 'oh-my-english-961db' })
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
})
