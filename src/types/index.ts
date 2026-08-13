export type Category =
  | 'Протеин'
  | 'Креатин'
  | 'Витамины'
  | 'Аминокислоты'
  | 'Предтренировочные'
  | 'Гейнеры'
  | 'Жиросжигатели'
  | 'Батончики и снеки'
  | 'Аксессуары'

export type Badge = 'Хит' | 'Новинка' | '−20%' | '−15%' | '−25%' | 'Выбор Fit7Pro'

export interface Product {
  id: string
  brand: string
  name: string
  category: Category
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: Badge
  image: string
  images: string[]
  flavors?: string[]
  sizes: string[]
  inStock: boolean
  isNew?: boolean
  description: string
  ingredients: string
  use: string
  characteristics: Array<[string, string]>
}

export interface CartItem { key: string; product: Product; quantity: number; flavor?: string; size: string }
export type SortKey = 'popular' | 'priceAsc' | 'priceDesc' | 'rating' | 'new'
