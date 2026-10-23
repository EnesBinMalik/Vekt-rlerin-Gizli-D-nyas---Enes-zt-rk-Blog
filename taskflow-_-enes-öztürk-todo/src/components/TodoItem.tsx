import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit3, X, CheckSquare, Square, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string, text: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const LONG_PRESS_DURATION = 750; // ms required to delete via hold

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);

  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const isLongPressTriggeredRef = useRef<boolean>(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const clearAllTimers = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPressing(false);
    setPressProgress(0);
  };

  const startPress = (e: React.SyntheticEvent) => {
    // If editing or clicking action buttons, do not trigger long press
    if (isEditing) return;

    isLongPressTriggeredRef.current = false;
    startTimeRef.current = Date.now();
    setIsPressing(true);
    setPressProgress(0);

    const stepMs = 25;
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / LONG_PRESS_DURATION) * 100);
      setPressProgress(progress);
    }, stepMs);

    pressTimerRef.current = setTimeout(() => {
      isLongPressTriggeredRef.current = true;
      clearAllTimers();

      // Trigger haptic if available on mobile
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 30, 60]);
        } catch {}
      }

      // Execute delete
      onDelete(todo.id, todo.text);
    }, LONG_PRESS_DURATION);
  };

  const endPress = () => {
    clearAllTimers();
  };

  const handleClick = (e: React.MouseEvent) => {
    // If long press just completed, do not trigger click toggle
    if (isLongPressTriggeredRef.current) {
      isLongPressTriggeredRef.current = false;
      return;
    }
    if (isEditing) return;

    // Toggle todo status
    onToggle(todo.id);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
      setIsEditing(false);
    } else {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const priorityColor = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    high: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  }[todo.priority || 'medium'];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 select-none ${
        todo.completed
          ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600 text-slate-100 shadow-sm'
      } ${isPressing ? 'scale-[0.985] ring-2 ring-rose-500/50' : ''}`}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
    >
      {/* Long-press delete progress bar indicator (EK Özellik) */}
      {isPressing && (
        <div
          className="absolute inset-y-0 left-0 bg-rose-600/25 border-r-2 border-rose-500 transition-all pointer-events-none z-0"
          style={{ width: `${pressProgress}%` }}
        />
      )}

      {/* Long press helper badge when holding */}
      {isPressing && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/90 px-3 py-1 rounded-full border border-rose-500/40 animate-pulse pointer-events-none">
          <Trash2 className="w-3.5 h-3.5" />
          <span>Siliniyor... ({Math.round(pressProgress)}%)</span>
        </div>
      )}

      <div className="relative z-10 flex items-center justify-between p-3.5 sm:p-4 gap-3">
        {/* Left: Custom Checkbox and Task Text */}
        <div
          className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
          onClick={handleClick}
        >
          {/* Custom Styled Checkbox Button */}
          <button
            type="button"
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 border ${
              todo.completed
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                : 'border-slate-600 bg-slate-900/50 hover:border-indigo-400 text-transparent'
            }`}
            aria-label={todo.completed ? 'Görevi aktif yap' : 'Görevi tamamla'}
          >
            <Check
              className={`w-3.5 h-3.5 stroke-[3] transition-transform ${
                todo.completed ? 'scale-100' : 'scale-0'
              }`}
            />
          </button>

          {/* Todo Content (Normal or Editing Mode) */}
          {isEditing ? (
            <form
              onSubmit={handleSaveEdit}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 flex-1"
            >
              <input
                ref={editInputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="flex-1 bg-slate-900 border border-indigo-500 px-2.5 py-1 rounded-lg text-sm text-white focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs"
                title="Kaydet"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
                title="İptal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="flex-1 min-w-0">
              <span
                className={`text-sm sm:text-base font-medium break-words transition-all block ${
                  todo.completed
                    ? 'line-through text-slate-500 decoration-slate-500/80 decoration-2'
                    : 'text-slate-100'
                }`}
              >
                {todo.text}
              </span>

              {/* Sub-meta: Priority + Hint */}
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                {todo.priority && (
                  <span className={`px-2 py-0.5 rounded-md border font-medium text-[10px] ${priorityColor}`}>
                    {todo.priority === 'high' ? 'Önemli' : todo.priority === 'low' ? 'Düşük' : 'Normal'}
                  </span>
                )}
                <span>
                  {new Date(todo.createdAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {todo.completed && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">Tamamlandı</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Action buttons (Accessible Alternative to Long Press) */}
        {!isEditing && (
          <div
            className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Edit */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-slate-700/60 rounded-xl transition-colors cursor-pointer"
              title="Görevi Düzenle"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Direct Delete button */}
            <button
              onClick={() => onDelete(todo.id, todo.text)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
              title="Görevi Sil (veya üzerine basılı tutun)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
