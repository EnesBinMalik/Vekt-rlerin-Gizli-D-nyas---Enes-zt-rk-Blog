import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SqlEditor } from './components/SqlEditor';
import { ResultsGrid } from './components/ResultsGrid';
import { HomeworkPanel } from './components/HomeworkPanel';
import { TableStructureModal } from './components/TableStructureModal';
import { HistoryPanel, HistoryItem } from './components/HistoryPanel';
import { AboutSignatureModal } from './components/AboutSignatureModal';
import { defaultEngine, QueryResult, HomeworkTask, HOMEWORK_TASKS } from './utils/sqlEngine';

export default function App() {
  const [activeView, setActiveView] = useState<'editor' | 'homework' | 'schema' | 'history'>('editor');
  const [currentSql, setCurrentSql] = useState<string>(
    `-- MySQL Sakila Database · Enes Öztürk İmzalı\n-- Görev 1: replacement_cost 12.99 ile 16.99 arasındaki filmler\nSELECT * FROM film\nWHERE replacement_cost BETWEEN 12.99 AND 16.99\nORDER BY replacement_cost ASC;`
  );
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  // Execute query function
  const executeQuery = (sqlToRun?: string) => {
    const targetSql = sqlToRun !== undefined ? sqlToRun : currentSql;
    if (!targetSql.trim()) return;

    setIsExecuting(true);
    const result = defaultEngine.execute(targetSql);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const logLine = `[${timeStr}] ${targetSql.replace(/\n/g, ' ')} -> ${result.success ? `${result.rowCount} satır döndü (${result.executionTimeMs} ms)` : result.error}`;

    setQueryResult(result);
    setHistoryLogs(prev => [logLine, ...prev.slice(0, 49)]);

    const newHistoryItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      sql: targetSql,
      timestamp: timeStr,
      success: result.success,
      rowCount: result.rowCount,
      executionTimeMs: result.executionTimeMs,
    };
    setHistoryList(prev => [newHistoryItem, ...prev.slice(0, 99)]);

    setIsExecuting(false);
  };

  // Run on first load
  useEffect(() => {
    executeQuery(currentSql);
  }, []);

  // Homework task selection
  const handleSelectHomeworkTask = (task: HomeworkTask) => {
    setCurrentSql(task.sql);
    setActiveView('editor');
    setTimeout(() => {
      executeQuery(task.sql);
    }, 50);
  };

  // Table selection from sidebar
  const handleSelectTable = (tableName: string) => {
    const sql = `SELECT * FROM ${tableName} LIMIT 50;`;
    setCurrentSql(sql);
    setActiveView('editor');
    setTimeout(() => {
      executeQuery(sql);
    }, 50);
  };

  // Quick run
  const handleQuickRun = (sql: string) => {
    setCurrentSql(sql);
    setActiveView('editor');
    setTimeout(() => {
      executeQuery(sql);
    }, 50);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Bar Contract (Wordmark - Navigation - Action/Signature) */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onRunCurrentQuery={() => executeQuery()}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        isExecuting={isExecuting}
      />

      {/* Main Workspace Canvas (Sidebar + Content Viewport) */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Schemas Sidebar */}
        <Sidebar
          onSelectTable={handleSelectTable}
          onSelectHomeworkTask={handleSelectHomeworkTask}
          onQuickRun={handleQuickRun}
          currentSql={currentSql}
        />

        {/* Viewport Dynamic Content */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-900">
          {activeView === 'editor' && (
            <div className="flex-1 flex flex-col min-h-0">
              <SqlEditor
                currentSql={currentSql}
                onChangeSql={setCurrentSql}
                onExecute={() => executeQuery()}
                isExecuting={isExecuting}
                onSelectHomeworkTask={handleSelectHomeworkTask}
              />
              <ResultsGrid
                result={queryResult}
                historyLogs={historyLogs}
              />
            </div>
          )}

          {activeView === 'homework' && (
            <HomeworkPanel
              onRunTask={(sql) => {
                setCurrentSql(sql);
                setActiveView('editor');
                setTimeout(() => {
                  executeQuery(sql);
                }, 50);
              }}
              onOpenAboutModal={() => setIsAboutModalOpen(true)}
            />
          )}

          {activeView === 'schema' && (
            <TableStructureModal
              onQuickRun={handleQuickRun}
            />
          )}

          {activeView === 'history' && (
            <HistoryPanel
              history={historyList}
              onRerun={(sql) => {
                setCurrentSql(sql);
                setActiveView('editor');
                setTimeout(() => {
                  executeQuery(sql);
                }, 50);
              }}
              onClearHistory={() => {
                setHistoryList([]);
                setHistoryLogs([]);
              }}
            />
          )}
        </main>
      </div>

      {/* Author & Signature Certificate Modal */}
      <AboutSignatureModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
