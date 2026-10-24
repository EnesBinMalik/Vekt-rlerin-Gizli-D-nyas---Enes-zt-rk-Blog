import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    users,
    switchUser,
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !email.trim()) return;
    register(name, username, email, password, bio);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative my-6">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 mb-5">
          <button
            onClick={() => setAuthMode('login')}
            className={`pb-3 text-sm font-semibold flex-1 text-center transition-colors cursor-pointer ${
              authMode === 'login'
                ? 'text-stone-900 border-b-2 border-amber-900 font-bold'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`pb-3 text-sm font-semibold flex-1 text-center transition-colors cursor-pointer ${
              authMode === 'register'
                ? 'text-stone-900 border-b-2 border-amber-900 font-bold'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Hesap Oluştur
          </button>
        </div>

        {authMode === 'login' ? (
          <div>
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kullanıcı Adı veya E-posta
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="enes_ozturk veya elif_okur"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-amber-900 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer mt-2"
              >
                Giriş Yap
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400 font-medium mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Tek Tıkla Hazır Hesapla Giriş Yap (Demo):</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {users.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      switchUser(u.id);
                      setIsAuthModalOpen(false);
                    }}
                    className="p-2 rounded-lg border border-stone-200 hover:border-amber-800 hover:bg-amber-50 text-left transition-all cursor-pointer flex items-center gap-2"
                  >
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-stone-800 truncate">{u.name}</p>
                      <p className="text-[9px] text-stone-500 font-mono truncate">@{u.username}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Ad Soyad <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Kullanıcı Adı (@) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ahmet_kitap"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                E-posta <span className="text-rose-600">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@posta.com"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Biyografi (Kısaca kendinizi tanıtın)
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Hangi türleri okumayı seversiniz?"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-800 text-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-amber-900 text-white rounded-lg font-semibold transition-colors shadow-sm cursor-pointer mt-2"
            >
              Hesabı Oluştur & Başla
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
