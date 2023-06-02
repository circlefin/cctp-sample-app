import { screen } from '@testing-library/react'

import { render } from 'tests/renderer'

import Redeem from './Redeem'

describe('Redeem', () => {
  it('renders redeem page', () => {
    render(<Redeem />)

    expect(screen.getByText(/Receive/i)).toBeInTheDocument()
  })
})
