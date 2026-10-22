/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveCapsuleLab } from './components/InteractiveCapsuleLab';
import { EducationalArticle } from './components/EducationalArticle';
import { CodeComparator } from './components/CodeComparator';
import { AccessModifiersGuide } from './components/AccessModifiersGuide';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { AuthorSignature } from './components/AuthorSignature';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('top');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with core thesis & Enes Öztürk dedication */}
        <Hero
          onStartLab={() => scrollToSection('lab')}
          onReadArticle={() => scrollToSection('ogrenci-person')}
        />

        {/* Live Interactive Encapsulation Simulation Lab */}
        <InteractiveCapsuleLab />

        {/* User's Original Educational Article & Code Breakdown (Ogrenci & Person) */}
        <EducationalArticle />

        {/* C# Property Variants & Syntax Evolution */}
        <CodeComparator />

        {/* C# Access Modifiers Matrix (private, public, protected, internal) */}
        <AccessModifiersGuide />

        {/* Interactive 5-Question Quiz & Challenge */}
        <InteractiveQuiz />

        {/* Dedicated Author Signature Card for Enes Öztürk */}
        <AuthorSignature />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
