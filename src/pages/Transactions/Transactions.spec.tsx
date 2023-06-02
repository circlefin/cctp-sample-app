import { screen } from '@testing-library/react'

import { render } from 'tests/renderer'

import Transactions from './Transactions'

describe('Transactions', () => {
  it('renders transactions page', () => {
    render(<Transactions />)

    expect(screen.getByText(/Transactions/i)).toBeInTheDocument()
  })
})
