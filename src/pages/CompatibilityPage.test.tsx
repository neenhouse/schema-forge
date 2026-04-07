import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import CompatibilityPage from './CompatibilityPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('CompatibilityPage', () => {
  it('renders the Cross-Database Compatibility heading', () => {
    renderWithRouter(<CompatibilityPage />)
    expect(screen.getByText('Cross-Database Compatibility')).toBeDefined()
  })

  it('renders dialect toggle buttons', () => {
    renderWithRouter(<CompatibilityPage />)
    expect(screen.getByRole('button', { name: /postgresql/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /mysql/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /sqlite/i })).toBeDefined()
  })

  it('renders compatibility summary stats', () => {
    renderWithRouter(<CompatibilityPage />)
    const compatMatches = screen.getAllByText(/compatible/i)
    expect(compatMatches.length).toBeGreaterThan(0)
  })

  it('renders table rows for schema tables', () => {
    renderWithRouter(<CompatibilityPage />)
    expect(screen.getByText('users')).toBeDefined()
    expect(screen.getByText('products')).toBeDefined()
  })
})
