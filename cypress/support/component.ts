// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { MountOptions, MountReturn } from 'cypress/react'
import { MemoryRouterProps } from 'react-router-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from '../../src/stores/appStore'
// import { mount } from 'cypress/react18'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & {
          routerProps?: MemoryRouterProps
          reduxStore?: EnhancedStore<RootState>
        },
      ): Cypress.Chainable<MountReturn>
    }
  }
}

// Example use:
// cy.mount(<MyComponent />)
