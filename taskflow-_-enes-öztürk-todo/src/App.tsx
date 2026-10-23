/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Todo, FilterType, Priority } from './types/todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { EnesSignature } from './components/EnesSignature';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { Toast } from './components/Toast';
import { sound } from './utils/sound';

const STORAGE_KEY = 'taskflow_todos_enes_ozturk_v1';
const SOUND_KEY = 'taskflow_sound_enabled';

const DEFAULT_TODOS: Todo[] = [
  {
    id: '1',
    text: 'todo_1: Kullanıcıdan input al ve listeye ekle',
    completed: false,
    createdAt: Date.now() - 3600000,
    priority: 'high',
  },
  {
    id: '2',
    text: 'todo_2: Tıklanınca üzerini çiz ve aktif sayaç kontrolü yap',
    completed: false,
    createdAt: Date.now() - 2400000,
    priority: 'medium',
  },
  {
    id: '3',
    text: 'todo_3: Üzerine basılı tutarak (long-press) görevi sil',
    completed: false,
    createdAt: Date.now() - 1200000,
    priority: 'low',
  },
];

export default function App() {
  // Initialize todos from localStorage or fallback to initial defaults
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_TODOS;
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [lastDeletedTodo, setLastDeletedTodo] = useState<{ todo: Todo; index: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync todos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  // Sync sound settings
  useEffect(() => {
    sound.enabled = soundEnabled;
    try {
      localStorage.setItem(SOUND_KEY, JSON.stringify(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  // Strict requirement: "Yukarıda görünen todo sayısı sadece aktif kalan todoları belirtmeli"
  const activeCount = todos.filter((todo) => !todo.completed).length;

  const handleAddTodo = (text: string, priority?: Priority) => {
    const newTodo: Todo = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text,
      completed: false,
      createdAt: Date.now(),
      priority: priority || 'medium',
    };

    setTodos((prev) => [newTodo, ...prev]);
    sound.playAdd();
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const willComplete = !todo.completed;
          if (willComplete) {
            sound.playComplete();
          } else {
            sound.playUncomplete();
          }
          return { ...todo, completed: willComplete };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: string, text: string) => {
    const index = todos.findIndex((t) => t.id === id);
    const todoToDelete = todos[index];

    if (todoToDelete) {
      setLastDeletedTodo({ todo: todoToDelete, index });
      setToastMessage(`"${text.length > 20 ? text.substring(0, 20) + '...' : text}" silindi`);
    }

    setTodos((prev) => prev.filter((t) => t.id !== id));
    sound.playDelete();
  };

  const handleUndoDelete = () => {
    if (lastDeletedTodo) {
      setTodos((prev) => {
        const next = [...prev];
        next.splice(lastDeletedTodo.index, 0, lastDeletedTodo.todo);
        return next;
      });
      setLastDeletedTodo(null);
      setToastMessage(null);
      sound.playAdd();
    }
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
    sound.playDelete();
  };

  const handleResetDefaults = () => {
    setTodos(DEFAULT_TODOS);
    sound.playAdd();
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between antialiased">
      {/* Background radial gradient accent */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex-1">
        {/* Header with active count */}
        <TodoHeader
          activeCount={activeCount}
          totalCount={todos.length}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
        />

        {/* Input capture component */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* Main Todo List */}
        <TodoList
          todos={todos}
          filter={filter}
          onFilterChange={setFilter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          onClearCompleted={handleClearCompleted}
          onResetDefaults={handleResetDefaults}
        />

        {/* Enes Öztürk Signature and project footer */}
        <EnesSignature onOpenProjectInfo={() => setIsProjectInfoOpen(true)} />
      </main>

      {/* Project Details & Submission Modal */}
      <ProjectInfoModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
        activeCount={activeCount}
        totalCount={todos.length}
      />

      {/* Toast with Undo capability */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onUndo={handleUndoDelete}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
