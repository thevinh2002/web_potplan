import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Introduction from './pages/Introduction'
import Production from './pages/Production'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#faf8f5]">
        <TopBar />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/production" element={<Production />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
