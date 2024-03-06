/* eslint-disable import/no-extraneous-dependencies */
import Home from './index'
import { render, screen } from '../../../test-utils'

describe('<Home />', () => {
  test('renders', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
