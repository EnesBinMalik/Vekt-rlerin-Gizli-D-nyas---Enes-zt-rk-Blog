import { useState, useEffect, useCallback } from 'react';
import { WeatherData, LocationInfo } from './types/weather';
import {
  detectUserCurrentLocation,
  fetchWeatherData,
  getNextRandomLocation,
  DEFAULT_LOCATION,
} from './services/weatherApi';
import { getWeatherConditionMeta } from './services/weatherUtils';
import { WeatherIcon } from './components/WeatherIcon';
import { PullToRefresh } from './components/PullToRefresh';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { SignatureModal } from './components/SignatureModal';
import { LocationSearchModal } from './components/LocationSearchModal';
import {
  MapPin,
  Navigation,
  Shuffle,
  Search,
  Sparkles,
  Smartphone,
  Monitor,
  Feather,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'info' | 'success' | 'warning'>('info');

  // Modals & View Modes
  const [isSignatureOpen, setIsSignatureOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Toast bildirim gösterici
  const showToast = useCallback((msg: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setStatusMessage(msg);
    setStatusType(type);
    setTimeout(() => {
      setStatusMessage((current) => (current === msg ? null : current));
    }, 4000);
  }, []);

  // Belirli bir konumun hava durumunu yükle
  const loadWeatherForLocation = useCallback(
    async (loc: LocationInfo, isInitial: boolean = false) => {
      try {
        if (!isInitial) setIsRefreshing(true);
        const data = await fetchWeatherData(loc);
        setWeatherData(data);

        if (!isInitial) {
          if (loc.isCurrentLocation) {
            showToast(`📍 Mevcut konumunuz güncellendi: ${loc.district}, ${loc.city}`, 'success');
          } else {
            showToast(`🎲 Rastgele konum keşfedildi: ${loc.district}, ${loc.city}`, 'info');
          }
        }
      } catch (err) {
        console.error('Hava durumu verisi çekilirken hata:', err);
        showToast('Hava durumu verisi alınırken bir sorun oluştu.', 'warning');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [showToast]
  );

  // Kullanıcının anlık konumunu GPS ile tespit et
  const handleDetectLocation = useCallback(
    async (isInitial: boolean = false) => {
      setIsLoading(true);
      try {
        const detected = await detectUserCurrentLocation();
        await loadWeatherForLocation(detected, isInitial);
      } catch (err) {
        console.warn('GPS konum tespiti başarısız veya izin verilmedi:', err);
        // Fallback olarak varsayılan konum göster
        await loadWeatherForLocation(DEFAULT_LOCATION, isInitial);
        if (!isInitial) {
          showToast('GPS izni alınamadı, Kadıköy, İstanbul varsayılan olarak açıldı.', 'warning');
        }
      }
    },
    [loadWeatherForLocation, showToast]
  );

  // İlk açılışta anlık konumu otomatik belirle
  useEffect(() => {
    handleDetectLocation(true);
  }, [handleDetectLocation]);

  // Pull-to-Refresh tetiklendiğinde rastgele bir konum getir
  const handlePullToRefresh = async () => {
    const nextLoc = getNextRandomLocation(weatherData?.location.formattedName);
    await loadWeatherForLocation(nextLoc);
  };

  // Butonla doğrudan rastgele konuma geç
  const handleRandomLocationClick = () => {
    const nextLoc = getNextRandomLocation(weatherData?.location.formattedName);
    loadWeatherForLocation(nextLoc);
  };

  const current = weatherData?.current;
  const location = weatherData?.location;
  const meta = current
    ? getWeatherConditionMeta(current.weatherCode, current.isDay)
    : getWeatherConditionMeta(0, true);

  // Sıcaklık birim dönüştürme
  const displayTemp = (tempC?: number) => {
    if (tempC === undefined) return '--';
    if (unit === 'F') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start antialiased relative overflow-x-hidden selection:bg-sky-500/30">
      {/* Dynamic Atmospheric Ambient Background */}
      <div
        className={`fixed inset-0 bg-gradient-to-b ${meta.bgGradient} transition-colors duration-1000 pointer-events-none opacity-90`}
      />

      {/* Subtle Star / Particle Lighting Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />

      {/* Desktop Responsive Top Control Strip */}
      <div className="w-full max-w-5xl px-4 py-3 z-20 flex items-center justify-between text-xs border-b border-white/10 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold">
            <Feather className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold tracking-tight text-white text-sm">Wheather</span>
          <span className="hidden sm:inline text-slate-400">·</span>
          <button
            onClick={() => setIsSignatureOpen(true)}
            className="hidden sm:flex items-center gap-1 text-[11px] text-sky-400/90 hover:text-sky-300 font-medium transition-colors"
          >
            <span>Enes Öztürk İmzasıyla</span>
          </button>
        </div>

        {/* Top Actions: Frame toggle, Unit toggle, Signature modal */}
        <div className="flex items-center gap-2">
          {/* Unit Toggle */}
          <button
            onClick={() => setUnit((prev) => (prev === 'C' ? 'F' : 'C'))}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 font-mono text-[11px] font-semibold text-slate-200 transition-colors"
            title="Sıcaklık Birimini Değiştir"
          >
            °{unit}
          </button>

          {/* Desktop Frame Switcher */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-[11px] text-slate-300 transition-colors"
            title="Görünüm Modunu Değiştir"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span>Genişletilmiş Ekran</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Mobil Kasa Modu</span>
              </>
            )}
          </button>

          {/* Signature Badge */}
          <button
            onClick={() => setIsSignatureOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-[11px] text-sky-300 font-medium transition-colors"
          >
            <Feather className="w-3 h-3 text-sky-400" />
            <span>Enes Öztürk</span>
          </button>
        </div>
      </div>

      {/* Status / Feedback Floating Toast */}
      {statusMessage && (
        <div className="fixed top-16 z-50 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-xl border flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-top-4 duration-300 max-w-sm mx-auto bg-slate-900/95 border-sky-400/30 text-white">
          {statusType === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
          {statusType === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
          {statusType === 'info' && <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />}
          <span className="flex-1">{statusMessage}</span>
        </div>
      )}

      {/* Main Container: Mobile phone chassis simulation OR responsive wide layout */}
      <main
        className={`w-full transition-all duration-300 relative z-10 my-0 md:my-4 flex-1 flex flex-col items-center justify-start ${
          isPhoneFrame
            ? 'max-w-[430px] md:rounded-[44px] md:border-[10px] md:border-slate-800/80 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:overflow-hidden bg-slate-950/70 md:min-h-[860px]'
            : 'max-w-4xl px-4'
        }`}
      >
        {/* Mobile Status Bar Simulation (Only in Phone Frame) */}
        {isPhoneFrame && (
          <div className="w-full pt-3 px-6 pb-1 flex items-center justify-between text-xs text-slate-300/80 select-none">
            <span className="font-semibold text-[13px] tracking-tight">
              {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {/* Dynamic Island / Speaker notch simulation */}
            <div className="w-24 h-4 bg-black/60 rounded-full mx-auto hidden sm:block" />
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-mono">5G</span>
              <div className="w-5 h-2.5 border border-slate-300/80 rounded-sm p-0.5 flex items-center">
                <div className="w-3 h-full bg-slate-200 rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Header: App Bar with Location & Quick Triggers */}
        <div className="w-full px-5 py-3 flex items-center justify-between gap-3 border-b border-white/10 backdrop-blur-md bg-white/[0.03]">
          {/* Location Badge (GPS indicator or Random badge) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 text-left group flex-1 truncate"
            title="Konum Değiştir veya Ara"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                location?.isCurrentLocation
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-400/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
              }`}
            >
              {location?.isCurrentLocation ? (
                <Navigation className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>

            <div className="truncate">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 uppercase tracking-wider font-semibold truncate">
                <span>{location?.isCurrentLocation ? 'Mevcut Konumunuz' : 'Rastgele Keşif'}</span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight truncate flex items-center gap-1">
                <span>{location ? `${location.district}, ${location.city}` : 'Konum Aranıyor...'}</span>
              </div>
            </div>
          </button>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Return to My Location */}
            <button
              onClick={() => handleDetectLocation()}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              title="Mevcut GPS Konumuma Dön"
              aria-label="Mevcut Konumuma Dön"
            >
              <Navigation className="w-4 h-4 text-sky-400" />
            </button>

            {/* Random Shuffle Location Button */}
            <button
              onClick={handleRandomLocationClick}
              disabled={isRefreshing}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors group"
              title="Rastgele Bir Konum Keşfet"
              aria-label="Rastgele Konum"
            >
              <Shuffle className={`w-4 h-4 text-amber-300 group-hover:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Search City Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-slate-200 transition-colors"
              title="Şehir Ara"
              aria-label="Şehir Ara"
            >
              <Search className="w-4 h-4 text-slate-200" />
            </button>
          </div>
        </div>

        {/* Pull-To-Refresh Interactive Viewport Body */}
        <div className="w-full flex-1 relative flex flex-col overflow-hidden">
          {isLoading && !weatherData ? (
            <div className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-white">Konum ve Hava Durumu Alınıyor</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1.5">
                GPS koordinatlarınız saptanıyor ve ters coğrafi kodlama ile il-ilçe verisi çekiliyor...
              </p>
            </div>
          ) : (
            <PullToRefresh onRefresh={handlePullToRefresh} isRefreshing={isRefreshing}>
              <div className="px-5 py-4 pb-16 flex flex-col">
                {/* Pull Down Hint Badge */}
                <div className="mx-auto mb-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/5 text-[11px] text-slate-400">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Aşağı kaydırarak rastgele bir konum keşfedin</span>
                </div>

                {/* HERO: Primary Weather Display & Custom Animated SVG Icon */}
                <section className="flex flex-col items-center text-center my-3 relative">
                  {/* Location District & Province Headline */}
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {location?.district}
                    </h1>
                  </div>
                  <div className="text-sm font-medium text-slate-300 mb-2">
                    {location?.city}, {location?.country}
                  </div>

                  {location?.discoveredAt && !location.isCurrentLocation && (
                    <div className="text-xs text-amber-300/90 font-medium italic mb-3 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 max-w-xs">
                      “{location.discoveredAt}”
                    </div>
                  )}

                  {/* Special Custom Animated SVG Weather Icon */}
                  <div className="my-2 p-2">
                    <WeatherIcon
                      category={meta.category}
                      isDay={current?.isDay}
                      size="xl"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Temperature Degree */}
                  <div className="flex items-start justify-center text-slate-100 font-extrabold tracking-tighter mt-1 mb-1 font-mono">
                    <span className="text-6xl sm:text-7xl tabular-nums">
                      {displayTemp(current?.temperature)}
                    </span>
                    <span className="text-3xl sm:text-4xl text-sky-400 font-sans ml-1">
                      °{unit}
                    </span>
                  </div>

                  {/* Weather Condition Label */}
                  <div className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                    <span>{meta.label}</span>
                  </div>

                  {/* Short Condition Prose */}
                  <p className="text-xs text-slate-300 max-w-xs mt-1.5 leading-relaxed">
                    {meta.shortDesc}
                  </p>

                  {/* Today's High & Low Range */}
                  {weatherData?.daily?.[0] && (
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 mt-2 font-mono tabular-nums">
                      <span className="flex items-center gap-1">
                        <span className="text-slate-400">En Yüksek:</span>
                        <span className="text-white">
                          {displayTemp(weatherData.daily[0].tempMax)}°{unit}
                        </span>
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="flex items-center gap-1">
                        <span className="text-slate-400">En Düşük:</span>
                        <span className="text-slate-400">
                          {displayTemp(weatherData.daily[0].tempMin)}°{unit}
                        </span>
                      </span>
                    </div>
                  )}
                </section>

                {/* 24-Hour Forecast Strip */}
                {weatherData && <HourlyForecast hourly={weatherData.hourly} />}

                {/* Weather Parameters Grid (Nem, Basınç, Rüzgar, UV vb.) */}
                {current && location && (
                  <WeatherDetails
                    current={current}
                    location={location}
                    sunrise={weatherData?.daily?.[0]?.sunrise}
                    sunset={weatherData?.daily?.[0]?.sunset}
                  />
                )}

                {/* 7-Day Extended Forecast */}
                {weatherData && <DailyForecast daily={weatherData.daily} />}

                {/* Footer Signature Card */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center text-center">
                  <button
                    onClick={() => setIsSignatureOpen(true)}
                    className="group flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all w-full"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Feather className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
                      <span>Bu uygulama</span>
                      <span className="font-serif italic font-bold text-sky-300 text-sm">
                        Enes Öztürk
                      </span>
                      <span>imzasıyla geliştirilmiştir</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Detaylı mimari ve künye için dokunun
                    </span>
                  </button>
                </div>
              </div>
            </PullToRefresh>
          )}
        </div>

        {/* Mobile Sticky Quick Navigation Bar */}
        <div className="w-full px-6 py-2.5 border-t border-white/10 backdrop-blur-xl bg-slate-950/80 flex items-center justify-around z-20">
          {/* Return to My Location */}
          <button
            onClick={() => handleDetectLocation()}
            className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-sky-300 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-sky-400" />
            </div>
            <span>Konumum</span>
          </button>

          {/* Random Location Discovery Action */}
          <button
            onClick={handleRandomLocationClick}
            disabled={isRefreshing}
            className="flex flex-col items-center gap-1 text-[10px] text-amber-300 hover:text-amber-200 transition-colors"
          >
            <div className="w-11 h-11 -mt-4 rounded-full bg-gradient-to-tr from-amber-500 to-sky-500 p-0.5 shadow-lg shadow-sky-500/20 active:scale-95 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Shuffle className={`w-5 h-5 text-amber-300 ${isRefreshing ? 'animate-spin' : ''}`} />
              </div>
            </div>
            <span className="font-semibold">Rastgele Keşfet</span>
          </button>

          {/* Search Cities */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-4 h-4 text-slate-300" />
            </div>
            <span>Şehirler</span>
          </button>
        </div>
      </main>

      {/* Signature & Info Modal */}
      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
      />

      {/* Search & Curated Hotspots Modal */}
      <LocationSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLocation={(loc) => loadWeatherForLocation(loc)}
        onDetectLocation={() => handleDetectLocation()}
        currentLocationName={weatherData?.location.formattedName}
      />
    </div>
  );
}
