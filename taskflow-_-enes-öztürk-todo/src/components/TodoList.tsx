import React, { useState } from 'react';
import { Search, CheckCircle2, ListFilter, Trash, Sparkles, RefreshCw } from 'lucide-react';
import { Todo, FilterType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string, text: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onClearCompleted: () => void;
  onResetDefaults: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onFilterChange,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onClearCompleted,
  onResetDefaults,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search
  const filteredTodos = todos.filter((todo) => {
    // Status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Search query
    if (searchQuery.trim()) {
      return todo.text.toLowerCase().includes(searchQuery.toLowerCase().trim());
    }
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="mt-8">
      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        {/* Segmented Filter Buttons (interactive controls allowed by constitution) */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/90 border border-slate-700/80 rounded-xl">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tümü ({todos.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('active')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'active'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aktif ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('completed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tamamlanan ({completedCount})
          </button>
        </div>

        {/* Search Input & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Görev ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Tamamlanan görevleri temizle"
            >
              <Trash className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Bitenleri Temizle</span>
            </button>
          )}
        </div>
      </div>

      {/* Todo Items List */}
      <div className="space-y-2.5">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        ))}

        {/* Empty States */}
        {filteredTodos.length === 0 && (
          <div className="p-8 text-center bg-slate-800/40 border border-dashed border-slate-700/80 rounded-2xl">
            {searchQuery ? (
              <div>
                <p className="text-slate-400 text-sm">
                  "{searchQuery}" ifadesine uygun görev bulunamadı.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs text-indigo-400 hover:underline font-medium cursor-pointer"
                >
                  Aramayı Temizle
                </button>
              </div>
            ) : filter === 'active' && todos.length > 0 ? (
              <div>
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-200">
                  Tebrikler! Aktif görev kalmadı.
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Listedeki tüm görevleri başarıyla tamamladınız.
                </p>
                <button
                  onClick={() => onFilterChange('all')}
                  className="mt-4 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                >
                  Tüm Görevleri Gör ({todos.length})
                </button>
              </div>
            ) : filter === 'completed' && todos.length > 0 ? (
              <div>
                <p className="text-slate-400 text-sm">
                  Henüz tamamlanmış bir görev bulunmuyor.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Listedeki görevlerin üzerine tıklayarak tamamlayabilirsiniz.
                </p>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-200">
                  Listeniz şu anda boş
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Yukarıdaki kutudan yeni bir görev ekleyin veya varsayılan örnek görevleri yükleyin.
                </p>
                <button
                  onClick={onResetDefaults}
                  className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Örnek Görevleri Yükle (todo_1, todo_2, todo_3)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Long-press instruction banner at bottom */}
      {todos.length > 0 && (
        <div className="mt-4 px-4 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-xl flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>
              <strong className="text-slate-200">EK İpucu:</strong> Bir görevi tamamen silmek için üzerine basılı tutun.
            </span>
          </div>
          <button
            onClick={onResetDefaults}
            title="Örnek görevleri sıfırla"
            className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Örnekleri Sıfırla</span>
          </button>
        </div>
      )}
    </div>
  );
};
