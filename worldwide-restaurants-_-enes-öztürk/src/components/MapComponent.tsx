import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Restaurant } from '../types/restaurant';
import { Sparkles, Compass, Star, Clock, ChevronRight, CalendarCheck } from 'lucide-react';

interface MapComponentProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenDetails: (restaurant: Restaurant) => void;
  onOpenReservation: (restaurant: Restaurant) => void;
  activeCityCoordinates?: { lat: number; lng: number; zoom: number } | null;
  className?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  onOpenDetails,
  onOpenReservation,
  activeCityCoordinates,
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center on world view / Europe-Mediterranean intersection
    const map = L.map(mapContainerRef.current, {
      center: [35.0, 15.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false
    });

    // Elegant CartoDB Voyager tiles (high visual elegance, clear world geography)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Reposition zoom control to top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Handle map resize nicely
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle fly to active city coordinates or selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (activeCityCoordinates) {
      mapInstanceRef.current.flyTo(
        [activeCityCoordinates.lat, activeCityCoordinates.lng],
        activeCityCoordinates.zoom,
        { duration: 1.5 }
      );
    }
  }, [activeCityCoordinates]);

  // Handle fly to selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRestaurant) return;
    mapInstanceRef.current.flyTo(
      [selectedRestaurant.coordinates.lat, selectedRestaurant.coordinates.lng],
      14,
      { duration: 1.2 }
    );
  }, [selectedRestaurant]);

  // Update Markers when restaurants list or selected changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    restaurants.forEach((restaurant) => {
      const isSelected = selectedRestaurant?.id === restaurant.id;

      // Determine today's operating hours
      const todayIndex = new Date().getDay();
      const todaySchedule = restaurant.operatingHours.find(d => d.dayIndex === todayIndex);
      const isOpenToday = todaySchedule?.isOpen ?? false;
      const hoursText = isOpenToday
        ? `${todaySchedule?.openTime || ''} - ${todaySchedule?.closeTime || ''}`
        : 'Bugün Kapalı';

      // Custom marker icon HTML
      const michelinBadge = restaurant.michelinStars
        ? `<span class="bg-amber-500 text-stone-950 font-black text-[9px] px-1 py-0.2 rounded-sm ml-1">★${restaurant.michelinStars}</span>`
        : '';

      const markerHtml = `
        <div class="custom-map-pin transition-transform duration-200 hover:scale-110 cursor-pointer ${
          isSelected ? 'scale-125 z-50' : 'z-10'
        }">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border ${
            isSelected
              ? 'bg-amber-500 text-stone-950 font-bold border-white ring-4 ring-amber-500/30'
              : 'bg-stone-900/95 text-stone-100 font-semibold border-amber-500/40 hover:border-amber-400'
          } backdrop-blur-md">
            <span class="text-xs">★ ${restaurant.rating.toFixed(1)}</span>
            <span class="text-[10px] opacity-75">${restaurant.priceLevel}</span>
            ${michelinBadge}
          </div>
          <div class="w-2 h-2 mx-auto -mt-1 rotate-45 ${
            isSelected ? 'bg-amber-500' : 'bg-stone-900 border-r border-b border-amber-500/40'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [80, 36],
        iconAnchor: [40, 34],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([restaurant.coordinates.lat, restaurant.coordinates.lng], {
        icon: customIcon
      });

      // Interactive popup right on the map with photo, hours, rating and instant buttons
      const popupContent = document.createElement('div');
      popupContent.className = 'w-72 bg-[#12151d] text-stone-200 rounded-xl overflow-hidden font-sans';
      popupContent.innerHTML = `
        <div class="relative h-32 w-full bg-[#1e2330] overflow-hidden group">
          <img 
            src="${restaurant.heroImage}" 
            alt="${restaurant.name}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/30"></div>
          
          <div class="absolute top-2 left-2 flex items-center gap-1.5">
            ${
              restaurant.michelinStars
                ? `<span class="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    ${'★'.repeat(restaurant.michelinStars)} Michelin Yıldızı
                   </span>`
                : ''
            }
          </div>

          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
            <span class="font-bold text-white text-sm drop-shadow-md truncate">${restaurant.name}</span>
            <span class="text-amber-400 font-semibold flex items-center gap-0.5 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
              ★ ${restaurant.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div class="p-3 space-y-2">
          <div class="flex items-center justify-between text-[11px] text-stone-400">
            <span>${restaurant.city}, ${restaurant.country}</span>
            <span class="text-amber-400/90 font-medium">${restaurant.priceLevel} · ${restaurant.cuisine.split('&')[0]}</span>
          </div>

          <div class="flex items-center gap-1.5 text-[11px] py-1 border-t border-stone-800/80 text-stone-300">
            <span class="inline-block w-2 h-2 rounded-full ${isOpenToday ? 'bg-emerald-400' : 'bg-rose-400'}"></span>
            <span class="font-medium ${isOpenToday ? 'text-emerald-300' : 'text-stone-400'}">
              ${isOpenToday ? 'Açık' : 'Bugün Kapalı'}
            </span>
            <span class="text-stone-500">·</span>
            <span class="text-stone-400 truncate">${hoursText}</span>
          </div>

          <p class="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
            ${restaurant.description}
          </p>

          <div class="grid grid-cols-2 gap-2 pt-1 border-t border-stone-800/80">
            <button 
              id="map-detail-btn-${restaurant.id}"
              class="w-full py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>Detaylar</span>
              <span class="text-[10px]">→</span>
            </button>
            <button 
              id="map-reserve-btn-${restaurant.id}"
              class="w-full py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Rezerve Et</span>
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'luxury-map-popup'
      });

      marker.on('click', () => {
        onSelectRestaurant(restaurant);
      });

      marker.on('popupopen', () => {
        const detailBtn = document.getElementById(`map-detail-btn-${restaurant.id}`);
        if (detailBtn) {
          detailBtn.onclick = (e) => {
            e.stopPropagation();
            onOpenDetails(restaurant);
          };
        }
        const reserveBtn = document.getElementById(`map-reserve-btn-${restaurant.id}`);
        if (reserveBtn) {
          reserveBtn.onclick = (e) => {
            e.stopPropagation();
            onOpenReservation(restaurant);
          };
        }
      });

      markersLayer.addLayer(marker);
    });
  }, [restaurants, selectedRestaurant, onSelectRestaurant, onOpenDetails, onOpenReservation]);

  return (
    <div className={`relative w-full h-full min-h-[400px] overflow-hidden ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Map Header Floating Overlay Badge */}
      <div className="absolute top-4 left-4 z-[400] pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-700/60 backdrop-blur-md shadow-xl text-stone-200 text-xs">
          <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="font-semibold tracking-wide">Dünya Restoran Haritası</span>
          <span className="text-stone-500">|</span>
          <span className="text-amber-400 font-medium tabular-nums">{restaurants.length} Restoran</span>
        </div>
      </div>

      {/* Global Explorer Hint */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:block pointer-events-none">
        <div className="px-3 py-1.5 rounded-md bg-stone-900/85 border border-stone-800 text-[11px] text-stone-400 backdrop-blur-sm">
          <span>Harita üzerindeki işaretçilere tıklayarak fotoğrafları ve çalışma saatlerini inceleyebilirsiniz</span>
        </div>
      </div>
    </div>
  );
};
