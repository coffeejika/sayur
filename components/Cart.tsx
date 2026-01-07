
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onClose, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const platformFee = items.length > 0 ? 2500 : 0;
  const total = subtotal + platformFee;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-stretch md:justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative h-[85vh] md:h-full w-full md:max-w-md bg-white rounded-t-3xl md:rounded-none shadow-2xl flex flex-col transition-transform">
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Keranjang</h2>
            <p className="text-sm text-slate-400">{items.length} produk terpilih</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <p className="text-slate-500 font-medium">Keranjang masih kosong</p>
              <button onClick={onClose} className="mt-4 text-emerald-600 font-bold">Mulai Belanja</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center group">
                <img src={item.product.image} className="w-20 h-20 object-cover rounded-2xl bg-gray-50" alt={item.product.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm">{item.product.name}</h4>
                    <button 
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      aria-label="Hapus item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-emerald-600 font-extrabold text-sm mt-0.5">Rp {item.product.price.toLocaleString('id-ID')}</p>
                  <div className="flex items-center mt-2 bg-gray-100 rounded-xl w-max overflow-hidden">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="px-3 py-1.5 hover:bg-gray-200 text-slate-600 font-bold"
                    >-</button>
                    <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="px-3 py-1.5 hover:bg-gray-200 text-slate-600 font-bold"
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-gray-100 safe-bottom">
          {items.length > 0 && (
            <div className="space-y-2 mb-6 border-b border-dashed border-slate-200 pb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-800 font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Biaya Aplikasi</span>
                <span className="text-slate-800 font-semibold">Rp {platformFee.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-500 font-bold">Total Tagihan</span>
            <span className="text-2xl font-black text-emerald-600">Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all disabled:opacity-50"
          >
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
