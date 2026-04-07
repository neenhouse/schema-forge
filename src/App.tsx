import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const AppLayout = lazy(() => import('./components/ui/AppLayout'))
const DesignerPage = lazy(() => import('./pages/DesignerPage'))
const MigrationsPage = lazy(() => import('./pages/MigrationsPage'))
const CompatibilityPage = lazy(() => import('./pages/CompatibilityPage'))
const IndexOptimizerPage = lazy(() => import('./pages/IndexOptimizerPage'))
const RehearsalPage = lazy(() => import('./pages/RehearsalPage'))
const VersionHistoryPage = lazy(() => import('./pages/VersionHistoryPage'))
const TeamReviewPage = lazy(() => import('./pages/TeamReviewPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div style={{ minHeight: '100dvh' }} />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppLayout />}>
              <Route path="designer" element={<DesignerPage />} />
              <Route path="migrations" element={<MigrationsPage />} />
              <Route path="compatibility" element={<CompatibilityPage />} />
              <Route path="indexes" element={<IndexOptimizerPage />} />
              <Route path="rehearsal" element={<RehearsalPage />} />
              <Route path="history" element={<VersionHistoryPage />} />
              <Route path="reviews" element={<TeamReviewPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
