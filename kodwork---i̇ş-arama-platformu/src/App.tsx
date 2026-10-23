/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * kodwork - İş Arama Platformu
 * Geliştirici: Enes Öztürk
 * © 2026 kodwork. Tüm hakları saklıdır.
 */

import React from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import { Navbar } from './components/Navbar';
import { SidebarDrawer } from './components/SidebarDrawer';
import { JobsListPage } from './components/JobsListPage';
import { JobDetail } from './components/JobDetail';
import { FavoritesPage } from './components/FavoritesPage';
import { AppliedPage } from './components/AppliedPage';
import { AboutPage } from './components/AboutPage';
import { ApplyModal } from './components/ApplyModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage, selectedJob } = useJobs();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Yandan Açılır Menü (Sidebar Drawer) */}
      <SidebarDrawer />

      {/* Main View Area */}
      <main className="flex-1">
        {selectedJob ? (
          <JobDetail />
        ) : (
          <>
            {activePage === 'jobs' && <JobsListPage />}
            {activePage === 'favorites' && <FavoritesPage />}
            {activePage === 'applied' && <AppliedPage />}
            {activePage === 'about' && <AboutPage />}
          </>
        )}
      </main>

      {/* Application Modal */}
      <ApplyModal />

      {/* Toast Feedback Messages */}
      <ToastContainer />

      {/* Footer with Enes Öztürk Signature and Copyright */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}
