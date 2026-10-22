import React, { useState } from 'react';
import { X, Copy, Check, Share2, Twitter, Linkedin, MessageCircle, Send, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  authorName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  authorName,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://enes-ozturk-data-science.blog';

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent(
    `"${title}" — ${authorName} imzasını taşıyan, ezber formüllerden uzak, sezgisel ve interaktif veri bilimi yazısı:\n`
  );
  const shareUrl = encodeURIComponent(currentUrl);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=DataScience,VeriBilimi,MachineLearning`,
      color: 'bg-black text-white hover:bg-stone-800',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'bg-[#0a66c2] text-white hover:bg-[#084e96]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
      color: 'bg-[#25D366] text-white hover:bg-[#1fa851]',
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      color: 'bg-[#229ED9] text-white hover:bg-[#1b7fae]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-sans-ui text-lg font-bold text-stone-900">
              Blog Gönderisinin Bağlantısını Paylaş
            </h3>
            <p className="text-xs text-stone-500 font-sans-ui">
              Yazar: <span className="font-semibold text-stone-800">{authorName}</span>
            </p>
          </div>
        </div>

        {/* Article Preview Snippet */}
        <div className="mt-5 rounded-xl bg-stone-50 p-3.5 border border-stone-200/80">
          <p className="text-xs font-semibold text-stone-900 font-reading italic">
            "{title}"
          </p>
          <p className="text-[11px] text-stone-500 font-sans-ui mt-1 line-clamp-2">
            100 boyutlu bir uzayda neden tüm veriler çeperde toplanır? Mesafe yoğunlaşması, dik açılar ve yapay zekanın geometrik sezgisi.
          </p>
        </div>

        {/* Copy Link Input Bar */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-ui block mb-1.5">
            Doğrudan Blog Linki
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-mono text-stone-700 select-all focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-all shadow-sm shrink-0 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Linki Kopyala</span>
                </>
              )}
            </button>
          </div>
          {copied && (
            <p className="mt-1.5 text-xs text-emerald-600 flex items-center gap-1 font-medium font-sans-ui">
              <Sparkles className="h-3.5 w-3.5" /> Bağlantı panoya kopyalandı! Artık dilediğiniz yerde paylaşabilirsiniz.
            </p>
          )}
        </div>

        {/* Social Share Grid */}
        <div className="mt-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-ui block mb-2">
            Hızlı Paylaşım Kanalları
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {shareLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 px-2 text-xs font-semibold transition-all shadow-2xs hover:scale-102 ${item.color}`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-[11px]">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-sans-ui">
          <span>Enes Öztürk • Veri Bilimi Blog Serisi</span>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-medium"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
