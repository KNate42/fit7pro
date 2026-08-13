import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, MapPin, MoveRight, Play, Sparkles, Truck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { brands, categoryCards, demoMetrics, products, stores } from '../data/catalog'
import heroImage from '../../photos/NOXPLODE.jpg'
import promoImage from '../../photos/demotimer.jpg'

export default function Home() {
  return <main className="overflow-hidden">
    <Hero />
    <section className="shell py-16 sm:py-24">
      <SectionHeader eyebrow="Выбирайте цель" title="Каталог для вашего результата" link={['Весь каталог', '/catalog']} />
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categoryCards.map((category, index) => <motion.div key={category.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }}><Link to={`/catalog?category=${encodeURIComponent(category.name)}`} className="group relative block aspect-[.86] overflow-hidden rounded-[22px] bg-mist p-4 sm:aspect-[.92] sm:p-5">
          <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90 transition duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" /><div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 sm:inset-x-5 sm:bottom-5"><div><h3 className="text-sm font-extrabold text-white sm:text-base">{category.name}</h3><p className="mt-1 hidden text-xs text-white/70 sm:block">{category.description}</p></div><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:bg-lime group-hover:text-white"><ArrowRight size={15} /></span></div>
        </Link></motion.div>)}
      </div>
    </section>
    <section className="grid-fade border-y border-line bg-[#fbfdfb] py-16 sm:py-24">
      <div className="shell"><SectionHeader eyebrow="Выбор покупателей" title="Популярное сейчас" link={['Смотреть все', '/catalog']} /><div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">{products.slice(0, 8).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div></div>
    </section>
    <section className="shell py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-9 text-white sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-16">
        <div className="relative z-10"><span className="eyebrow text-[#8de7b4]"><Sparkles size={15} />Выгода недели</span><h2 className="font-display max-w-xl text-3xl font-semibold leading-tight tracking-[-.06em] sm:text-4xl">До −25% на продукты для сильного старта</h2><p className="mt-5 max-w-md text-sm leading-6 text-white/65">Собрали предложения, которые хорошо ложатся в тренировочный режим. Только для демонстрации интерфейса.</p><Link to="/sale" className="button-primary mt-7">Смотреть акции <MoveRight size={17} /></Link></div><div className="relative mt-8 min-h-[210px] lg:mt-0"><div className="absolute -right-8 -top-32 h-80 w-80 rounded-full bg-lime/25 blur-3xl" /><img src={promoImage} alt="Песочные часы" className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-75 mix-blend-screen" /><div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur"><div className="text-xs text-white/60">Демо-таймер</div><div className="mt-1 font-display text-lg tracking-[-.07em]">02 : 14 : 37</div></div></div>
      </div>
    </section>
    <BrandSection />
    <section id="about" className="shell scroll-mt-28 py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16"><div className="relative aspect-[1.05] overflow-hidden rounded-[28px] bg-mist"><img src={heroImage} alt="Тренировка и спортивное питание" className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 p-4 shadow-card backdrop-blur"><div className="flex items-center gap-2 text-xs font-bold text-moss"><Check size={15} />Выбирайте с уверенностью</div><p className="mt-1 text-xs text-slate-500">Понятный подбор под цель</p></div></div><div><span className="eyebrow"><MapPin size={15} />Петропавловск</span><h2 className="section-title max-w-xl">Fit7Pro — спортивное питание рядом с тобой</h2><p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">Локальная витрина спортивного питания, добавок и аксессуаров. Концепт соединяет удобный онлайн‑выбор с возможностью забрать заказ у знакомой точки в городе.</p><div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4">{demoMetrics.map(([value, label]) => <div key={label}><div className="font-display text-xl font-semibold tracking-[-.08em] text-moss">{value}</div><div className="mt-1 text-xs leading-4 text-slate-500">{label}<sup className="ml-0.5 text-[8px]">*</sup></div></div>)}</div><p className="mt-7 text-[10px] text-slate-400">* Цифры приведены как данные демонстрационного прототипа.</p></div></div>
    </section>
    <section className="border-y border-line bg-mist py-14"><div className="shell grid gap-6 sm:grid-cols-3"><Feature icon={<Truck />} title="Доставка по городу" text="Быстрый и понятный способ получить заказ в Петропавловске." /><Feature icon={<MapPin />} title="4 точки самовывоза" text="Выберите магазин, который удобнее по пути." /><Feature icon={<Play />} title="Подбор под цель" text="Чистый каталог, фильтры и информация в карточке товара." /></div></section>
    <section className="shell py-16 sm:py-24"><SectionHeader eyebrow="Офлайн рядом" title="Наши магазины" link={['Все 4 магазина', '/stores']} /><div className="mt-9 grid gap-3 md:grid-cols-2">{stores.slice(0, 2).map((store, index) => <motion.div key={store.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="group rounded-[22px] border border-line p-5 transition hover:border-lime hover:shadow-card sm:flex sm:items-center sm:justify-between"><div><p className="text-sm font-extrabold">{store.name}</p><p className="mt-2 text-sm text-slate-600">{store.address}</p><p className="mt-3 text-xs font-semibold text-moss">{store.hours}</p></div><Link to="/stores" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-moss transition group-hover:gap-2 sm:mt-0">Маршрут <ChevronRight size={16} /></Link></motion.div>)}</div></section>
  </main>
}

function Hero() {
  const container = { hidden: {}, visible: { transition: { staggerChildren: .11 } } }
  const item: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease: [0.22, 1, .36, 1] } } }
  return <section className="shell py-5 sm:py-7"><div className="relative isolate min-h-[570px] overflow-hidden rounded-[28px] bg-ink sm:min-h-[630px]"><img src={heroImage} alt="Спортивный lifestyle" className="absolute inset-0 h-full w-full object-cover object-[60%_center] opacity-65" /><div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" /><div className="absolute -bottom-44 left-[20%] h-96 w-96 rounded-full bg-lime/20 blur-[100px]" /><motion.div variants={container} initial="hidden" animate="visible" className="relative flex min-h-[570px] max-w-2xl flex-col justify-center px-6 py-14 text-white sm:min-h-[630px] sm:px-12 lg:px-16"><motion.div variants={item} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-lime" />Твой прогресс начинается здесь</motion.div><motion.h1 variants={item} className="mt-6 font-display text-[38px] font-semibold leading-[1.08] tracking-[-.07em] sm:text-5xl lg:text-[60px]">Твоя форма начинается с правильного питания</motion.h1><motion.p variants={item} className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg">Спортивное питание, добавки и всё необходимое для твоих целей.</motion.p><motion.div variants={item} className="mt-8 flex flex-wrap gap-3"><Link to="/catalog" className="button-primary">Перейти в каталог <ArrowRight size={17} /></Link><Link to="/sale" className="button-secondary border-white/25 bg-white/10 text-white hover:border-white hover:bg-white hover:text-ink">Смотреть акции</Link></motion.div></motion.div><div className="absolute bottom-5 right-5 hidden rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-white/80 backdrop-blur sm:block"><span className="text-lime">●</span> Доставка и самовывоз в Петропавловске</div></div></section>
}

function SectionHeader({ eyebrow, title, link }: { eyebrow: string; title: string; link?: [string, string] }) {
  return <div className="flex items-end justify-between gap-6"><div><span className="eyebrow">{eyebrow}</span><h2 className="section-title">{title}</h2></div>{link && <Link to={link[1]} className="hidden items-center gap-1 whitespace-nowrap text-sm font-bold text-moss transition hover:gap-2 sm:flex">{link[0]} <ArrowRight size={16} /></Link>}</div>
}

function BrandSection() {
  return <section id="brands" className="scroll-mt-28 border-y border-line bg-[#fbfdfb] py-16 sm:py-20"><div className="shell"><div className="text-center"><span className="eyebrow">Проверенные марки</span><h2 className="section-title">Популярные бренды</h2></div><div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{brands.map((brand, index) => <motion.div key={brand} initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .04 }} className="flex min-h-20 items-center justify-center rounded-2xl border border-line bg-white p-3 text-center text-xs font-extrabold tracking-[-.04em] transition hover:border-lime hover:text-moss">{brand}</motion.div>)}</div></div></section>
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-moss shadow-sm">{icon}</div><div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{text}</p></div></div>
}
