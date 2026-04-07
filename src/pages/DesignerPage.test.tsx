import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DesignerPage from './DesignerPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('DesignerPage', () => {
  it('renders the Schema Designer heading', () => {
    renderWithRouter(<DesignerPage />)
    expect(screen.getByText('Schema Designer')).toBeDefined()
  })

  it('renders table count and relation count in toolbar', () => {
    renderWithRouter(<DesignerPage />)
    expect(screen.getByText(/tables.*relations/i)).toBeDefined()
  })

  it('renders the Reset Zoom button', () => {
    renderWithRouter(<DesignerPage />)
    expect(screen.getByRole('button', { name: /reset zoom/i })).toBeDefined()
  })

  it('renders table nodes on the canvas', () => {
    renderWithRouter(<DesignerPage />)
    expect(screen.getByText('users')).toBeDefined()
    expect(screen.getByText('products')).toBeDefined()
    expect(screen.getByText('orders')).toBeDefined()
  })
})
