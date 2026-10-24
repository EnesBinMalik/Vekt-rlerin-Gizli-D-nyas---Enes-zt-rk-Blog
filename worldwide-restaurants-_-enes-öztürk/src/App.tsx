import React, { useState, useMemo, useEffect } from 'react';
import { Restaurant, FilterState, Reservation, Review } from './types/restaurant';
import { INITIAL_RESTAURANTS, WORLD_CITIES } from './data/restaurants';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CityJumper } from './components/CityJumper';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { MapComponent } from './components/MapComponent';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { MyReservationsDrawer } from './components/MyReservationsDrawer';
import { SignatureFooter } from './components/SignatureFooter';
import { Search, Sparkles, Utensils, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'worldwide_restaurants_reservations_v1';

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [detailModalRestaurant, setDetailModalRestaurant] = useState<Restaurant | null>(null);
  const [reservationRestaurant, setReservationRestaurant] = useState<Restaurant | null>(null);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'split' | 'grid' | 'map'>('split');
  const [activeCityCoordinates, setActiveCityCoordinates] = useState<{ lat: number; lng: number; zoom: number } | null>(null);

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    cuisine: 'Tümü',
    continent: 'Tümü',
    city: 'Tümü',
    priceLevel: 'Tümü',
    minRating: 0,
    michelinOnly: false,
    openNowOnly: false,
    sortBy: 'recommended'
  });

  // Persistent User Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Initial sample reservation to demonstrate full flow
    return [
      {
        id: 'WR-8932-IST',
        restaurantId: 'rest-mikla-istanbul',
        restaurantName: 'Mikla',
        restaurantCity: 'İstanbul',
        restaurantImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        date: '2026-11-15',
        timeSlot: '20:00',
        guests: 2,
        seatingArea: 'Manzaralı Teras',
        specialRequests: 'Yıl dönümü kutlaması için pencere kenarı rica ederiz.',
        customerName: 'Enes Öztürk',
        customerEmail: 'enes@example.com',
        customerPhone: '+90 532 000 00 00',
        status: 'Onaylandı',
        createdAt: '24 Ekim 2026'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  // Handle Review Submission
  const handleAddReview = (restaurantId: string, newReviewData: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === restaurantId) {
          const updatedReviews = [fullReview, ...r.reviews];
          const newAvgRating =
            updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) / updatedReviews.length;
          return {
            ...r,
            rating: Number(newAvgRating.toFixed(2)),
            reviewCount: r.reviewCount + 1,
            reviews: updatedReviews
          };
        }
        return r;
      })
    );

    // Update detailModalRestaurant if open
    setDetailModalRestaurant((prev) => {
      if (prev && prev.id === restaurantId) {
        const updatedReviews = [fullReview, ...prev.reviews];
        const newAvgRating =
          updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          rating: Number(newAvgRating.toFixed(2)),
          reviewCount: prev.reviewCount + 1,
          reviews: updatedReviews
        };
      }
      return prev;
    });
  };

  // Handle Reservation Confirmation
  const handleConfirmReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  // Handle Reservation Cancellation
  const handleCancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // Helper to check if a restaurant is currently open right now
  const isRestaurantOpenNow = (restaurant: Restaurant): boolean => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 is Sunday, 1 is Monday...
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = restaurant.operatingHours.find((d) => d.dayIndex === dayIndex);
    if (!todaySchedule || !todaySchedule.isOpen || !todaySchedule.openTime || !todaySchedule.closeTime) {
      return false;
    }

    const [openH, openM] = todaySchedule.openTime.split(':').map(Number);
    const [closeH, closeM] = todaySchedule.closeTime.split(':').map(Number);
    const openTotal = openH * 60 + openM;
    let closeTotal = closeH * 60 + closeM;

    // Handle closing after midnight (e.g., 00:00 or 01:00)
    if (closeTotal <= openTotal) {
      closeTotal += 24 * 60;
    }

    // Normal shift check
    return currentMinutes >= openTotal && currentMinutes <= closeTotal;
  };

  // Filtered & Sorted Restaurants
  const filteredRestaurants = useMemo(() => {
    const query = filter.searchQuery.trim().toLowerCase();

    return restaurants
      .filter((r) => {
        // Search query
        if (query) {
          const inName = r.name.toLowerCase().includes(query);
          const inCity = r.city.toLowerCase().includes(query);
          const inCountry = r.country.toLowerCase().includes(query);
          const inCuisine = r.cuisine.toLowerCase().includes(query);
          const inDishes = r.signatureDishes.some(
            (d) =>
              d.name.toLowerCase().includes(query) ||
              d.description.toLowerCase().includes(query)
          );
          if (!inName && !inCity && !inCountry && !inCuisine && !inDishes) {
            return false;
          }
        }

        // City filter
        if (filter.city !== 'Tümü' && r.city !== filter.city) {
          return false;
        }

        // Cuisine filter
        if (filter.cuisine !== 'Tümü' && !r.cuisine.includes(filter.cuisine)) {
          return false;
        }

        // Price Level
        if (filter.priceLevel !== 'Tümü' && r.priceLevel !== filter.priceLevel) {
          return false;
        }

        // Michelin stars
        if (filter.michelinOnly && !r.michelinStars) {
          return false;
        }

        // Open Now
        if (filter.openNowOnly && !isRestaurantOpenNow(r)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'rating') return b.rating - a.rating;
        if (filter.sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (filter.sortBy === 'priceAsc') return a.priceLevel.length - b.priceLevel.length;
        if (filter.sortBy === 'priceDesc') return b.priceLevel.length - a.priceLevel.length;
        return 0; // recommended order preserved
      });
  }, [restaurants, filter]);

  // Handle City Selection from Jumper
  const handleSelectCity = (cityName: string, coords?: { lat: number; lng: number; zoom: number }) => {
    setFilter((prev) => ({ ...prev, city: cityName }));
    if (coords) {
      setActiveCityCoordinates(coords);
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1115] text-[#e8e9ed]">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Navbar
        reservationCount={reservations.length}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        activeView={activeView}
        onViewChange={setActiveView}
        onScrollToExplore={scrollToExplore}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={scrollToExplore}
          onOpenMapClick={() => {
            setActiveView('map');
            scrollToExplore();
          }}
          totalRestaurants={restaurants.length}
        />

        {/* Explore & Main Directory Section */}
        <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Quick City Jumper Bar */}
          <CityJumper
            selectedCity={filter.city}
            onSelectCity={handleSelectCity}
          />

          {/* Search & Filter Bar */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            onResetFilter={() =>
              setFilter({
                searchQuery: '',
                cuisine: 'Tümü',
                continent: 'Tümü',
                city: 'Tümü',
                priceLevel: 'Tümü',
                minRating: 0,
                michelinOnly: false,
                openNowOnly: false,
                sortBy: 'recommended'
              })
            }
            activeView={activeView}
            onViewChange={setActiveView}
            totalCount={filteredRestaurants.length}
          />

          {/* Results Count & Active Status */}
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-200 tabular-nums">
                {filteredRestaurants.length} Restoran Bulundu
              </span>
              {filter.city !== 'Tümü' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-medium">{filter.city}</span>
                </>
              )}
              {filter.cuisine !== 'Tümü' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-300">{filter.cuisine}</span>
                </>
              )}
            </div>

            <div className="text-[11px] text-stone-500 hidden sm:block">
              Harita pinine tıklayarak sayfadan ayrılmadan detayları görüntüleyebilirsiniz.
            </div>
          </div>

          {/* Empty State */}
          {filteredRestaurants.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-800 text-stone-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-200">Aramanıza uygun restoran bulunamadı</h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Lütfen arama terimlerinizi değiştirin veya aktif filtreleri sıfırlayarak tüm dünya restoranlarını keşfetmeye devam edin.
              </p>
              <button
                onClick={() =>
                  setFilter({
                    searchQuery: '',
                    cuisine: 'Tümü',
                    continent: 'Tümü',
                    city: 'Tümü',
                    priceLevel: 'Tümü',
                    minRating: 0,
                    michelinOnly: false,
                    openNowOnly: false,
                    sortBy: 'recommended'
                  })
                }
                className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg transition-colors"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            <>
              {/* VIEW 1: SPLIT VIEW (List on Left, Sticky Interactive Map on Right) */}
              {activeView === 'split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Restaurant Cards Stream (6 cols) */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isSelected={selectedRestaurant?.id === restaurant.id}
                        onSelect={(r) => setSelectedRestaurant(r)}
                        onOpenDetails={(r) => setDetailModalRestaurant(r)}
                        onOpenReservation={(r) => setReservationRestaurant(r)}
                      />
                    ))}
                  </div>

                  {/* Sticky Map Container (6 cols) */}
                  <div className="lg:col-span-6 lg:sticky lg:top-20 h-[520px] lg:h-[calc(100vh-6rem)] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                    <MapComponent
                      restaurants={filteredRestaurants}
                      selectedRestaurant={selectedRestaurant}
                      onSelectRestaurant={(r) => setSelectedRestaurant(r)}
                      onOpenDetails={(r) => setDetailModalRestaurant(r)}
                      onOpenReservation={(r) => setReservationRestaurant(r)}
                      activeCityCoordinates={activeCityCoordinates}
                    />
                  </div>
                </div>
              )}

              {/* VIEW 2: GRID VIEW (3 Columns on Desktop) */}
              {activeView === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      isSelected={selectedRestaurant?.id === restaurant.id}
                      onSelect={(r) => setSelectedRestaurant(r)}
                      onOpenDetails={(r) => setDetailModalRestaurant(r)}
                      onOpenReservation={(r) => setReservationRestaurant(r)}
                    />
                  ))}
                </div>
              )}

              {/* VIEW 3: FULL MAP VIEW */}
              {activeView === 'map' && (
                <div className="space-y-4">
                  <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                    <MapComponent
                      restaurants={filteredRestaurants}
                      selectedRestaurant={selectedRestaurant}
                      onSelectRestaurant={(r) => setSelectedRestaurant(r)}
                      onOpenDetails={(r) => setDetailModalRestaurant(r)}
                      onOpenReservation={(r) => setReservationRestaurant(r)}
                      activeCityCoordinates={activeCityCoordinates}
                    />
                  </div>

                  {/* Horizontal Scroll Quick List below full map */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-stone-300">
                      Haritadaki Restoranlar ({filteredRestaurants.length}):
                    </span>
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
                      {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="w-72 shrink-0">
                          <RestaurantCard
                            restaurant={restaurant}
                            isSelected={selectedRestaurant?.id === restaurant.id}
                            onSelect={(r) => setSelectedRestaurant(r)}
                            onOpenDetails={(r) => setDetailModalRestaurant(r)}
                            onOpenReservation={(r) => setReservationRestaurant(r)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Signature Footer with Enes Öztürk Signature */}
      <SignatureFooter />

      {/* Modals & Drawers */}
      <RestaurantDetailModal
        restaurant={detailModalRestaurant}
        isOpen={!!detailModalRestaurant}
        onClose={() => setDetailModalRestaurant(null)}
        onOpenReservation={(r) => {
          setDetailModalRestaurant(null);
          setReservationRestaurant(r);
        }}
        onAddReview={handleAddReview}
      />

      <ReservationModal
        restaurant={reservationRestaurant}
        isOpen={!!reservationRestaurant}
        onClose={() => setReservationRestaurant(null)}
        onConfirmReservation={handleConfirmReservation}
      />

      <MyReservationsDrawer
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
      />
    </div>
  );
}
