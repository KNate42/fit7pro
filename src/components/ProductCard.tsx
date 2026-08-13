import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import type { Product } from '../types'

export function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₸'
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, favorites, toggleFavorite } = useShop()
  const isFavorite = favorites.includes(product.id)
  return <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: Math.min(index, 6) * .045 }} className="group relative min-w-0 overflow-hidden rounded-[22px] border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card">
    <div className="relative aspect-[.95] overflow-hidden bg-[#f4f7f4]">
      <Link to={`/product/${product.id}`} className="block h-full"><img src={product.image} alt={`${product.brand} ${product.name}`} className="product-img mix-blend-multiply group-hover:scale-105" /></Link>
      {product.badge && <span className="badge absolute left-3 top-3 bg-lime text-white">{product.badge}</span>}
      <button type="button" onClick={() => toggleFavorite(product.id)} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 backdrop-blur transition hover:scale-105 ${isFavorite ? 'text-lime' : 'text-ink'}`} aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      <motion.button type="button" whileTap={{ scale: .96 }} onClick={() => addToCart(product)} className="absolute bottom-3 left-3 right-3 flex h-10 items-center justify-center gap-2 rounded-xl bg-ink text-xs font-bold text-white opacity-0 transition duration-300 group-hover:opacity-100 max-sm:opacity-100 hover:bg-lime" aria-label={`Добавить ${product.name} в корзину`}><ShoppingBag size={15} />В корзину</motion.button>
    </div>
    <div className="p-3.5 sm:p-4">
      <p className="truncate text-[11px] font-bold uppercase tracking-[.08em] text-moss">{product.brand}</p>
      <Link to={`/product/${product.id}`} className="mt-1.5 block min-h-[40px] text-sm font-bold leading-5 text-ink transition hover:text-moss">{product.name}</Link>
      <div className="mt-2 flex items-center gap-1.5 text-xs"><Star size={14} fill="#f6b838" strokeWidth={0} /><span className="font-bold">{product.rating.toFixed(1)}</span><span className="text-slate-400">({product.reviews})</span></div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2"><span className="text-base font-extrabold tracking-[-.04em]">{formatPrice(product.price)}</span>{product.oldPrice && <del className="text-xs text-slate-400">{formatPrice(product.oldPrice)}</del>}</div>
    </div>
  </motion.article>
}

export function ProductSkeleton() {
  return <div className="overflow-hidden rounded-[22px] border border-line bg-white"><div className="aspect-[.95] animate-pulse bg-slate-100" /><div className="space-y-3 p-4"><div className="h-3 w-20 animate-pulse rounded bg-slate-100" /><div className="h-5 w-4/5 animate-pulse rounded bg-slate-100" /><div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" /></div></div>
}
