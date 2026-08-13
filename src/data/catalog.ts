import type { Category, Product } from '../types'
import noxplodeImage from '../../photos/NOXPLODE.jpg'
import snacksImage from '../../photos/snacks.jpg'

const productImages = {
  whey: noxplodeImage,
  shaker: noxplodeImage,
  capsules: noxplodeImage,
  powder: noxplodeImage,
  snacks: snacksImage,
  fitness: noxplodeImage,
  preworkout: noxplodeImage,
}

const copy = {
  protein: 'Сывороточный протеин для ежедневного восстановления и уверенного движения к цели.',
  vitamin: 'Продуманная формула для поддержки организма в ритме тренировок и активной жизни.',
  performance: 'Функциональная добавка для продуктивных тренировок и заметного прогресса.',
}

function item(input: Omit<Product, 'images' | 'description' | 'ingredients' | 'use' | 'characteristics'> & Partial<Pick<Product, 'description' | 'ingredients' | 'use' | 'characteristics'>>): Product {
  return {
    ...input,
    images: [input.image, productImages.shaker, productImages.fitness],
    description: input.description ?? copy.performance,
    ingredients: input.ingredients ?? 'Активные компоненты, натуральные ароматизаторы, подсластитель. Полный состав указан на упаковке.',
    use: input.use ?? 'Принимайте согласно инструкции на упаковке. Не превышайте рекомендованную суточную порцию.',
    characteristics: input.characteristics ?? [['Форма', 'Порошок'], ['Страна бренда', 'США'], ['Срок годности', '24 месяца'], ['Условия хранения', 'В сухом месте']],
  }
}

export const products: Product[] = [
  item({ id: 'on-gold-whey', brand: 'Optimum Nutrition', name: 'Gold Standard 100% Whey', category: 'Протеин', price: 34990, oldPrice: 39990, rating: 4.9, reviews: 128, badge: 'Хит', image: productImages.whey, flavors: ['Двойной шоколад', 'Ваниль', 'Клубника'], sizes: ['2.27 кг', '908 г'], inStock: true, description: copy.protein }),
  item({ id: 'myprotein-impact', brand: 'MyProtein', name: 'Impact Whey Protein', category: 'Протеин', price: 26990, rating: 4.8, reviews: 96, badge: 'Новинка', image: productImages.whey, flavors: ['Шоколадный брауни', 'Солёная карамель'], sizes: ['1 кг', '2.5 кг'], inStock: true, description: copy.protein }),
  item({ id: 'dymatize-iso100', brand: 'Dymatize', name: 'ISO100 Hydrolyzed', category: 'Протеин', price: 42990, oldPrice: 46990, rating: 5, reviews: 74, badge: '−15%', image: productImages.powder, flavors: ['Гурме-шоколад', 'Ваниль'], sizes: ['2.2 кг', '930 г'], inStock: true, description: copy.protein }),
  item({ id: 'maxler-creatine', brand: 'Maxler', name: 'Creatine Monohydrate', category: 'Креатин', price: 9990, rating: 4.8, reviews: 82, badge: 'Хит', image: productImages.powder, sizes: ['300 г', '500 г'], inStock: true, description: copy.performance, ingredients: 'Креатина моногидрат 100%.' }),
  item({ id: 'bsn-noxplode', brand: 'BSN', name: 'NO-Xplode', category: 'Предтренировочные', price: 19990, oldPrice: 24990, rating: 4.7, reviews: 53, badge: '−20%', image: productImages.preworkout, flavors: ['Фруктовый пунш', 'Арбуз'], sizes: ['650 г'], inStock: true }),
  item({ id: 'on-serious-mass', brand: 'Optimum Nutrition', name: 'Serious Mass', category: 'Гейнеры', price: 38990, rating: 4.8, reviews: 39, badge: 'Выбор Fit7Pro', image: productImages.whey, flavors: ['Шоколад', 'Банан'], sizes: ['2.7 кг', '5.4 кг'], inStock: true, description: copy.protein }),
  item({ id: 'now-omega', brand: 'NOW', name: 'Omega-3 1000 mg', category: 'Витамины', price: 7490, rating: 4.9, reviews: 61, image: productImages.capsules, sizes: ['100 капсул', '200 капсул'], inStock: true, description: copy.vitamin, characteristics: [['Форма', 'Капсулы'], ['Порций', '100'], ['Страна бренда', 'США'], ['Условия хранения', 'В сухом месте']] }),
  item({ id: 'maxler-magnesium', brand: 'Maxler', name: 'Magnesium + B6', category: 'Витамины', price: 6490, rating: 4.7, reviews: 44, badge: 'Новинка', image: productImages.capsules, sizes: ['90 таблеток'], inStock: true, description: copy.vitamin }),
  item({ id: 'rule1-r1-protein', brand: 'Rule 1', name: 'R1 Protein', category: 'Протеин', price: 32490, rating: 4.8, reviews: 31, image: productImages.whey, flavors: ['Ванильный крем', 'Шоколадный фадж'], sizes: ['2.3 кг'], inStock: true, description: copy.protein }),
  item({ id: 'scitec-bcaa', brand: 'Scitec Nutrition', name: 'BCAA + Glutamine Xpress', category: 'Аминокислоты', price: 14490, rating: 4.6, reviews: 27, image: productImages.powder, flavors: ['Лимон', 'Грейпфрут'], sizes: ['300 г'], inStock: true }),
  item({ id: 'lipo6-black', brand: 'Nutrex', name: 'Lipo-6 Black Ultra', category: 'Жиросжигатели', price: 15490, oldPrice: 18990, rating: 4.6, reviews: 35, badge: '−20%', image: productImages.capsules, sizes: ['60 капсул'], inStock: true }),
  item({ id: 'bombbar', brand: 'Bombbar', name: 'Protein Bar, ассорти', category: 'Батончики и снеки', price: 1190, rating: 4.7, reviews: 118, badge: 'Хит', image: productImages.snacks, flavors: ['Фисташка', 'Шоколад', 'Печенье-крем'], sizes: ['60 г'], inStock: true, description: 'Белковый перекус без лишнего сахара — удобно взять на тренировку или в дорогу.' }),
  item({ id: 'biotech-usa', brand: 'BioTech USA', name: 'CreaTOR Creatine', category: 'Креатин', price: 12490, rating: 4.5, reviews: 18, image: productImages.powder, flavors: ['Без вкуса'], sizes: ['300 г'], inStock: true }),
  item({ id: 'on-amino-energy', brand: 'Optimum Nutrition', name: 'Amino Energy', category: 'Аминокислоты', price: 16990, rating: 4.8, reviews: 46, badge: 'Хит', image: productImages.preworkout, flavors: ['Зелёное яблоко', 'Черника'], sizes: ['270 г'], inStock: true }),
  item({ id: 'qnt-metapure', brand: 'QNT', name: 'Metapure Zero Carb', category: 'Протеин', price: 36990, rating: 4.9, reviews: 22, image: productImages.whey, flavors: ['Ваниль', 'Шоколад'], sizes: ['2 кг'], inStock: true, description: copy.protein }),
  item({ id: 'rule1-prelift', brand: 'Rule 1', name: 'PreLift', category: 'Предтренировочные', price: 18490, rating: 4.7, reviews: 14, badge: 'Новинка', image: productImages.preworkout, flavors: ['Кислая вишня'], sizes: ['375 г'], inStock: true }),
  item({ id: 'now-zma', brand: 'NOW', name: 'ZMA Sports Recovery', category: 'Витамины', price: 8990, rating: 4.6, reviews: 19, image: productImages.capsules, sizes: ['90 капсул'], inStock: false, description: copy.vitamin }),
  item({ id: 'better-bottle', brand: 'Fit7Pro', name: 'Шейкер Pro 700 ml', category: 'Аксессуары', price: 4990, rating: 4.8, reviews: 58, image: productImages.shaker, flavors: ['Зелёный', 'Графит'], sizes: ['700 мл'], inStock: true, description: 'Удобный шейкер для идеальной консистенции напитка — дома, в зале или по пути.' }),
  item({ id: 'fitloop-set', brand: 'Fit7Pro', name: 'Набор эспандеров Loop', category: 'Аксессуары', price: 7990, oldPrice: 9990, rating: 4.7, reviews: 25, badge: '−20%', image: productImages.fitness, sizes: ['5 уровней'], inStock: true, description: 'Компактный набор для активации мышц, разминки и тренировок дома.' }),
  item({ id: 'mutant-mass', brand: 'Mutant', name: 'Mass Extreme 2500', category: 'Гейнеры', price: 28990, rating: 4.5, reviews: 21, image: productImages.whey, flavors: ['Шоколад'], sizes: ['2.7 кг'], inStock: true, description: copy.protein }),
]

export const categoryCards: Array<{ name: Category; image: string; description: string }> = [
  { name: 'Протеин', image: productImages.whey, description: 'Для восстановления' },
  { name: 'Креатин', image: productImages.powder, description: 'Для силы' },
  { name: 'Витамины', image: productImages.capsules, description: 'Для баланса' },
  { name: 'Аминокислоты', image: productImages.preworkout, description: 'Для выносливости' },
  { name: 'Предтренировочные', image: productImages.preworkout, description: 'Для энергии' },
  { name: 'Гейнеры', image: productImages.whey, description: 'Для набора' },
  { name: 'Жиросжигатели', image: productImages.capsules, description: 'Для рельефа' },
  { name: 'Батончики и снеки', image: productImages.snacks, description: 'Полезный перекус' },
  { name: 'Аксессуары', image: productImages.fitness, description: 'Для тренировок' },
]

export const brands = ['Optimum Nutrition', 'Dymatize', 'MyProtein', 'BSN', 'Maxler', 'Rule 1', 'NOW', 'BioTech USA']

export const stores = [
  { name: 'Fit7Pro · Центр', address: 'ул. Интернациональная, 64', hours: 'Ежедневно · 10:00–20:00', phone: '+7 705 252-55-55' },
  { name: 'Fit7Pro · City Mall', address: 'ТРЦ City Mall, ул. Шокана Уалиханова, 56', hours: 'Ежедневно · 10:00–22:00', phone: '+7 705 252-55-55' },
  { name: 'Fit7Pro · Dostyq Mall', address: 'ТРЦ Dostyq Mall, ул. Магжана Жумабаева, 91', hours: 'Ежедневно · 10:00–22:00', phone: '+7 705 252-55-55' },
  { name: 'Fit7Pro · Рахмет', address: 'ТРК «Рахмет», ул. Карима Сутюшева, 58Б', hours: 'Ежедневно · 10:00–21:00', phone: '+7 705 252-55-55' },
]

export const demoMetrics = [
  ['4', 'магазина в городе'],
  ['1000+', 'товаров в каталоге'],
  ['5.0', 'демо-рейтинг сервиса'],
  ['PKZ', 'рядом с вами'],
] as const
