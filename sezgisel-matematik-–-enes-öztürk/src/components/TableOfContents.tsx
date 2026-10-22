import React, { useEffect, useState } from 'react';
import { SectionItem } from '../types';

interface TableOfContentsProps {
  sections: SectionItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const buffer = 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop - buffer <= scrollY) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <nav className="p-4 rounded-xl border border-stone-200 bg-white/90 backdrop-blur-xs text-xs font-sans">
      <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">
        İçindekiler & Bölümler
      </div>
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-start gap-2 py-1.5 px-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-950 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <span className="font-mono text-[11px] text-stone-400 shrink-0">
                  {section.number}
                </span>
                <span className="line-clamp-1">{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
