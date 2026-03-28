import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import TeamReviewPage from './TeamReviewPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('TeamReviewPage', () => {
  it('renders the page header', () => {
    renderWithRouter(<TeamReviewPage />)
    expect(screen.getByText('Team Reviews')).toBeDefined()
  })

  it('lists all 3 mock reviews', () => {
    renderWithRouter(<TeamReviewPage />)
    // Title appears both in list and detail, so use getAllByText
    expect(screen.getAllByText('Add weight and dimensions to products').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Add product tags array')).toBeDefined()
    expect(screen.getByText('Add user roles and permissions')).toBeDefined()
  })

  it('shows review status badges', () => {
    renderWithRouter(<TeamReviewPage />)
    const openBadges = screen.getAllByText('Open')
    expect(openBadges.length).toBeGreaterThanOrEqual(1)
    const approvedBadges = screen.getAllByText('Approved')
    expect(approvedBadges.length).toBeGreaterThanOrEqual(1)
  })

  it('displays comments for the selected review', () => {
    renderWithRouter(<TeamReviewPage />)
    expect(screen.getByText(/Should weight_kg be NOT NULL/)).toBeDefined()
  })

  it('allows adding a new comment', () => {
    renderWithRouter(<TeamReviewPage />)
    const textarea = screen.getByPlaceholderText('Add a comment...')
    fireEvent.change(textarea, { target: { value: 'This is a test comment' } })
    fireEvent.click(screen.getByText('Comment'))
    expect(screen.getByText('This is a test comment')).toBeDefined()
  })
})
