import React, { useState } from 'react';
import { Restaurant } from '../types/restaurant';
import { SafeImage } from './SafeImage';
import { Star, Clock, MapPin, ChevronLeft, ChevronRight, Award, Utensils } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected?: boolean;
  onSelect: (restaurant: Restaurant) => void;
  onOpenDetails: (restaurant: Restaurant) => void;
  onOpenReservation: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isSelected = false,
  onSelect,
  onOpenDetails,
  onOpenReservation
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine hero and gallery images safely
  const allImages = [restaurant.heroImage, ...(restaurant.galleryImages || [])];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Determine current day opening hours
  const todayIndex = new Date().getDay();
  const todaySchedule = restaurant.operatingHours.find((d) => d.dayIndex === todayIndex);
  const isOpenToday = todaySchedule?.isOpen ?? false;
  const hoursText = isOpenToday
    ? `${todaySchedule?.openTime || ''} - ${todaySchedule?.closeTime || ''}`
    : 'Bugün Kapalı';

  return (
    <article
      onClick={() => onSelect(restaurant)}
      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 bg-[#13161f] cursor-pointer ${
        isSelected
          ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/20 shadow-amber-950/20'
          : 'border-stone-800/80 hover:border-stone-700 hover:shadow-lg hover:shadow-black/40'
      }`}
    >
      {/* Top Image Carousel Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <SafeImage
          src={allImages[currentImageIndex] || restaurant.heroImage}
          alt={restaurant.name}
          aspectRatioClass="aspect-[16/10]"
          categoryLabel={restaurant.cuisine}
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161f] via-transparent to-black/40 pointer-events-none" />

        {/* Michelin Star Award Marker */}
        {restaurant.michelinStars && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950/85 border border-amber-500/40 backdrop-blur-md shadow-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">
              {restaurant.michelinStars} Michelin Yıldızı
            </span>
          </div>
        )}

        {/* Rating Floating Tag */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-950/85 border border-stone-800 text-xs font-semibold backdrop-blur-md text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="tabular-nums font-bold">{restaurant.rating.toFixed(1)}</span>
          <span className="text-stone-400 text-[10px]">({restaurant.reviewCount})</span>
        </div>

        {/* Carousel Arrow Controls (Visible on hover) */}
        {allImages.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handlePrevImage}
              aria-label="Önceki Görsel"
              className="p-1.5 rounded-full bg-stone-950/70 text-stone-200 hover:bg-stone-900 border border-stone-700/60 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Sonraki Görsel"
              className="p-1.5 rounded-full bg-stone-950/70 text-stone-200 hover:bg-stone-900 border border-stone-700/60 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Dots Indicator */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
            {allImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-stone-400/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Bar (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
            <span className="text-amber-400 font-medium">{restaurant.city}</span>
            <span aria-hidden="true">·</span>
            <span>{restaurant.country}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-stone-300">{restaurant.priceLevel}</span>
          </div>

          {/* Restaurant Title */}
          <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 font-display">
            {restaurant.name}
          </h3>

          {/* Cuisine Line */}
          <p className="text-xs text-stone-300 font-medium mt-0.5 line-clamp-1">
            {restaurant.cuisine}
          </p>

          {/* Brief Description */}
          <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Working Hours & Reservation Status Bar */}
        <div className="pt-2 border-t border-stone-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span className={`font-medium ${isOpenToday ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isOpenToday ? 'Açık' : 'Kapalı'}
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-400 tabular-nums">{hoursText}</span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">
              {restaurant.reservationRequired ? 'Rezervasyon Zorunlu' : 'Masa Müsait'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(restaurant);
              }}
              className="w-full py-2 px-3 bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 border border-stone-700/50"
            >
              <Utensils className="w-3.5 h-3.5 text-stone-400" />
              <span>İncele</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenReservation(restaurant);
              }}
              className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Rezerve Et</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
