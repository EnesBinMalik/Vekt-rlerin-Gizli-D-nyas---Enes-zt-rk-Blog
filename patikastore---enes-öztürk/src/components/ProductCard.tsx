import React, { useState } from 'react';
import { Product } from '../data/products';
import { ShoppingBag, Eye, AlertCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isInCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock || !onAddToCart) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between bg-[#eceff1] hover:bg-[#e2e8f0] transition-all duration-200 rounded-xl p-3 cursor-pointer shadow-xs hover:shadow-md border border-slate-200/50"
    >
      {/* Ürün Görseli Container */}
      <div className="relative w-full h-40 sm:h-44 bg-white rounded-lg p-2.5 flex items-center justify-center overflow-hidden shadow-2xs">
        {!imageError ? (
          <img
            src={product.imgURL}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
            <span className="text-3xl mb-1">📦</span>
            <span className="text-[11px] font-medium text-slate-500 line-clamp-1">{product.title}</span>
          </div>
        )}

        {/* Stok Durumu Rozeti */}
        {!product.inStock ? (
          <span className="absolute top-2 left-2 bg-red-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Tükendi
          </span>
        ) : (
          <span className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Stokta
          </span>
        )}
      </div>

      {/* Ürün Bilgileri (PatikaStore orijinal yerleşimi) */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm font-bold text-slate-600">
            {product.price}
          </p>
        </div>

        <div className="mt-2 pt-1 border-t border-slate-200/60 flex items-center justify-between">
          {!product.inStock ? (
            <p className="text-xs font-black text-[#d32f2f] uppercase tracking-wider">
              STOKTA YOK
            </p>
          ) : (
            <p className="text-xs font-semibold text-emerald-600">
              Hızlı Kargo
            </p>
          )}

          {/* Aksiyon Butonları */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
              title="Detayları İncele"
            >
              <Eye className="w-4 h-4" />
            </button>

            {product.inStock && onAddToCart && (
              <button
                type="button"
                onClick={handleAdd}
                className={`p-1.5 rounded-lg transition-colors ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-700 hover:bg-purple-800 text-white'
                }`}
                title={isInCart ? 'Sepete Bir Tane Daha Ekle' : 'Sepete Ekle'}
              >
                {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
