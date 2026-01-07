
import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bayam Segar Organik',
    price: 8500,
    unit: 'Ikat',
    image: 'https://picsum.photos/seed/spinach/400/300',
    category: Category.VEGETABLES,
    description: 'Bayam segar pilihan dari petani lokal Bandung. Dipetik setiap pagi untuk menjaga kualitas.',
    rating: 4.8,
    sold: 1200
  },
  {
    id: '2',
    name: 'Wortel Berastagi',
    price: 12000,
    unit: '500g',
    image: 'https://picsum.photos/seed/carrot/400/300',
    category: Category.VEGETABLES,
    description: 'Wortel manis dan renyah dari tanah vulkanik Berastagi.',
    rating: 4.9,
    sold: 850
  },
  {
    id: '3',
    name: 'Apel Fuji Premium',
    price: 45000,
    unit: '1kg',
    image: 'https://picsum.photos/seed/apple/400/300',
    category: Category.FRUITS,
    description: 'Apel Fuji impor dengan tekstur garing dan rasa manis yang konsisten.',
    rating: 4.7,
    sold: 430
  },
  {
    id: '4',
    name: 'Bawang Merah Brebes',
    price: 32000,
    unit: '500g',
    image: 'https://picsum.photos/seed/onion/400/300',
    category: Category.SPICES,
    description: 'Bawang merah kualitas ekspor, aroma kuat dan tahan lama.',
    rating: 4.6,
    sold: 2100
  },
  {
    id: '5',
    name: 'Brokoli Hijau',
    price: 18500,
    unit: 'Pcs',
    image: 'https://picsum.photos/seed/broccoli/400/300',
    category: Category.VEGETABLES,
    description: 'Brokoli kaya serat dan vitamin, tanpa pestisida kimia.',
    rating: 4.8,
    sold: 670
  },
  {
    id: '6',
    name: 'Alpukat Mentega',
    price: 38000,
    unit: '1kg',
    image: 'https://picsum.photos/seed/avocado/400/300',
    category: Category.FRUITS,
    description: 'Alpukat pilihan yang sudah matang pohon, tekstur creamy.',
    rating: 4.9,
    sold: 920
  }
];
