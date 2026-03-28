import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LandingPage', () => {
  it('renders the hero headline', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText(/Schema management that/i)).toBeDefined()
    expect(screen.getByText(/doesn't break production/i)).toBeDefined()
  })

  it('renders all 7 feature cards', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Visual Schema Designer')).toBeDefined()
    expect(screen.getByText('Migration Generator')).toBeDefined()
    expect(screen.getByText('Cross-DB Compatibility')).toBeDefined()
    expect(screen.getByText('Index Optimizer')).toBeDefined()
    expect(screen.getByText('Migration Rehearsal')).toBeDefined()
    expect(screen.getByText('Version History')).toBeDefined()
    expect(screen.getByText('Team Review Workflow')).toBeDefined()
  })

  it('renders pricing tiers', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Free')).toBeDefined()
    expect(screen.getByText('Pro')).toBeDefined()
    expect(screen.getByText('Team')).toBeDefined()
  })

  it('renders the Get Started CTA', () => {
    renderWithRouter(<LandingPage />)
    const ctas = screen.getAllByText('Get Started')
    expect(ctas.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the preview schema designer mockup', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('users')).toBeDefined()
    expect(screen.getByText('orders')).toBeDefined()
    expect(screen.getByText('products')).toBeDefined()
  })
})
