import React, { useState } from 'react';
import { Restaurant, Reservation } from '../types/restaurant';
import { SafeImage } from './SafeImage';
import {
  X,
  Calendar,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface ReservationModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (reservation: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onConfirmReservation
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');

  // Form states
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<Reservation['seatingArea']>('Ana Salon');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed details
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !restaurant) return null;

  const timeSlots = [
    '12:30', '13:00', '13:30', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) return;

    const confirmationCode = `WR-${Math.floor(1000 + Math.random() * 9000)}-${restaurant.city.substring(0, 3).toUpperCase()}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantCity: restaurant.city,
      restaurantImage: restaurant.heroImage,
      date,
      timeSlot,
      guests,
      seatingArea,
      specialRequests: specialRequests.trim() || undefined,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      status: 'Onaylandı',
      createdAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    onConfirmReservation(newReservation);
    setConfirmedReservation(newReservation);
    setStep('confirmed');
  };

  const handleCopyCode = () => {
    if (confirmedReservation) {
      navigator.clipboard.writeText(confirmedReservation.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleClose = () => {
    setStep('form');
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#141721] border border-stone-800 text-stone-100 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-[#0e1118]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white font-display">
              {step === 'form' ? 'Masa Rezervasyonu' : 'Rezervasyon Onayı'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Kapat"
            className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Restaurant Mini Preview */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
              <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                <SafeImage
                  src={restaurant.heroImage}
                  alt={restaurant.name}
                  aspectRatioClass="aspect-square"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate font-display">{restaurant.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-0.5">
                  <span className="text-amber-400 font-medium">{restaurant.city}</span>
                  <span>·</span>
                  <span>{restaurant.cuisine}</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  Kişi Başı: <span className="text-stone-200">{restaurant.averagePricePerPerson}</span>
                </div>
              </div>
            </div>

            {/* Date & Guests selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-300 block mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rezervasyon Tarihi</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-300 block mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kişi Sayısı</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} Kişi {num === 2 ? '(Popüler)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Saat Seçimi</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      timeSlot === slot
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950 text-stone-300 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Area Selection */}
            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1.5">
                Masa & Oturma Alanı Tercihi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Ana Salon', 'Şef Masası', 'Manzaralı Teras', 'Özel VIP Oda'] as const).map((area) => (
                  <button
                    type="button"
                    key={area}
                    onClick={() => setSeatingArea(area)}
                    className={`py-2 px-2.5 rounded-lg text-xs text-left border transition-all ${
                      seatingArea === area
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/60 font-semibold'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <h5 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                İletişim Bilgileriniz
              </h5>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Adınız Soyadınız"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="E-posta Adresiniz"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefon Numaranız"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Özel İstek veya Alerji Notu (İsteğe bağlı)"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Policy notice */}
            {restaurant.reservationDeposit && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Depozito Bilgisi:</strong> {restaurant.reservationDeposit}. Rezervasyon onayınız restoran sistemine anında iletilmektedir.
                </span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20"
            >
              Rezervasyonu Tamamla ve Onayla
            </button>
          </form>
        ) : (
          /* Confirmation Success Ticket */
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-display">Masanız Başarıyla Rezerve Edildi!</h4>
              <p className="text-xs text-stone-400 mt-1">
                Onay detayları e-posta adresinize ({confirmedReservation?.customerEmail}) iletildi.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-700 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs text-stone-400">Rezervasyon Kodu</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {confirmedReservation?.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px]">RESTORAN</span>
                  <span className="font-semibold text-stone-200">{restaurant.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">ŞEHİR</span>
                  <span className="font-semibold text-stone-200">{restaurant.city}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">TARİH & SAAT</span>
                  <span className="font-semibold text-stone-200">
                    {confirmedReservation?.date} · {confirmedReservation?.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">KİŞİ & ALAN</span>
                  <span className="font-semibold text-stone-200">
                    {confirmedReservation?.guests} Kişi · {confirmedReservation?.seatingArea}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex-1 py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors"
              >
                Tamam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
