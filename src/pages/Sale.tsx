import { Clock3, Sparkles } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard from '../components/ProductCard'
import { products } from '../data/catalog'

export default function Sale() {
  const discounted = products.filter((product) => product.oldPrice)
  return <main className="shell py-7 sm:py-10"><Breadcrumbs current="Акции" /><section className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-12"><div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-lime/30 blur-3xl" /><div className="relative max-w-xl"><span className="eyebrow text-[#8de7b4]"><Sparkles size={15} />Демо-предложения</span><h1 className="font-display text-4xl font-semibold leading-tight tracking-[-.07em] sm:text-5xl">Больше энергии для новых целей</h1><p className="mt-5 text-sm leading-6 text-white/65">Выгодные предложения на популярные товары. Цены и таймер — демонстрационные данные.</p><div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"><Clock3 size={18} className="text-lime" /><div><p className="text-[10px] uppercase tracking-wider text-white/55">До конца акции</p><p className="font-display mt-0.5 text-lg tracking-[-.08em]">02 : 14 : 37</p></div></div></div></section><section className="mt-12"><div className="flex items-end justify-between"><div><span className="eyebrow">Экономьте с умом</span><h2 className="section-title text-3xl">Товары со скидкой</h2></div><p className="hidden text-sm text-slate-500 sm:block">{discounted.length} предложений</p></div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{discounted.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div></section></main>
}
