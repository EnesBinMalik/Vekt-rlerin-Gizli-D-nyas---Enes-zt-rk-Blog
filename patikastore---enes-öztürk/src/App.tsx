/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PRODUCTS_DATA, Product } from './data/products';
import { ProductCard } from './components/ProductCard';
import { SearchBar } from './components/SearchBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CodeViewerModal } from './components/CodeViewerModal';
import { MobileFrame } from './components/MobileFrame';
import {
  ShoppingBag,
  Code2,
  Smartphone,
  Monitor,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  // Modallar ve Çekmeceler
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Fiyat ayrıştırma
  const parsePrice = (priceStr: string): number => {
    try {
      const clean = priceStr.replace('₺', '').trim().replace(/\./g, '').replace(',', '.');
      return parseFloat(clean) || 0;
    } catch {
      return 0;
    }
  };

  // Kategoriler listesi
  const categories = useMemo(() => {
    const list = Array.from(new Set(PRODUCTS_DATA.map((p) => p.category).filter(Boolean)));
    return ['all', ...list] as string[];
  }, []);

  // Filtrelenmiş ve sıralanmış ürünler
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      // Metin araması
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
        (item.category && item.category.toLowerCase().includes(searchValue.toLowerCase().trim()));

      // Stok filtresi
      const matchesStock =
        stockFilter === 'all'
          ? true
          : stockFilter === 'in_stock'
          ? item.inStock
          : !item.inStock;

      // Kategori filtresi
      const matchesCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      return matchesSearch && matchesStock && matchesCategory;
    }).sort((a, b) => {
      if (sortOrder === 'price_asc') {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      if (sortOrder === 'price_desc') {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      return 0;
    });
  }, [searchValue, stockFilter, selectedCategory, sortOrder]);

  // Sepet İşlemleri
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // PatikaStore İçeriği (Hem Mobil Çerçeve hem Geniş Görünüm için ortak)
  const renderStoreContent = () => (
    <div className="w-full flex flex-col">
      {/* PatikaStore Başlık ve Üst Bar */}
      <div className="flex items-center justify-between pt-1 pb-0.5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#800080] tracking-tight">
            PATIKASTORE
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-semibold text-slate-500">
              Geliştirici: <span className="text-purple-700 font-bold">Enes Öztürk</span>
            </p>
          </div>
        </div>

        {/* Sepet İkonu */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
          title="Sepeti Görüntüle"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Arama Çubuğu */}
      <SearchBar
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder="Ara..."
      />

      {/* Filtre ve Sıralama Çubukları */}
      <div className="space-y-2 mb-3">
        {/* Stok Filtre Hapları */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setStockFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              stockFilter === 'all'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tümü ({PRODUCTS_DATA.length})
          </button>
          <button
            onClick={() => setStockFilter('in_stock')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              stockFilter === 'in_stock'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Stoktakiler ({PRODUCTS_DATA.filter((p) => p.inStock).length})
          </button>
          <button
            onClick={() => setStockFilter('out_of_stock')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              stockFilter === 'out_of_stock'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tükenenler ({PRODUCTS_DATA.filter((p) => !p.inStock).length})
          </button>

          {/* Sıralama Seçici */}
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              aria-label="Ürünleri Sırala"
              className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <option value="default">Varsayılan Sıra</option>
              <option value="price_asc">Fiyat: Artan</option>
              <option value="price_desc">Fiyat: Azalan</option>
            </select>
          </div>
        </div>

        {/* Kategori Etiketleri */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Tüm Kategoriler' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Listesi (FlatList numColumns=2 Görünümü) */}
      {filteredProducts.length > 0 ? (
        <div
          className={`grid gap-2.5 sm:gap-3 ${
            viewMode === 'mobile'
              ? 'grid-cols-2'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
              onAddToCart={handleAddToCart}
              isInCart={cartItems.some((ci) => ci.product.id === product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 my-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">Ürün Bulunamadı</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mb-3">
            "{searchValue}" aramasına veya seçilen filtrelere uygun ürün bulunamadı.
          </p>
          <button
            onClick={() => {
              setSearchValue('');
              setStockFilter('all');
              setSelectedCategory('all');
              setSortOrder('default');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Filtreleri Sıfırla
          </button>
        </div>
      )}

      {/* Alt Bilgi / Enes Öztürk İmzası */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 text-center pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200/60 rounded-full text-purple-900 text-xs font-semibold mb-1">
          <Award className="w-3.5 h-3.5 text-purple-700" />
          <span>Hazırlayan: Enes Öztürk</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Patika.dev React Native Bootcamp Ödevi • FlatList & numColumns=2
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Üst Yönetim / Tanıtım Çubuğu */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Başlık Bilgisi */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-lg shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  PatikaStore Ödevi
                </span>
                <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Enes Öztürk
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Patika.dev React Native Projesi • 2 Sütunlu FlatList & Arama Çubuğu
              </p>
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex items-center gap-2">
            {/* Görünüm Modu Değiştirici */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Mobil Cihaz Görünümü"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobil Çerçeve</span>
              </button>
              <button
                onClick={() => setViewMode('responsive')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'responsive'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tam Genişlik Web Görünümü"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Geniş Ekran</span>
              </button>
            </div>

            {/* React Native Kodlarını Gör Butonu */}
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>RN Kodları</span>
            </button>

            {/* Sepet Butonu */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sepet</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-purple-800 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Ana Gövde */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6">
        {viewMode === 'mobile' ? (
          <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in duration-200">
            {/* Mobil Önizleme Açıklaması */}
            <div className="mb-2 text-center text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Orijinal PatikaStore React Native Mobil Ekran Simülasyonu</span>
            </div>

            <MobileFrame>{renderStoreContent()}</MobileFrame>
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 animate-in fade-in duration-200">
            {renderStoreContent()}
          </div>
        )}
      </main>

      {/* Alt Bilgi Bannerı */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">PatikaStore</span>
            <span>•</span>
            <span className="font-semibold text-purple-700">Enes Öztürk İmzasıyla Hazırlanmıştır</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>React Native</span>
            <span>•</span>
            <span>FlatList (numColumns=2)</span>
            <span>•</span>
            <span>SearchBar</span>
            <span>•</span>
            <span>Ödev Teslim Projesi</span>
          </div>
        </div>
      </footer>

      {/* Modallar */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <CodeViewerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
