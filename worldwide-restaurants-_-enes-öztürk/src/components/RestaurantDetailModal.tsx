import React, { useState } from 'react';
import { Restaurant, Review } from '../types/restaurant';
import { SafeImage } from './SafeImage';
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Award,
  Calendar,
  Utensils,
  MessageSquare,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  Send
} from 'lucide-react';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: (restaurant: Restaurant) => void;
  onAddReview: (restaurantId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onOpenReservation,
  onAddReview
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'hours' | 'menu' | 'reviews'>('info');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // New Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewDishes, setNewReviewDishes] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!isOpen || !restaurant) return null;

  const allPhotos = [restaurant.heroImage, ...(restaurant.galleryImages || [])];
  const todayIndex = new Date().getDay();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    onAddReview(restaurant.id, {
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      title: newReviewTitle.trim() || 'Harika bir deneyim',
      comment: newReviewComment.trim(),
      recommendedDishes: newReviewDishes
        ? newReviewDishes.split(',').map((d) => d.trim()).filter(Boolean)
        : undefined,
      visitType: 'Akşam Yemeği'
    });

    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewTitle('');
    setNewReviewDishes('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#12151d] border border-stone-800 text-stone-100 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Section */}
        <div className="relative w-full bg-stone-950">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <SafeImage
              src={allPhotos[selectedPhotoIndex] || restaurant.heroImage}
              alt={restaurant.name}
              aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
              categoryLabel={restaurant.cuisine}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/30 pointer-events-none" />

            {/* In-photo Badge Stack */}
            <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                  <span>{restaurant.city}, {restaurant.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{restaurant.cuisine}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white drop-shadow">
                  {restaurant.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-base font-bold text-white tabular-nums">{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs text-stone-400">({restaurant.reviewCount} Değerlendirme)</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Selector Strip */}
          {allPhotos.length > 1 && (
            <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-stone-900/90 border-b border-stone-800/80 overflow-x-auto">
              <span className="text-xs text-stone-400 font-medium whitespace-nowrap">Fotoğraflar:</span>
              {allPhotos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    idx === selectedPhotoIndex
                      ? 'border-amber-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${restaurant.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Navigation (Zero-Pill Segmented Tab Control) */}
        <div className="flex items-center justify-between border-b border-stone-800 px-4 sm:px-6 bg-[#0f1218] sticky top-0 z-30">
          <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'info'
                  ? 'border-amber-500 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Genel Bilgiler
            </button>
            <button
              onClick={() => setActiveTab('hours')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'hours'
                  ? 'border-amber-500 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Çalışma Saatleri & Günler
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'menu'
                  ? 'border-amber-500 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              İmzalı Menü ({restaurant.signatureDishes?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-amber-500 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Yorumlar ({restaurant.reviews?.length || 0})
            </button>
          </nav>

          <button
            onClick={() => onOpenReservation(restaurant)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Masa Rezerve Et</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* TAB 1: INFO & OVERVIEW */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Michelin Guide Note */}
              {restaurant.michelinGuideNote && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Michelin Rehberi Değerlendirmesi
                    </h4>
                    <p className="text-sm text-stone-300 mt-1 leading-relaxed">
                      {restaurant.michelinGuideNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Restoran Hakkında
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {restaurant.description}
                </p>
              </div>

              {/* Key Features List */}
              <div>
                <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">
                  Öne Çıkan Özellikler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {restaurant.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-900/40 border border-stone-800/80">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Adres:</span>
                      <span className="text-stone-400">{restaurant.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Telefon:</span>
                      <a href={`tel:${restaurant.phone}`} className="text-amber-400 hover:underline">
                        {restaurant.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Globe className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Resmi Web Sitesi:</span>
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline break-all"
                      >
                        {restaurant.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Kıyafet Kodu (Dress Code):</span>
                      <span className="text-stone-300">{restaurant.dressCode}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Rezervasyon Durumu:</span>
                      <span className="text-stone-300">
                        {restaurant.reservationRequired ? 'Önceden rezervasyon zorunludur' : 'Rezervasyonsuz kabul edilebilir'}
                      </span>
                      {restaurant.reservationDeposit && (
                        <span className="block text-stone-400 mt-0.5">
                          Depozito: {restaurant.reservationDeposit}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-200 block">Ortalama Kişi Başı Hesap:</span>
                      <span className="text-amber-400 font-semibold">{restaurant.averagePricePerPerson}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPERATING HOURS & DAYS */}
          {activeTab === 'hours' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Haftalık İşletme ve Servis Saatleri</span>
                  </h3>
                  <span className="text-xs text-stone-400">Yerel Saat Dilimi</span>
                </div>

                <div className="divide-y divide-stone-800">
                  {restaurant.operatingHours.map((day) => {
                    const isToday = day.dayIndex === todayIndex;
                    return (
                      <div
                        key={day.dayName}
                        className={`py-3 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg transition-colors ${
                          isToday ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-stone-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              day.isOpen ? 'bg-emerald-400' : 'bg-rose-500'
                            }`}
                          />
                          <span className={`text-sm font-medium ${isToday ? 'text-amber-400 font-bold' : 'text-stone-300'}`}>
                            {day.dayName}
                          </span>
                          {isToday && (
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded">
                              Bugün
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-right">
                          {day.isOpen ? (
                            <div className="space-y-0.5">
                              {day.lunchShift && (
                                <div className="text-stone-400">
                                  <span className="text-stone-500">Öğle:</span> {day.lunchShift}
                                </div>
                              )}
                              {day.dinnerShift ? (
                                <div className="text-stone-200 font-medium">
                                  <span className="text-stone-400">Akşam:</span> {day.dinnerShift}
                                </div>
                              ) : (
                                <div className="text-stone-200 font-medium">
                                  {day.openTime} - {day.closeTime}
                                </div>
                              )}
                              {day.note && <div className="text-stone-500 text-[11px]">{day.note}</div>}
                            </div>
                          ) : (
                            <span className="text-rose-400 font-medium">{day.note || 'Kapalı'}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reservation recommendation callout */}
              <div className="p-4 rounded-xl bg-stone-900/30 border border-stone-800 flex items-center justify-between">
                <div className="text-xs text-stone-300">
                  <p className="font-semibold text-stone-100">Çalışma saatleri ve tatil günleri değişiklik gösterebilir.</p>
                  <p className="text-stone-400 mt-0.5">Özel etkinlikler veya resmi tatiller için lütfen öncesinde rezervasyon yaptırınız.</p>
                </div>
                <button
                  onClick={() => onOpenReservation(restaurant)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors shrink-0 ml-4"
                >
                  Masa Ayırt
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SIGNATURE MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-200">Şefin İmza Tabakları & Tadım Seçkisi</h3>
                  <p className="text-xs text-stone-400">Mevsimsel ve taze yerel malzemelerle hazırlanan başyapıtlar</p>
                </div>
                <span className="text-xs font-semibold text-amber-400">{restaurant.averagePricePerPerson}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.signatureDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-4 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-stone-700 transition-colors flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-stone-100 font-display">{dish.name}</h4>
                        <span className="text-xs font-semibold text-amber-400 tabular-nums shrink-0">
                          {dish.price}
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-500/80 uppercase tracking-wider block mt-0.5">
                        {dish.category}
                      </span>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Score Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-stone-900/50 border border-stone-800">
                <div className="text-center">
                  <span className="text-xs text-stone-400">Lezzet</span>
                  <div className="text-xl font-bold text-amber-400 mt-0.5 tabular-nums">
                    {restaurant.ratingsBreakdown.food.toFixed(1)}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-stone-400">Servis & Hizmet</span>
                  <div className="text-xl font-bold text-amber-400 mt-0.5 tabular-nums">
                    {restaurant.ratingsBreakdown.service.toFixed(1)}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-stone-400">Ambiyans</span>
                  <div className="text-xl font-bold text-amber-400 mt-0.5 tabular-nums">
                    {restaurant.ratingsBreakdown.ambiance.toFixed(1)}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-stone-400">Değer / Fiyat</span>
                  <div className="text-xl font-bold text-amber-400 mt-0.5 tabular-nums">
                    {restaurant.ratingsBreakdown.value.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-stone-200">Misafir Deneyimleri ({restaurant.reviews.length})</h4>
                
                {restaurant.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-stone-900/30 border border-stone-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-stone-200 block">{rev.author}</span>
                          <span className="text-[11px] text-stone-400">{rev.date} · {rev.visitType || 'Akşam Yemeği'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h5 className="text-xs font-bold text-stone-200">{rev.title}</h5>
                    <p className="text-xs text-stone-300 leading-relaxed">{rev.comment}</p>

                    {rev.recommendedDishes && rev.recommendedDishes.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-stone-400">
                        <span className="text-stone-500">Tavsiye edilenler:</span>
                        {rev.recommendedDishes.map((dish, i) => (
                          <span key={i} className="text-amber-300 font-medium">
                            {dish}{i < rev.recommendedDishes!.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Review Form */}
              <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Deneyiminizi Paylaşın (Yorum Ekle)</span>
                </h4>

                {reviewSubmitted ? (
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Yorumunuz başarıyla eklendi! Teşekkür ederiz.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-stone-400 block mb-1">
                          Adınız Soyadınız
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="Örn. Selim Yılmaz"
                          className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-stone-400 block mb-1">
                          Puanınız (1 - 5)
                        </label>
                        <div className="flex items-center gap-2 py-1">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              type="button"
                              key={score}
                              onClick={() => setNewReviewRating(score)}
                              className="focus:outline-none p-1"
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  score <= newReviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-stone-600'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs text-stone-300 ml-2 font-bold">{newReviewRating} / 5</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-stone-400 block mb-1">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="Örn. Unutulmaz bir lezzet şöleni"
                        className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-stone-400 block mb-1">
                        Yorumunuz
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Servis, lezzetler ve atmosfer hakkında düşünceleriniz..."
                        className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-stone-400 block mb-1">
                        Öne Çıkan Tabaklar (Virgülle ayırın)
                      </label>
                      <input
                        type="text"
                        value={newReviewDishes}
                        onChange={(e) => setNewReviewDishes(e.target.value)}
                        placeholder="Örn. Ahtapot Firik, Şef Tatlısı, Şarap Menüsü"
                        className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Yorumu Yayınla</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer sticky bar on mobile */}
        <div className="p-4 bg-[#0f1218] border-t border-stone-800 flex items-center justify-between sm:hidden">
          <div>
            <span className="text-xs text-stone-400 block">{restaurant.city}</span>
            <span className="text-sm font-bold text-white font-display">{restaurant.name}</span>
          </div>
          <button
            onClick={() => onOpenReservation(restaurant)}
            className="px-4 py-2 bg-amber-500 text-stone-950 text-xs font-bold rounded-lg"
          >
            Masa Ayırt
          </button>
        </div>
      </div>
    </div>
  );
};
