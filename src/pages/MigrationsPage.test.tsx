import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MigrationsPage from './MigrationsPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('MigrationsPage', () => {
  it('renders the Migration Generator heading', () => {
    renderWithRouter(<MigrationsPage />)
    expect(screen.getByText('Migration Generator')).toBeDefined()
  })

  it('renders the migrations list', () => {
    renderWithRouter(<MigrationsPage />)
    expect(screen.getByText('001_create_users')).toBeDefined()
    expect(screen.getByText('002_create_categories')).toBeDefined()
  })

  it('renders UP and DOWN migration tabs', () => {
    renderWithRouter(<MigrationsPage />)
    expect(screen.getByRole('button', { name: /up migration/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /down migration/i })).toBeDefined()
  })

  it('renders the Copy SQL button', () => {
    renderWithRouter(<MigrationsPage />)
    expect(screen.getByRole('button', { name: /copy/i })).toBeDefined()
  })
})
