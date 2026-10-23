import React, { useState } from 'react';
import { INITIAL_EMPLOYEES, generateFullSqlScript } from './data/mockarooData';
import { Employee, ExecutionLog, QueryResult } from './types/database';
import { executeSql } from './utils/sqlEngine';
import { TopBar, TabType } from './components/TopBar';
import { TableView } from './components/TableView';
import { UpdateOperations } from './components/UpdateOperations';
import { DeleteOperations } from './components/DeleteOperations';
import { SqlConsole } from './components/SqlConsole';
import { SchemaInspector } from './components/SchemaInspector';
import { SqlExportView } from './components/SqlExportView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [activeTab, setActiveTab] = useState<TabType>('table');
  const [history, setHistory] = useState<ExecutionLog[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleExecuteSql = (sql: string): QueryResult => {
    const res = executeSql(sql, employees, setEmployees);

    const log: ExecutionLog = {
      id: Math.random().toString(36).substring(2, 9),
      sql,
      timestamp: res.timestamp,
      status: res.success ? 'success' : 'error',
      affectedRows: res.affectedRows ?? 0,
      executionTimeMs: res.executionTimeMs,
      message: res.message
    };

    setHistory(prev => [log, ...prev]);

    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }

    return res;
  };

  const handleResetDatabase = () => {
    setEmployees(INITIAL_EMPLOYEES);
    handleExecuteSql('-- VERİTABANI SIFIRLANDI: Mockaroo 50 kayıt yeniden yüklendi.');
    showToast('Veritabanı orijinal 50 Mockaroo kaydına başarıyla sıfırlandı.', 'info');
  };

  const handleDownloadSql = () => {
    const script = generateFullSqlScript('Enes Öztürk');
    const blob = new Blob([script], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'enes_ozturk_test_employee.sql';
    link.click();
    URL.revokeObjectURL(url);
    showToast('enes_ozturk_test_employee.sql dosyası indirildi.', 'success');
  };

  const handleAddEmployee = (newEmp: Omit<Employee, 'id'>) => {
    const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const insertSql = `INSERT INTO employee (id, name, birthday, email) VALUES (${nextId}, '${newEmp.name.replace(/'/g, "''")}', '${newEmp.birthday}', '${newEmp.email.replace(/'/g, "''")}');`;
    handleExecuteSql(insertSql);
  };

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    const updateSql = `UPDATE employee SET name = '${updatedEmp.name.replace(/'/g, "''")}', birthday = '${updatedEmp.birthday}', email = '${updatedEmp.email.replace(/'/g, "''")}' WHERE id = ${updatedEmp.id};`;
    handleExecuteSql(updateSql);
  };

  const handleDeleteEmployee = (id: number) => {
    const deleteSql = `DELETE FROM employee WHERE id = ${id};`;
    handleExecuteSql(deleteSql);
  };

  const handleRunQuickQuery = (sql: string) => {
    setActiveTab('console');
    setTimeout(() => {
      handleExecuteSql(sql);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDatabase={handleResetDatabase}
        onDownloadSql={handleDownloadSql}
        employeeCount={employees.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'table' && (
          <TableView
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onRunQuickQuery={handleRunQuickQuery}
          />
        )}

        {activeTab === 'updates' && (
          <UpdateOperations
            employees={employees}
            onExecuteSql={handleExecuteSql}
          />
        )}

        {activeTab === 'deletes' && (
          <DeleteOperations
            employees={employees}
            onExecuteSql={handleExecuteSql}
          />
        )}

        {activeTab === 'console' && (
          <SqlConsole
            onExecute={handleExecuteSql}
            history={history}
            onClearHistory={() => setHistory([])}
          />
        )}

        {activeTab === 'schema' && (
          <SchemaInspector />
        )}

        {activeTab === 'sql-export' && (
          <SqlExportView
            onDownload={handleDownloadSql}
          />
        )}
      </main>

      {/* Footer with clean Enes Öztürk Signature and MySQL Info */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>MySQL Veritabanı Projesi</span>
            <span>·</span>
            <span>Veritabanı: <strong className="text-slate-400 font-mono">test</strong></span>
            <span>·</span>
            <span>Tablo: <strong className="text-slate-400 font-mono">employee</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span>Hazırlayan & Geliştirici:</span>
            <span className="text-cyan-400 font-semibold tracking-wide">
              Enes Öztürk
            </span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 shadow-2xl text-xs text-white animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
