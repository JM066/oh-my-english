import { render } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  // eslint-disable-next-line vitest/expect-expect
  test('renders', async () => {
    render(<App />)
  })
})
