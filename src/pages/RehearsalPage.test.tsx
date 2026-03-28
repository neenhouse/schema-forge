import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import RehearsalPage from './RehearsalPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('RehearsalPage', () => {
  it('renders the page header', () => {
    renderWithRouter(<RehearsalPage />)
    expect(screen.getByText('Migration Rehearsal')).toBeDefined()
  })

  it('shows the target migration name', () => {
    renderWithRouter(<RehearsalPage />)
    expect(screen.getByText('006_add_product_weight')).toBeDefined()
  })

  it('displays the Run Rehearsal button', () => {
    renderWithRouter(<RehearsalPage />)
    const btn = screen.getByText(/Run Rehearsal/)
    expect(btn).toBeDefined()
  })

  it('shows all rehearsal steps', () => {
    renderWithRouter(<RehearsalPage />)
    expect(screen.getByText('Add weight_kg column to products table')).toBeDefined()
    expect(screen.getByText('Add dimensions column (JSONB) to products table')).toBeDefined()
    expect(screen.getByText('Rollback: Drop dimensions column')).toBeDefined()
    expect(screen.getByText('Rollback: Drop weight_kg column')).toBeDefined()
  })

  it('displays summary sidebar', () => {
    renderWithRouter(<RehearsalPage />)
    expect(screen.getByText('Status')).toBeDefined()
    expect(screen.getByText('Total Steps')).toBeDefined()
  })
})
