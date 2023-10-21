import { extendTailwindMerge } from 'tailwind-merge'
import classnames, { type ArgumentArray } from 'classnames'

const merge = extendTailwindMerge({
  prefix: 'tw-', // Should be the same as the one in tailwind.config.js
})

// eslint-disable-next-line import/prefer-default-export
export const twMerge = (...args: ArgumentArray): string => merge(classnames(...args))
