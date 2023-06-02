import { screen } from '@testing-library/react'

import { render } from 'tests/renderer'

import Nav from './Nav'

describe('Nav', () => {
  it('has all the links', () => {
    render(<Nav />)

    const transferLink = screen.getAllByText(
      /Transfer/i
    )[1] as HTMLAnchorElement
    expect(transferLink.href).toContain('/')
  })
})
