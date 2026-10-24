import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';
import { ExploreSearch } from './components/ExploreSearch';
import { FavoritesView } from './components/FavoritesView';
import { CommunityView } from './components/CommunityView';
import { ProfileView } from './components/ProfileView';
import { AddFavoriteModal } from './components/AddFavoriteModal';
import { NewPostModal } from './components/NewPostModal';
import { AuthModal } from './components/AuthModal';
import { EditProfileModal } from './components/EditProfileModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-100 selection:text-amber-950">
      {/* Top Navigation */}
      <Navbar />

      {/* Primary Dynamic View Content */}
      <main className="flex-1">
        {currentTab === 'feed' && <Feed />}
        {currentTab === 'explore' && <ExploreSearch />}
        {currentTab === 'favorites' && <FavoritesView />}
        {currentTab === 'community' && <CommunityView />}
        {currentTab === 'profile' && (
          <ProfileView onOpenEditModal={() => setIsEditProfileModalOpen(true)} />
        )}
      </main>

      {/* Global Modals & Notifications */}
      <AddFavoriteModal />
      <NewPostModal />
      <AuthModal />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
      <Toast />

      {/* Literary Signature Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
