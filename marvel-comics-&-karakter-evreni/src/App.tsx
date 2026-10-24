import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MARVEL_CHARACTERS, MARVEL_COMICS } from './data/marvelData';
import { MarvelCharacter, MarvelComic, Alignment } from './types/marvel';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CharacterCard } from './components/CharacterCard';
import { ComicCard } from './components/ComicCard';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { ComicDetailModal } from './components/ComicDetailModal';
import { AuthModal } from './components/AuthModal';
import { AboutModal } from './components/AboutModal';
import { FavoritesView } from './components/FavoritesView';
import { ReadingListView } from './components/ReadingListView';
import { Footer } from './components/Footer';
import { Filter, Sparkles, BookOpen, Users, Shield, Flame } from 'lucide-react';

function MainContent() {
  const [activeTab, setActiveTab] = useState<'characters' | 'comics' | 'favorites' | 'reading-list'>('characters');
  const [searchQuery, setSearchQuery] = useState('');
  const [alignmentFilter, setAlignmentFilter] = useState<'all' | Alignment>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [comicFormatFilter, setComicFormatFilter] = useState<string>('all');

  const [selectedCharacter, setSelectedCharacter] = useState<MarvelCharacter | null>(null);
  const [selectedComic, setSelectedComic] = useState<MarvelComic | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Collect all unique teams for filtering
  const allTeams = useMemo(() => {
    const set = new Set<string>();
    MARVEL_CHARACTERS.forEach((c) => c.teams.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filter characters
  const filteredCharacters = useMemo(() => {
    return MARVEL_CHARACTERS.filter((char) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        char.name.toLowerCase().includes(q) ||
        char.realName.toLowerCase().includes(q) ||
        char.powers.some((p) => p.toLowerCase().includes(q)) ||
        char.teams.some((t) => t.toLowerCase().includes(q));

      // Alignment
      const matchesAlignment =
        alignmentFilter === 'all' || char.alignment === alignmentFilter;

      // Team
      const matchesTeam =
        teamFilter === 'all' || char.teams.includes(teamFilter);

      return matchesSearch && matchesAlignment && matchesTeam;
    });
  }, [searchQuery, alignmentFilter, teamFilter]);

  // Filter comics
  const filteredComics = useMemo(() => {
    return MARVEL_COMICS.filter((comic) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        comic.title.toLowerCase().includes(q) ||
        comic.series.toLowerCase().includes(q) ||
        comic.creators.some((cr) => cr.name.toLowerCase().includes(q)) ||
        comic.events.some((ev) => ev.toLowerCase().includes(q));

      const matchesFormat =
        comicFormatFilter === 'all' || comic.format === comicFormatFilter;

      return matchesSearch && matchesFormat;
    });
  }, [searchQuery, comicFormatFilter]);

  // Direct handlers for cross-navigation
  const handleOpenCharacter = (char: MarvelCharacter) => {
    setSelectedComic(null);
    setSelectedCharacter(char);
  };

  const handleOpenComic = (comic: MarvelComic) => {
    setSelectedCharacter(null);
    setSelectedComic(comic);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* If on Characters or Comics, show the Hero Section */}
        {(activeTab === 'characters' || activeTab === 'comics') && (
          <HeroSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeView={activeTab}
            setActiveView={(view) => setActiveTab(view)}
            totalCharacters={filteredCharacters.length}
            totalComics={filteredComics.length}
          />
        )}

        {/* Tab 1: Characters Explorer View */}
        {activeTab === 'characters' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
              
              {/* Alignment Filters (Segmented controls) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 rounded-lg border border-neutral-800">
                <span className="text-xs text-neutral-500 px-2 font-medium">Tür:</span>
                <button
                  onClick={() => setAlignmentFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    alignmentFilter === 'all'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setAlignmentFilter('hero')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    alignmentFilter === 'hero'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Kahramanlar
                </button>
                <button
                  onClick={() => setAlignmentFilter('anti-hero')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    alignmentFilter === 'anti-hero'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Anti-Kahramanlar
                </button>
                <button
                  onClick={() => setAlignmentFilter('villain')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    alignmentFilter === 'villain'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Kötü Karakterler
                </button>
              </div>

              {/* Team Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Takım:</span>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="all">Tüm Takımlar & Birlikler</option>
                  {allTeams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Results Grid */}
            {filteredCharacters.length === 0 ? (
              <div className="text-center py-16 px-4 bg-neutral-900/30 rounded-2xl border border-neutral-800">
                <Users className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-comic text-xl font-bold uppercase text-white mb-1">
                  Aramanıza Uygun Karakter Bulunamadı
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Lütfen arama terimlerinizi veya filtrelerinizi değiştirin.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setAlignmentFilter('all');
                    setTeamFilter('all');
                  }}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-semibold hover:bg-neutral-700"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onSelect={handleOpenCharacter}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Comics Explorer View */}
        {activeTab === 'comics' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
              
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 rounded-lg border border-neutral-800">
                <span className="text-xs text-neutral-500 px-2 font-medium">Format:</span>
                <button
                  onClick={() => setComicFormatFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    comicFormatFilter === 'all'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Tüm Formatlar
                </button>
                <button
                  onClick={() => setComicFormatFilter('Comic')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    comicFormatFilter === 'Comic'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Tek Sayı (Comic)
                </button>
              </div>

              <div className="text-xs text-neutral-400 font-mono">
                Toplam <span className="text-neutral-100 font-bold tabular-nums">{filteredComics.length}</span> Çizgi Roman Listeleniyor
              </div>

            </div>

            {/* Results Grid */}
            {filteredComics.length === 0 ? (
              <div className="text-center py-16 px-4 bg-neutral-900/30 rounded-2xl border border-neutral-800">
                <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-comic text-xl font-bold uppercase text-white mb-1">
                  Aramanıza Uygun Çizgi Roman Bulunamadı
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Lütfen arama terimlerinizi veya format filtrenizi kontrol edin.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setComicFormatFilter('all');
                  }}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-semibold hover:bg-neutral-700"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredComics.map((comic) => (
                  <ComicCard
                    key={comic.id}
                    comic={comic}
                    allCharacters={MARVEL_CHARACTERS}
                    onSelect={handleOpenComic}
                    onSelectCharacter={handleOpenCharacter}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Favorites View */}
        {activeTab === 'favorites' && (
          <FavoritesView
            allCharacters={MARVEL_CHARACTERS}
            allComics={MARVEL_COMICS}
            onSelectCharacter={handleOpenCharacter}
            onExploreClick={() => setActiveTab('characters')}
          />
        )}

        {/* Tab 4: Reading List View */}
        {activeTab === 'reading-list' && (
          <ReadingListView
            allComics={MARVEL_COMICS}
            allCharacters={MARVEL_CHARACTERS}
            onSelectComic={handleOpenComic}
            onSelectCharacter={handleOpenCharacter}
            onExploreComics={() => setActiveTab('comics')}
          />
        )}

      </main>

      {/* Footer with Enes Öztürk Signature */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onSetTab={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <CharacterDetailModal
        character={selectedCharacter}
        allComics={MARVEL_COMICS}
        onClose={() => setSelectedCharacter(null)}
        onSelectComic={handleOpenComic}
      />

      <ComicDetailModal
        comic={selectedComic}
        allCharacters={MARVEL_CHARACTERS}
        onClose={() => setSelectedComic(null)}
        onSelectCharacter={handleOpenCharacter}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
