import React, { useState } from 'react';
import { X, Copy, Check, Share2, Printer } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-6dtqkwbunxymhe6sqnzejn-648631049931.europe-west2.run.app';
  const shareText = "Formülsüz Matematik: Doğayı Ezberlemeden Görmek · Enes Öztürk";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-stone-700" />
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Blog Yazısını Paylaş
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-stone-600">
            Temel Matematik modülünün bu sezgisel blog yazısını arkadaşlarınızla, öğrencilerinizle veya sosyal medyada paylaşın:
          </p>

          {/* Copy link input */}
          <div className="flex items-center gap-2 p-1.5 border border-stone-200 rounded-xl bg-stone-50">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-stone-700 focus:outline-hidden truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Kopyalandı
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Kopyala
                </>
              )}
            </button>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              onClick={handleTwitterShare}
              className="p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-800 flex flex-col items-center gap-1 transition-colors"
            >
              <span className="font-bold">X (Twitter)</span>
            </button>
            <button
              type="button"
              onClick={handleLinkedInShare}
              className="p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-800 flex flex-col items-center gap-1 transition-colors"
            >
              <span className="font-bold">LinkedIn</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-800 flex flex-col items-center gap-1 transition-colors"
            >
              <span className="font-bold">WhatsApp</span>
            </button>
          </div>

          {/* Print button */}
          <button
            type="button"
            onClick={handlePrint}
            className="w-full mt-2 py-2.5 px-3 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-medium text-stone-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            PDF Olarak Kaydet / Yazdır
          </button>
        </div>
      </div>
    </div>
  );
};
