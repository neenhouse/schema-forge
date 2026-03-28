import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import IndexOptimizerPage from './IndexOptimizerPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('IndexOptimizerPage', () => {
  it('renders the page header', () => {
    renderWithRouter(<IndexOptimizerPage />)
    expect(screen.getByText('Index Optimization Advisor')).toBeDefined()
  })

  it('displays mock recommendations for multiple tables', () => {
    renderWithRouter(<IndexOptimizerPage />)
    const ordersElements = screen.getAllByText('orders')
    expect(ordersElements.length).toBeGreaterThanOrEqual(1)
    const productsElements = screen.getAllByText('products')
    expect(productsElements.length).toBeGreaterThanOrEqual(1)
    const reviewsElements = screen.getAllByText('reviews')
    expect(reviewsElements.length).toBeGreaterThanOrEqual(1)
  })

  it('shows existing indexes in sidebar', () => {
    renderWithRouter(<IndexOptimizerPage />)
    expect(screen.getByText('idx_users_email')).toBeDefined()
    expect(screen.getByText('idx_products_sku')).toBeDefined()
  })

  it('applies a recommendation when the button is clicked', () => {
    renderWithRouter(<IndexOptimizerPage />)
    const applyBtn = screen.getByText('Apply Recommendation')
    fireEvent.click(applyBtn)
    const appliedBadges = screen.getAllByText('Applied')
    expect(appliedBadges.length).toBeGreaterThanOrEqual(1)
  })
})
