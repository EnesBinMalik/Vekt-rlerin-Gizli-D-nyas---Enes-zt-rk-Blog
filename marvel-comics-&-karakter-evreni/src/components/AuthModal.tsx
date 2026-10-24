import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock, Mail, Check, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  { id: 'ironman', label: 'Iron Man', bg: 'bg-red-950 border-amber-500 text-amber-400' },
  { id: 'spiderman', label: 'Spider-Man', bg: 'bg-red-950 border-red-500 text-red-400' },
  { id: 'captain', label: 'Captain America', bg: 'bg-blue-950 border-blue-500 text-blue-400' },
  { id: 'scarlet', label: 'Scarlet Witch', bg: 'bg-stone-900 border-red-700 text-red-400' },
  { id: 'thor', label: 'Thor', bg: 'bg-sky-950 border-cyan-500 text-cyan-400' },
  { id: 'wolverine', label: 'Wolverine', bg: 'bg-amber-950 border-yellow-500 text-yellow-400' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, loginAsDemo } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('ironman');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (mode === 'login') {
      const res = login(email, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message || 'Giriş yapılamadı.');
      }
    } else {
      const res = register(name, email, password, selectedAvatar);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.message || 'Kayıt yapılamadı.');
      }
    }
  };

  const handleDemoSelect = (account: 'enes' | 'peter' | 'wanda') => {
    loginAsDemo(account);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#E62429] px-3 py-1 rounded text-white font-comic text-xl font-bold tracking-tight uppercase mb-2">
            MARVEL
          </div>
          <h2 className="text-xl font-comic font-bold uppercase tracking-wide text-white">
            {mode === 'login' ? 'Hesabınıza Giriş Yapın' : 'Yeni Marvel Hesabı Açın'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Favori karakterlerinizi kaydedin ve çizgi roman okuma listenizi takip edin.
          </p>
        </div>

        {/* Quick Demo Login Profile Shortcuts */}
        <div className="mb-6 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Hızlı Test Profilleri (1-Tık Giriş)</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSelect('enes')}
              className="py-1.5 px-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-red-500 text-xs text-neutral-200 transition-all font-medium text-center"
            >
              Enes Öztürk
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('peter')}
              className="py-1.5 px-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-red-500 text-xs text-neutral-200 transition-all font-medium text-center"
            >
              Peter Parker
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('wanda')}
              className="py-1.5 px-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-red-500 text-xs text-neutral-200 transition-all font-medium text-center"
            >
              Wanda M.
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-lg bg-neutral-950 p-1 border border-neutral-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'login' ? 'bg-red-600 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'register' ? 'bg-red-600 text-white shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Ad Soyad
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Profil Karakterinizi Seçin
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-all ${av.bg} ${
                        selectedAvatar === av.id ? 'ring-2 ring-red-500 scale-95 font-bold' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              E-Posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@marvel.app"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-md"
          >
            {mode === 'login' ? 'Giriş Yap' : 'Hesabı Başlat'}
          </button>
        </form>

      </div>
    </div>
  );
};
