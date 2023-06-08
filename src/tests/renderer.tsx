import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'

import type { RenderOptions } from '@testing-library/react'

export const providers = ({ children }: { children: React.ReactElement }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

const customRender = (component: React.ReactElement, options?: RenderOptions) =>
  render(component, { wrapper: providers, ...options })

export { customRender as render }
