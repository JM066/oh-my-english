/* eslint-disable import/no-extraneous-dependencies */
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './index'
import { render } from '../../../test-utils'

describe('<Home />', () => {
  test('renders', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
