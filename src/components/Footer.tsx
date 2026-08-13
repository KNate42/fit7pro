import { MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg>
}

export default function Footer() {
  return <footer className="mt-20 bg-ink py-14 text-white sm:mt-28">
    <div className="shell grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div><Link to="/" className="font-display text-2xl font-bold tracking-[-.1em]">Fit<span className="text-lime">7</span>Pro</Link><p className="mt-4 max-w-xs text-sm leading-6 text-white/55">Спортивное питание и добавки для ваших целей — рядом, в Петропавловске.</p><a href="tel:+77052525555" className="mt-6 flex items-center gap-2 text-sm font-bold"><Phone size={16} className="text-lime" />+7 705 252-55-55</a><div className="mt-5 flex gap-2"><a aria-label="Instagram" href="#" className="icon-button border-white/15 text-white"><InstagramIcon size={18} /></a><a aria-label="WhatsApp" href="#" className="icon-button border-white/15 text-white"><MessageCircle size={18} /></a></div></div>
      <FooterColumn title="Каталог" links={[['Протеин', '/catalog?category=Протеин'], ['Креатин', '/catalog?category=Креатин'], ['Витамины', '/catalog?category=Витамины'], ['Аминокислоты', '/catalog?category=Аминокислоты'], ['Гейнеры', '/catalog?category=Гейнеры'], ['Аксессуары', '/catalog?category=Аксессуары']]} />
      <FooterColumn title="Покупателям" links={[['Доставка', '/#delivery'], ['Оплата', '/#delivery'], ['Возврат', '/#delivery'], ['FAQ', '/#faq']]} />
      <FooterColumn title="Компания" links={[['О нас', '/#about'], ['Магазины', '/stores'], ['Контакты', '/stores']]} />
    </div>
    <div className="shell mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Fit7Pro. Демонстрационный концепт.</span><span>Спортивное питание · Петропавловск, Казахстан</span></div>
  </footer>
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return <div><h3 className="text-sm font-bold">{title}</h3><div className="mt-5 flex flex-col gap-3">{links.map(([label, to]) => <Link key={label} to={to} className="text-sm text-white/55 transition hover:text-lime">{label}</Link>)}</div></div>
}
