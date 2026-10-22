import React from 'react';
import { ListOrdered, ChevronRight, Bookmark } from 'lucide-react';
import { TableOfContentItem } from '../types/blog';

interface TableOfContentsProps {
  items: TableOfContentItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onItemClick,
}) => {
  return (
    <nav className="rounded-2xl border border-stone-200/80 bg-white/70 dark:bg-stone-900/70 p-5 shadow-2xs backdrop-blur-xs">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-sans-ui text-xs font-bold uppercase tracking-wider">
        <ListOrdered className="h-4 w-4 text-amber-600" />
        <span>İçindekiler & Rehber</span>
      </div>

      <ul className="space-y-1 font-sans-ui text-xs">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border-l-2 border-amber-600'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[10px] opacity-50">0{index + 1}</span>
                  <span className="truncate">{item.title}</span>
                </div>
                <span className="text-[10px] text-stone-400 group-hover:text-stone-600 font-mono shrink-0 ml-1">
                  {item.readTime}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
