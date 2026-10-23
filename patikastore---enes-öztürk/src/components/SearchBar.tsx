import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Ara...',
}) => {
  return (
    <div className="relative my-3 w-full">
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#eceff1] hover:bg-[#e2e8f0] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium rounded-xl pl-10 pr-10 py-3 transition-colors duration-150 outline-none focus:ring-2 focus:ring-purple-600 focus:shadow-sm"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChangeText('')}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            title="Temizle"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
