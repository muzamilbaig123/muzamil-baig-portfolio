import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'

// Admin panel lazy load: sirf /admin kholne pe iska code download hota hai,
// public site ka bundle chhota rehta hai
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'))

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* Public portfolio (pehle jaisa) */}
      <Route path="/" element={<App />} />

      {/* Admin panel: /admin, /admin/login, /admin/projects ... */}
      <Route
        path="/admin/*"
        element={
          <Suspense
            fallback={
              // Admin ka code download hone tak: dark background pe chhota spinner
              <div className="grid min-h-screen place-items-center bg-neutral-950" aria-busy="true" aria-label="Loading admin">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
              </div>
            }
          >
            <AdminApp />
          </Suspense>
        }
      />

      {/* Ghalat URL -> home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
