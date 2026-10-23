import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  // Fiyat hesaplama fonksiyonu (₺1.234,56 -> float number)
  const parsePrice = (priceStr: string): number => {
    try {
      const clean = priceStr.replace('₺', '').trim().replace(/\./g, '').replace(',', '.');
      return parseFloat(clean) || 0;
    } catch {
      return 0;
    }
  };

  const totalPrice = items.reduce((acc, item) => {
    return acc + parsePrice(item.product.price) * item.quantity;
  }, 0);

  const formattedTotal = '₺' + totalPrice.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Başlık */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-700" />
              <h2 className="text-lg font-bold text-slate-800">Sepetim</h2>
              <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} ürün
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* İçerik */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {checkoutSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-900">Siparişiniz Alındı!</h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  PatikaStore siparişiniz başarıyla oluşturuldu. Enes Öztürk imzalı teslimat hazırlanıyor.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-base font-semibold text-slate-700 mb-1">Sepetiniz Boş</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  PatikaStore kataloğundaki ürünlerden beğendiklerinizi sepete ekleyerek başlayabilirsiniz.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 items-center justify-between"
                >
                  <img
                    src={item.product.imgURL}
                    alt={item.product.title}
                    className="w-14 h-14 object-contain bg-white rounded-lg p-1 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs font-semibold text-purple-700 mt-0.5">
                      {item.product.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Alt Özet & Sipariş Butonu */}
          {!checkoutSuccess && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
                <span>Ara Toplam</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
                <span>Kargo</span>
                <span className="text-emerald-600 font-bold">Ücretsiz</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Toplam Tutar</span>
                <span className="text-xl font-black text-purple-700">{formattedTotal}</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
