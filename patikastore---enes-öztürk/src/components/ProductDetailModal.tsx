import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Görsel Alanı */}
        <div className="relative bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
          {!imgErr ? (
            <img
              src={product.imgURL}
              alt={product.title}
              onError={() => setImgErr(true)}
              className="max-h-60 max-w-full object-contain drop-shadow-sm"
            />
          ) : (
            <div className="h-48 flex items-center justify-center text-4xl">📦</div>
          )}

          {/* Stok Rozeti */}
          <div className="absolute top-4 left-4">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <Check className="w-3.5 h-3.5" /> Stokta Mevcut
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                STOKTA YOK
              </span>
            )}
          </div>
        </div>

        {/* Detay İçerik */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                {product.category || 'Elektronik'}
              </span>
              {product.rating && (
                <span className="flex items-center text-xs text-amber-600 font-medium gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                  {product.rating} / 5.0
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {product.title}
            </h2>
            <div className="mt-2 text-2xl font-black text-slate-900">
              {product.price}
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description ||
              'PatikaStore kataloğunda yer alan orijinal garantili elektronik ürün.'}
          </p>

          {/* Özellikler */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Truck className="w-4 h-4 mx-auto text-purple-600 mb-1" />
              <span className="text-[11px] font-medium text-slate-600 block">Ücretsiz Kargo</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 mx-auto text-purple-600 mb-1" />
              <span className="text-[11px] font-medium text-slate-600 block">2 Yıl Garanti</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <RefreshCw className="w-4 h-4 mx-auto text-purple-600 mb-1" />
              <span className="text-[11px] font-medium text-slate-600 block">14 Gün İade</span>
            </div>
          </div>

          {/* Sepete Ekle Butonu */}
          <div className="pt-2">
            {product.inStock ? (
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-700 hover:bg-purple-800 text-white active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Sepete Eklendi!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Sepete Ekle ({product.price})
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-200 text-slate-500 cursor-not-allowed text-center"
              >
                Bu Ürün Şu Anda Tükendi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
