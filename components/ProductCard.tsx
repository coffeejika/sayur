
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full active:scale-[0.98] transition-transform">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-emerald-500/90 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-full text-white uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-emerald-600 font-extrabold text-base md:text-lg mb-2">
          Rp {product.price.toLocaleString('id-ID')}
          <span className="text-[10px] font-medium text-slate-400 ml-1">/ {product.unit}</span>
        </p>
        <div className="flex items-center text-[10px] md:text-xs text-slate-400 mb-4 mt-auto">
          <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 font-bold mr-2">
            <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            {product.rating}
          </div>
          <span>Terjual {product.sold}+</span>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-2xl font-bold hover:bg-emerald-700 active:scale-95 transition-all text-xs"
        >
          Beli
        </button>
      </div>
    </div>
  );
};
