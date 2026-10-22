import React, { useState } from 'react';
import { Author } from '../types/blog';
import { Check, Mail, Share2, Sparkles, Heart, Twitter, Linkedin, Github } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthorFooterProps {
  author: Author;
  onShareClick: () => void;
}

export const AuthorFooter: React.FC<AuthorFooterProps> = ({ author, onShareClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="mt-16 pt-12 border-t-2 border-stone-200">
      {/* Editorial Sign-off Note */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50/50 p-6 md:p-8 border border-amber-200/70 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest font-sans-ui">
          <Sparkles className="h-4 w-4 text-amber-600" />
          Yazarın Kapanış Notu
        </div>

        <p className="mt-3 font-reading text-lg md:text-xl text-stone-800 italic leading-relaxed">
          "Veri bilimi ve yapay zeka; formüllerin soğuk ezberinden ibaret değildir. Kod satırlarının ve matrislerin arkasındaki geometrik manzarayı bir kez hissettiğinizde, hiçbir algoritma size yabancı gelmez. Bir sonraki derin keşifte görüşmek üzere."
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-lg font-reading shadow-md">
              EÖ
            </div>
            <div>
              <div className="font-bold text-stone-900 font-sans-ui">{author.name}</div>
              <div className="text-xs text-stone-500 font-sans-ui">{author.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onShareClick}
              className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition-all shadow-sm active:scale-95"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Yazıyı Paylaş</span>
            </button>
          </div>
        </div>
      </div>

      {/* Author Biography Detailed Card */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-100/60 rounded-2xl p-6 md:p-8 border border-stone-200">
        <div className="md:col-span-8 space-y-3">
          <h4 className="font-sans-ui font-bold text-stone-900 text-lg">
            {author.name} Hakkında
          </h4>
          <p className="text-sm text-stone-600 leading-relaxed font-sans-ui">
            {author.bio}
          </p>
          <div className="flex items-center gap-3 pt-2 text-stone-500">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:text-stone-900 hover:shadow-xs transition-all border border-stone-200"
              title="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:text-[#0a66c2] hover:shadow-xs transition-all border border-stone-200"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:text-stone-900 hover:shadow-xs transition-all border border-stone-200"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription Box */}
        <div className="md:col-span-4 rounded-xl bg-white p-5 border border-stone-200/80 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-sans-ui block mb-1">
            Sezgisel Veri Bilimi Bülteni
          </span>
          <p className="text-xs text-stone-500 font-sans-ui mb-3">
            Enes Öztürk'ün ayda bir kaleme aldığı derinlemesine teknik yazıları kaçırmayın.
          </p>

          {subscribed ? (
            <div className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200 font-sans-ui flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Aboneliğiniz tamamlandı. Teşekkürler!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="E-posta adresiniz..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-stone-900 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Ücretsiz Katıl</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
