/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { AuthorBadge } from './components/AuthorBadge';
import { TableOfContents } from './components/TableOfContents';
import { BlogPostContent } from './components/BlogPostContent';
import { AuthorFooter } from './components/AuthorFooter';
import { ReadingToolbar } from './components/ReadingToolbar';
import { ShareModal } from './components/ShareModal';
import { BLOG_AUTHOR, TABLE_OF_CONTENTS } from './data/blogPost';
import { ReaderTheme, FontSize } from './types/blog';
import { Share2, Sparkles, Copy, Check, BookOpen, Compass, Layers, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('giris');
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [heroCopied, setHeroCopied] = useState<boolean>(false);

  // Sync scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPct = (totalScroll / windowHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPct)));
      }

      // Check active section
      const sections = TABLE_OF_CONTENTS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSectionId(TABLE_OF_CONTENTS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme class to html/body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia-mode');

    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#171615';
    } else if (theme === 'sepia') {
      root.classList.add('sepia-mode');
      document.body.style.backgroundColor = '#fbf7ee';
    } else {
      document.body.style.backgroundColor = '#faf8f5';
    }
  }, [theme]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleHeroCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setHeroCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.3 },
    });
    setTimeout(() => setHeroCopied(false), 2200);
  };

  // Get background color based on theme
  const getThemeWrapperClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#171615] text-stone-200';
      case 'sepia':
        return 'bg-[#fbf7ee] text-[#2d251e]';
      case 'light':
      default:
        return 'bg-[#faf8f5] text-[#1c1917]';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${getThemeWrapperClasses()}`}>
      {/* Top Navbar Header */}
      <Header
        progress={readingProgress}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onShareClick={() => setIsShareModalOpen(true)}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-28">
        {/* ARTICLE HEADER / HERO */}
        <div className="space-y-4 max-w-3xl">
          {/* Category Tag & Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
              <Sparkles className="h-3 w-3 text-amber-600" />
              Sezgisel Veri Bilimi Serisi
            </span>
            <span className="text-xs text-stone-400 font-sans-ui">•</span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 font-sans-ui">
              Matematiksel Sezgi & Yüksek Boyutlu Geometri
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-reading text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white leading-[1.18] tracking-tight">
            Vektörlerin Gizli Dünyası: 100 Boyutlu Bir Portakal Neden Sadece Kabuktur?
          </h1>

          {/* Subtitle / Hook */}
          <p className="font-reading text-lg sm:text-xl text-stone-600 dark:text-stone-300 italic leading-relaxed pt-1">
            Ezber formüllerden uzak, geometrik ve sezgisel bir veri bilimi yolculuğu. 
            Mesafe yoğunlaşması, dik açılar ülkesi ve yapay zekanın uzayı nasıl "hissettiği" üzerine.
          </p>

          {/* Quick interactive sharing banner requested by user */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/20 p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-ui">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <BookOpen className="h-4 w-4 text-amber-600" />
              <span>
                <strong>Enes Öztürk</strong>'ün hazırladığı bu interaktif blog gönderisini paylaşın:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleHeroCopy}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 transition-colors shadow-2xs active:scale-95"
              >
                {heroCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Link Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Blog Linkini Kopyala</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-stone-800 text-amber-900 dark:text-amber-200 hover:bg-amber-100/50 px-2.5 py-1.5 font-medium transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Paylaş</span>
              </button>
            </div>
          </div>
        </div>

        {/* Author Byline & Publishing Metadata */}
        <div className="max-w-3xl">
          <AuthorBadge
            author={BLOG_AUTHOR}
            publishDate="22 Ekim 2026"
            readTime="12 dk okuma"
            onShareClick={() => setIsShareModalOpen(true)}
          />
        </div>

        {/* MAIN EDITORIAL GRID: Content + Desktop Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Body */}
          <div className="lg:col-span-8 max-w-3xl">
            <BlogPostContent fontSize={fontSize} />

            {/* Author Footer & Signature */}
            <AuthorFooter
              author={BLOG_AUTHOR}
              onShareClick={() => setIsShareModalOpen(true)}
            />
          </div>

          {/* Sticky Sidebar on Desktop */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
            <TableOfContents
              items={TABLE_OF_CONTENTS}
              activeId={activeSectionId}
              onItemClick={scrollToSection}
            />

            {/* Quick Experiment Highlights Card */}
            <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 p-5 shadow-2xs backdrop-blur-xs font-sans-ui text-xs space-y-3">
              <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block text-[11px]">
                Yazıdaki İnteraktif Deneyler
              </span>
              <div className="space-y-2">
                <div
                  onClick={() => scrollToSection('portakal')}
                  className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 cursor-pointer hover:bg-amber-100/50 transition-colors flex items-center gap-2.5"
                >
                  <Layers className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">Portakal Kabuğu Paradoksu</div>
                    <div className="text-[10px] text-stone-500">Boyut vs İç Hacim Oranı</div>
                  </div>
                </div>

                <div
                  onClick={() => scrollToSection('mesafe')}
                  className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 cursor-pointer hover:bg-blue-100/50 transition-colors flex items-center gap-2.5"
                >
                  <Activity className="h-4 w-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">Mesafe Yoğunlaşması</div>
                    <div className="text-[10px] text-stone-500">Monte Carlo Histogram Simülatörü</div>
                  </div>
                </div>

                <div
                  onClick={() => scrollToSection('vektor-cebiri')}
                  className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 cursor-pointer hover:bg-purple-100/50 transition-colors flex items-center gap-2.5"
                >
                  <Compass className="h-4 w-4 text-purple-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100">Kral - Erkek + Kadın</div>
                    <div className="text-[10px] text-stone-500">2D/3D Latent Aritmetik Pusulası</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Share Widget */}
            <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 p-5 shadow-2xs backdrop-blur-xs font-sans-ui text-xs">
              <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider block text-[11px] mb-2">
                Bu Gönderiyi Paylaş
              </span>
              <p className="text-stone-500 text-[11px] mb-3 leading-relaxed">
                Veri bilimi meraklısı meslektaşlarınıza ve arkadaşlarınıza bağlantıyı gönderin.
              </p>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-2.5 font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shadow-2xs"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Paylaşım Seçenekleri</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Bottom Reading Toolbar */}
      <ReadingToolbar
        progress={readingProgress}
        onShareClick={() => setIsShareModalOpen(true)}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
        onScrollToTop={scrollToTop}
      />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Vektörlerin Gizli Dünyası: 100 Boyutlu Bir Portakal Neden Sadece Kabuktur?"
        authorName={BLOG_AUTHOR.name}
      />
    </div>
  );
}
