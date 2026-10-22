import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TheorySection } from './components/TheorySection';
import { MemorySimulator } from './components/MemorySimulator';
import { OverloadPlayground } from './components/OverloadPlayground';
import { PitfallsSection } from './components/PitfallsSection';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('theory');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickSimulate = () => {
    scrollToSection('memory');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3-Zone Clean Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={scrollToSection}
        onQuickSimulate={handleQuickSimulate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenSimulator={() => scrollToSection('memory')}
          onExploreOverload={() => scrollToSection('overload')}
        />

        {/* Section 1: Detailed Theory & Enes Öztürk's Course Notes */}
        <div id="theory">
          <TheorySection />
        </div>

        {/* Section 2: Interactive RAM Memory Simulator (Stack & Heap) */}
        <div id="memory">
          <MemorySimulator />
        </div>

        {/* Section 3: Constructor Overloading Sandbox */}
        <div id="overload">
          <OverloadPlayground />
        </div>

        {/* Section 4: Critical Pitfalls & 3 Golden Rules */}
        <div id="pitfalls">
          <PitfallsSection />
        </div>

        {/* Section 5: Interactive Quiz */}
        <div id="quiz">
          <QuizSection />
        </div>
      </main>

      {/* Clean Footer with Enes Öztürk Signature */}
      <Footer />
    </div>
  );
}
