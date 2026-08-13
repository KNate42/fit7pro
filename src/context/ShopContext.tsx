import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

type Toast = { id: number; message: string }

interface ShopState {
  cart: CartItem[]
  favorites: string[]
  cartOpen: boolean
  addToCart: (product: Product, size?: string, flavor?: string, amount?: number) => void
  updateQuantity: (key: string, quantity: number) => void
  removeFromCart: (key: string) => void
  clearCart: () => void
  toggleFavorite: (id: string) => void
  setCartOpen: (open: boolean) => void
  cartCount: number
  cartTotal: number
}

const ShopContext = createContext<ShopState | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string) => {
    const id = Date.now()
    setToasts((items) => [...items, { id, message }])
    window.setTimeout(() => setToasts((items) => items.filter((toast) => toast.id !== id)), 2800)
  }

  const addToCart = (product: Product, size = product.sizes[0], flavor = product.flavors?.[0], amount = 1) => {
    setCart((items) => {
      const key = [product.id, size, flavor].filter(Boolean).join('-')
      const found = items.find((item) => item.key === key)
      return found
        ? items.map((item) => item === found ? { ...item, quantity: item.quantity + amount } : item)
        : [...items, { key, product, quantity: amount, size, flavor }]
    })
    showToast('Товар добавлен в корзину')
  }

  const value = useMemo<ShopState>(() => ({
    cart,
    favorites,
    cartOpen,
    addToCart,
    updateQuantity: (key, quantity) => setCart((items) => quantity < 1 ? items.filter((item) => item.key !== key) : items.map((item) => item.key === key ? { ...item, quantity } : item)),
    removeFromCart: (key) => setCart((items) => items.filter((item) => item.key !== key)),
    clearCart: () => setCart([]),
    toggleFavorite: (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    setCartOpen,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  }), [cart, cartOpen, favorites])

  return <ShopContext.Provider value={value}>
    {children}
    <div aria-live="polite" className="fixed right-4 top-24 z-[70] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => <motion.div key={toast.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-float">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-lime"><Check size={15} /></span>{toast.message}
        </motion.div>)}
      </AnimatePresence>
    </div>
  </ShopContext.Provider>
}

export function useShop() {
  const value = useContext(ShopContext)
  if (!value) throw new Error('useShop must be used within ShopProvider')
  return value
}

export function CloseButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="icon-button" aria-label="Закрыть"><X size={19} /></button>
}
