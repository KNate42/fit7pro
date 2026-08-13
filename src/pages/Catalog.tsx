import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Filter, Search, SlidersHorizontal, Star, X } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard, { ProductSkeleton } from '../components/ProductCard'
import { useShop } from '../context/ShopContext'
import { brands, categoryCards, products } from '../data/catalog'
import type { SortKey } from '../types'

type Filters = { category: string; brand: string; min: string; max: string; rating: number; inStock: boolean; query: string; favorites: boolean }

const emptyFilters: Filters = { category: '', brand: '', min: '', max: '', rating: 0, inStock: false, query: '', favorites: false }
const sortOptions: Array<[SortKey, string]> = [['popular', 'По популярности'], ['priceAsc', 'Сначала дешёвые'], ['priceDesc', 'Сначала дорогие'], ['rating', 'По рейтингу'], ['new', 'Новинки']]

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters>(() => ({ ...emptyFilters, category: params.get('category') ?? '', query: params.get('q') ?? '', favorites: params.get('favorites') === 'true' }))
  const [sort, setSort] = useState<SortKey>('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { favorites } = useShop()
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 550); return () => window.clearTimeout(timer) }, [])
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((current) => ({ ...current, [key]: value }))
  const filtered = useMemo(() => {
    const min = Number(filters.min) || 0; const max = Number(filters.max) || Infinity
    return products.filter((product) => {
      const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase()
      return (!filters.category || product.category === filters.category) && (!filters.brand || product.brand === filters.brand) && product.price >= min && product.price <= max && product.rating >= filters.rating && (!filters.inStock || product.inStock) && (!filters.favorites || favorites.includes(product.id)) && (!filters.query || haystack.includes(filters.query.toLowerCase()))
    }).sort((a, b) => sort === 'priceAsc' ? a.price - b.price : sort === 'priceDesc' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : sort === 'new' ? Number(Boolean(b.isNew || b.badge === 'Новинка')) - Number(Boolean(a.isNew || a.badge === 'Новинка')) : b.reviews - a.reviews)
  }, [favorites, filters, sort])
  const applySearch = (event: FormEvent) => { event.preventDefault(); setParams(Object.fromEntries(Object.entries({ ...(filters.category && { category: filters.category }), ...(filters.query && { q: filters.query }) }))) }
  const filterPanel = <FiltersPanel filters={filters} set={set} onClear={() => setFilters(emptyFilters)} />

  return <main className="shell py-7 sm:py-10"><Breadcrumbs current="Каталог" /><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><span className="eyebrow">Fit7Pro catalog</span><h1 className="section-title">Каталог</h1></div><form onSubmit={applySearch} className="flex h-12 max-w-md flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 focus-within:border-lime"><Search size={18} className="text-slate-400" /><input value={filters.query} onChange={(event) => set('query', event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Поиск по товарам" /><button type="submit" className="text-xs font-bold text-moss">Найти</button></form></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden h-fit rounded-2xl border border-line lg:block">{filterPanel}</aside>
      <div><div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5"><p className="text-sm text-slate-500">Найдено <b className="text-ink">{filtered.length}</b> товаров</p><div className="flex items-center gap-2"><button type="button" onClick={() => setFiltersOpen(true)} className="button-secondary h-10 px-4 lg:hidden"><Filter size={16} />Фильтры</button><label className="relative"><span className="sr-only">Сортировка</span><select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="h-10 appearance-none rounded-xl border border-line bg-white py-0 pl-3 pr-9 text-xs font-bold outline-none focus:border-lime">{sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-3 text-slate-400" /></label></div></div>
        {loading ? <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}</div> : filtered.length ? <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <EmptySearch onClear={() => setFilters(emptyFilters)} />}
      </div>
    </div>
    <AnimatePresence>{filtersOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[65] bg-ink/30 backdrop-blur-sm lg:hidden" onMouseDown={() => setFiltersOpen(false)}><motion.aside initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', ease: 'easeOut' }} className="absolute bottom-0 max-h-[88vh] w-full overflow-auto rounded-t-[28px] bg-white" onMouseDown={(event) => event.stopPropagation()}><div className="sticky top-0 flex items-center justify-between border-b border-line bg-white px-5 py-4"><b>Фильтры</b><button type="button" onClick={() => setFiltersOpen(false)} className="icon-button"><X size={19} /></button></div>{filterPanel}<div className="sticky bottom-0 border-t border-line bg-white p-4"><button type="button" onClick={() => setFiltersOpen(false)} className="button-primary w-full">Показать {filtered.length} товаров</button></div></motion.aside></motion.div>}</AnimatePresence>
  </main>
}

function FiltersPanel({ filters, set, onClear }: { filters: Filters; set: <K extends keyof Filters>(key: K, value: Filters[K]) => void; onClear: () => void }) {
  return <div className="p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-extrabold"><SlidersHorizontal size={16} />Фильтры</div><button type="button" onClick={onClear} className="text-xs font-bold text-moss">Сбросить</button></div><FilterGroup title="Категории"><div className="flex flex-col gap-1">{categoryCards.map((category) => <label key={category.name} className="flex cursor-pointer items-center gap-2 py-1 text-sm text-slate-600"><input type="radio" name="category" checked={filters.category === category.name} onChange={() => set('category', filters.category === category.name ? '' : category.name)} className="accent-lime" />{category.name}</label>)}</div></FilterGroup><FilterGroup title="Цена, ₸"><div className="grid grid-cols-2 gap-2"><input inputMode="numeric" value={filters.min} onChange={(event) => set('min', event.target.value)} className="input h-10 px-3 text-xs" placeholder="от" /><input inputMode="numeric" value={filters.max} onChange={(event) => set('max', event.target.value)} className="input h-10 px-3 text-xs" placeholder="до" /></div></FilterGroup><FilterGroup title="Бренд"><select value={filters.brand} onChange={(event) => set('brand', event.target.value)} className="input h-10 text-xs"><option value="">Все бренды</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select></FilterGroup><FilterGroup title="Рейтинг"><label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input checked={filters.rating === 4.5} onChange={() => set('rating', filters.rating === 4.5 ? 0 : 4.5)} type="checkbox" className="accent-lime" /><Star size={15} fill="#f6b838" strokeWidth={0} />4.5 и выше</label></FilterGroup><label className="flex cursor-pointer items-center gap-2 border-t border-line pt-4 text-sm font-semibold"><input checked={filters.inStock} onChange={(event) => set('inStock', event.target.checked)} type="checkbox" className="accent-lime" />Только в наличии</label><label className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-semibold"><input checked={filters.favorites} onChange={(event) => set('favorites', event.target.checked)} type="checkbox" className="accent-lime" />Только избранное</label></div>
}
function FilterGroup({ title, children }: { title: string; children: ReactNode }) { return <div className="border-t border-line py-4"><h3 className="mb-3 text-sm font-bold">{title}</h3>{children}</div> }
function EmptySearch({ onClear }: { onClear: () => void }) { return <div className="mt-8 rounded-[22px] border border-dashed border-line bg-[#fbfdfb] px-5 py-16 text-center"><Search className="mx-auto text-moss" size={26} /><h2 className="mt-4 text-lg font-bold">Ничего не нашли</h2><p className="mt-2 text-sm text-slate-500">Попробуйте изменить запрос или снять часть фильтров.</p><button type="button" onClick={onClear} className="button-secondary mt-5">Сбросить фильтры</button></div> }
