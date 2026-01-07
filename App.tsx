
import React, { useState, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Semua') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  }, []);

  const totalItems = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0), 
  [cartItems]);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar 
        cartCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => setActiveCategory('Semua')}
      />

      <main>
        {/* Mobile Search - Visible on Small Screens */}
        <div className="md:hidden px-4 py-3 bg-white">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Lagi pengen masak apa hari ini?" 
              className="w-full bg-gray-100 border-none rounded-2xl py-3 px-11 focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>

        {/* Hero Section - Compact for Mobile */}
        <section className="px-4 py-4 md:py-10">
          <div className="relative h-48 md:h-[400px] rounded-[2rem] overflow-hidden bg-emerald-600">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
              alt="Fresh Vegetables" 
            />
            <div className="relative h-full flex flex-col justify-center px-6 md:px-12 text-white">
              <h1 className="text-2xl md:text-5xl font-black mb-2 md:mb-4 leading-tight">
                Diskon 50% <br className="md:hidden" /> Panen Pagi Ini
              </h1>
              <p className="text-xs md:text-lg opacity-90 max-w-xs md:max-w-md mb-6 font-medium">
                Pesan sekarang, dikirim langsung dari kebun dalam 2 jam.
              </p>
              <button className="bg-white text-emerald-600 w-fit px-6 py-2 rounded-full font-bold text-sm shadow-xl active:scale-95 transition-transform">
                Ambil Promo
              </button>
            </div>
          </div>
        </section>

        {/* Categories Bar - Minimalist */}
        <div className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar flex space-x-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-gray-100 text-slate-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 Columns on Mobile */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-2xl font-black text-slate-800">Sayuran Segar</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Lihat Semua</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </section>

        {/* Values - Simple Icon Row */}
        <section className="px-4 py-12 border-t border-gray-50">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pasti Fresh</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">2 Jam Sampai</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Bebas Ongkir</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-gray-100 py-10 pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xl font-black text-emerald-600 mb-2">SayurAstra</div>
          <p className="text-slate-400 text-xs mb-6">Pilihan No. 1 Keluarga Indonesia</p>
          <div className="flex justify-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#">Bantuan</a>
            <a href="#">Karir</a>
            <a href="#">Media</a>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button for Mobile (Alternative access) */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden animate-bounce">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-emerald-600 text-white px-8 py-4 rounded-full font-black flex items-center shadow-2xl space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span>Lihat Keranjang ({totalItems})</span>
          </button>
        </div>
      )}

      {isCartOpen && (
        <Cart 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)} 
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />
      )}
    </div>
  );
};

export default App;
