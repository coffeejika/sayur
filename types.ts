
export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  description: string;
  rating: number;
  sold: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export enum Category {
  VEGETABLES = 'Sayuran',
  FRUITS = 'Buah',
  SPICES = 'Bumbu Dapur',
  ORGANIC = 'Organik'
}
