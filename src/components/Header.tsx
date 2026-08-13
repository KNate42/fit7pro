import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const navItems = [
  ['Каталог', '/catalog'],
  ['Акции', '/sale'],
  ['Бренды', '/#brands'],
  ['О нас', '/#about'],
  ['Магазины', '/stores'],
] as const

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount, favorites, setCartOpen } = useShop()
  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    navigate(query.trim() ? `/catalog?q=${encodeURIComponent(query.trim())}` : '/catalog')
    setSearchOpen(false)
  }

  return <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-xl">
    <div className="shell flex h-[76px] items-center justify-between gap-4">
      <Link to="/" className="group shrink-0 leading-none" aria-label="Fit7Pro на главную">
        <span className="font-display text-[22px] font-bold tracking-[-.1em]">Fit<span className="text-lime">7</span>Pro</span>
        <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[.16em] text-slate-500">Спортивное питание</span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex">
        {navItems.map(([label, to]) => <NavLink key={label} to={to} className="text-sm font-bold text-ink/75 transition hover:text-lime">{label}</NavLink>)}
      </nav>
      <div className="flex items-center gap-0.5 sm:gap-1">
        <button type="button" onClick={() => setSearchOpen((open) => !open)} className="icon-button" aria-label="Поиск"><Search size={20} /></button>
        <Link to="/catalog?favorites=true" className="icon-button relative hidden sm:grid" aria-label="Избранное"><Heart size={20} /><span className={favorites.length ? 'absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[9px] font-bold text-white' : 'hidden'}>{favorites.length}</span></Link>
        <button type="button" onClick={() => setCartOpen(true)} className="icon-button relative" aria-label="Открыть корзину"><ShoppingBag size={20} />{cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[9px] font-bold text-white">{cartCount}</motion.span>}</button>
        <button type="button" className="icon-button hidden xl:grid" aria-label="Профиль"><UserRound size={19} /></button>
        <button type="button" onClick={() => setMobileOpen(true)} className="icon-button lg:hidden" aria-label="Открыть меню"><Menu size={22} /></button>
      </div>
    </div>
    <AnimatePresence>
      {searchOpen && <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={submitSearch} className="border-t border-line bg-white">
        <div className="shell flex items-center gap-3 py-3">
          <Search size={18} className="text-slate-400" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400" placeholder="Найти протеин, витамины, бренд..." />
          <button type="button" onClick={() => setSearchOpen(false)} className="icon-button h-8 w-8"><X size={18} /></button>
        </div>
      </motion.form>}
    </AnimatePresence>
    <AnimatePresence>
      {mobileOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', ease: 'easeOut', duration: .25 }} className="ml-auto flex h-full w-[min(360px,90vw)] flex-col bg-white p-6 shadow-float" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between"><span className="font-display text-xl tracking-[-.1em]">Fit<span className="text-lime">7</span>Pro</span><button type="button" className="icon-button" onClick={() => setMobileOpen(false)}><X /></button></div>
          <nav className="mt-10 flex flex-col">
            {navItems.map(([label, to], index) => <motion.div key={label} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .05 }}><NavLink onClick={() => setMobileOpen(false)} to={to} className="block border-b border-line py-5 text-lg font-bold">{label}</NavLink></motion.div>)}
          </nav>
          <Link to="/catalog?favorites=true" onClick={() => setMobileOpen(false)} className="mt-5 flex items-center gap-3 text-sm font-bold"><Heart size={19} />Избранное {favorites.length ? `(${favorites.length})` : ''}</Link>
          <div className="mt-auto rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink/75">Доставка по Петропавловску и самовывоз из 4 магазинов.</div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </header>
}
