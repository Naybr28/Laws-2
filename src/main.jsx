import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Pages
import App from './App.jsx'
import Ask from './pages/Ask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />    {/* Home */}
        <Route path="/ask" element={<Ask />} /> {/* Next page */}
      </Routes>
    </HashRouter>
  </StrictMode>,
)
