/// <reference types="@welldone-software/why-did-you-render" />

import * as React from 'react'

if (import.meta.env.DEV) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { default: whyDidYouRender } = await import('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
  })
}
