import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ current, parent }: { current: string; parent?: [string, string] }) {
  return <nav aria-label="Хлебные крошки" className="mb-6 flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-xs font-semibold text-slate-500"><Link to="/" className="transition hover:text-moss"><Home size={14} /></Link><ChevronRight size={14} />{parent && <><Link to={parent[1]} className="transition hover:text-moss">{parent[0]}</Link><ChevronRight size={14} /></>}<span className="truncate text-ink">{current}</span></nav>
}
