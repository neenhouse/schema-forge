import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import VersionHistoryPage from './VersionHistoryPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('VersionHistoryPage', () => {
  it('renders the page header', () => {
    renderWithRouter(<VersionHistoryPage />)
    expect(screen.getByText('Version History')).toBeDefined()
  })

  it('displays version timeline items', () => {
    renderWithRouter(<VersionHistoryPage />)
    expect(screen.getAllByText('v1').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('v6').length).toBeGreaterThanOrEqual(1)
  })

  it('shows version labels', () => {
    renderWithRouter(<VersionHistoryPage />)
    const labels = screen.getAllByText('Initial schema')
    expect(labels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the diff section for selected version', () => {
    renderWithRouter(<VersionHistoryPage />)
    expect(screen.getByText('Changes')).toBeDefined()
  })

  it('displays schema stats in footer', () => {
    renderWithRouter(<VersionHistoryPage />)
    const tablesText = screen.getAllByText(/tables/)
    expect(tablesText.length).toBeGreaterThanOrEqual(1)
  })
})
