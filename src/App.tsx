import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import CartPage from './pages/Cart'
import Catalog from './pages/Catalog'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Sale from './pages/Sale'
import Stores from './pages/Stores'

function PageFrame({ children }: { children: ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .22 }}>{children}</motion.div>
}

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return <div className="min-h-screen"><Header /><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<PageFrame><Home /></PageFrame>} /><Route path="/catalog" element={<PageFrame><Catalog /></PageFrame>} /><Route path="/product/:id" element={<PageFrame><ProductPage /></PageFrame>} /><Route path="/cart" element={<PageFrame><CartPage /></PageFrame>} /><Route path="/sale" element={<PageFrame><Sale /></PageFrame>} /><Route path="/stores" element={<PageFrame><Stores /></PageFrame>} /><Route path="*" element={<PageFrame><Home /></PageFrame>} /></Routes></AnimatePresence><Footer /><CartDrawer /></div>
}
