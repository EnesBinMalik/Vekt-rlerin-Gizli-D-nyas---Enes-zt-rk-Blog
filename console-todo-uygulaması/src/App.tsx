/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useConsoleToDo } from './hooks/useConsoleToDo';
import { TerminalView } from './components/TerminalView';
import { KanbanView } from './components/KanbanView';
import { Header, ViewMode } from './components/Header';
import { CardModal } from './components/CardModal';
import { TeamMembersModal } from './components/TeamMembersModal';
import { CSharpCodeModal } from './components/CSharpCodeModal';
import { Kart, LineType } from './types/todo';
import {
  Info,
  Terminal as TerminalIcon,
  Layers,
  Code2,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const {
    boardState,
    terminalLines,
    currentStep,
    currentPrompt,
    inputValue,
    setInputValue,
    handleCommand,
    directAddCard,
    directMoveCard,
    directDeleteCard,
    directUpdateCard,
    resetToDefault,
    clearScreen,
    commandHistory,
  } = useConsoleToDo();

  const [viewMode, setViewMode] = useState<ViewMode>('SPLIT');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Kart | null>(null);
  const [targetLineForAdd, setTargetLineForAdd] = useState<LineType>('TODO');
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  // Modal handlers
  const handleOpenAddModal = (defaultLine: LineType = 'TODO') => {
    setTargetLineForAdd(defaultLine);
    setEditingCard(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (card: Kart) => {
    setEditingCard(card);
    setIsAddModalOpen(true);
  };

  const handleSaveCard = (cardData: Omit<Kart, 'id' | 'olusturmaTarihi'>, cardId?: string) => {
    if (cardId && editingCard) {
      directUpdateCard({
        ...editingCard,
        ...cardData,
      });
    } else {
      directAddCard(cardData);
    }
  };

  const totalCardsCount =
    boardState.lines.TODO.length +
    boardState.lines.IN_PROGRESS.length +
    boardState.lines.DONE.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAddModal={() => handleOpenAddModal('TODO')}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onReset={resetToDefault}
        totalCards={totalCardsCount}
      />

      {/* Info / Quick Guide Banner */}
      {showInfoBanner && (
        <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-b border-cyan-800/40 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300 gap-3">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-cyan-500/20 text-cyan-300">
                <Info className="w-3.5 h-3.5" />
              </span>
              <span>
                <strong className="text-cyan-300 font-semibold">C# Console ToDo & Kanban:</strong>{' '}
                Konsol ekranına klavyenizle doğrudan komut (1-6) yazabilir veya butonları kullanabilirsiniz.
                Pano ve Konsol anlık senkronizedir!
              </span>
            </div>
            <button
              onClick={() => setShowInfoBanner(false)}
              className="text-slate-400 hover:text-slate-200 text-xs px-2 py-0.5 rounded hover:bg-slate-800 transition"
            >
              Kapat ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col">
        {viewMode === 'SPLIT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
            {/* Terminal Window on Left (5 cols on large screens) */}
            <div className="lg:col-span-5 h-[560px] lg:h-[calc(100vh-140px)] flex flex-col">
              <TerminalView
                lines={terminalLines}
                currentStep={currentStep}
                currentPrompt={currentPrompt}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onCommand={handleCommand}
                onClear={clearScreen}
                onReset={resetToDefault}
                boardState={boardState}
                commandHistory={commandHistory}
              />
            </div>

            {/* Kanban Board on Right (7 cols on large screens) */}
            <div className="lg:col-span-7 h-[560px] lg:h-[calc(100vh-140px)] flex flex-col">
              <KanbanView
                boardState={boardState}
                onMoveCard={directMoveCard}
                onDeleteCard={directDeleteCard}
                onOpenAddModal={handleOpenAddModal}
                onOpenEditModal={handleOpenEditModal}
              />
            </div>
          </div>
        )}

        {viewMode === 'TERMINAL' && (
          <div className="h-[calc(100vh-140px)] flex flex-col">
            <TerminalView
              lines={terminalLines}
              currentStep={currentStep}
              currentPrompt={currentPrompt}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onCommand={handleCommand}
              onClear={clearScreen}
              onReset={resetToDefault}
              boardState={boardState}
              commandHistory={commandHistory}
            />
          </div>
        )}

        {viewMode === 'KANBAN' && (
          <div className="h-[calc(100vh-140px)] flex flex-col">
            <KanbanView
              boardState={boardState}
              onMoveCard={directMoveCard}
              onDeleteCard={directDeleteCard}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <CardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCard}
        initialData={editingCard}
        defaultLine={targetLineForAdd}
        takimUyeleri={boardState.takimUyeleri}
      />

      <TeamMembersModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        takimUyeleri={boardState.takimUyeleri}
      />

      <CSharpCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
