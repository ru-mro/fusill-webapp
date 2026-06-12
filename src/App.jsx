import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import AppPage from './pages/AppPage'
import DocsPage from './pages/DocsPage'
import LogoLab from './pages/LogoLab'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/logo" element={<LogoLab />} />
      </Routes>
    </BrowserRouter>
  )
}
