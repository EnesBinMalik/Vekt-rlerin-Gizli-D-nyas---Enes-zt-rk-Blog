import React, { useState, useMemo } from 'react';
import { Employee } from '../types/database';
import { Search, Plus, Trash2, Edit3, ArrowUpDown, Check, X, ShieldAlert } from 'lucide-react';

interface TableViewProps {
  employees: Employee[];
  onAddEmployee: (emp: Omit<Employee, 'id'>) => void;
  onUpdateEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: number) => void;
  onRunQuickQuery: (sql: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onRunQuickQuery
}) => {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<keyof Employee>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // New employee form
  const [newName, setNewName] = useState('');
  const [newBirthday, setNewBirthday] = useState('1995-05-15');
  const [newEmail, setNewEmail] = useState('');

  // Edit employee form
  const [editName, setEditName] = useState('');
  const [editBirthday, setEditBirthday] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Filtering & Sorting
  const filteredEmployees = useMemo(() => {
    let result = [...employees];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        emp =>
          emp.name.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.birthday.includes(q) ||
          String(emp.id).includes(q)
      );
    }

    result.sort((a, b) => {
      const valA = a[sortCol];
      const valB = b[sortCol];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [employees, search, sortCol, sortAsc]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  const handleSort = (col: keyof Employee) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditTarget(emp);
    setEditName(emp.name);
    setEditBirthday(emp.birthday);
    setEditEmail(emp.email);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    onUpdateEmployee({
      id: editTarget.id,
      name: editName.trim(),
      birthday: editBirthday,
      email: editEmail.trim()
    });
    setEditTarget(null);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    onAddEmployee({
      name: newName.trim(),
      birthday: newBirthday,
      email: newEmail.trim()
    });
    setNewName('');
    setNewEmail('');
    setIsAddOpen(false);
  };

  const executeDeleteRow = (id: number) => {
    onDeleteEmployee(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-4">
      {/* Table Metadata & Quick Actions Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Veritabanı: <strong className="text-slate-200 font-mono">test</strong></span>
            <span>·</span>
            <span>Tablo: <strong className="text-cyan-400 font-mono">employee</strong></span>
            <span>·</span>
            <span>Motor: <strong className="text-slate-200">InnoDB</strong></span>
            <span>·</span>
            <span>Karakter Seti: <strong className="text-slate-200">utf8mb4</strong></span>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Mockaroo servisiyle oluşturulmuş <strong className="text-cyan-400 font-mono tabular-nums">{employees.length}</strong> çalışan kaydı listeleniyor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onRunQuickQuery('SELECT * FROM employee ORDER BY id ASC;')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-md hover:text-white hover:bg-slate-700 transition-colors"
          >
            SELECT *
          </button>
          <button
            onClick={() => onRunQuickQuery('SELECT COUNT(*) AS toplam FROM employee;')}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-md hover:text-white hover:bg-slate-700 transition-colors"
          >
            COUNT(*)
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Çalışan Ekle</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="İsim, e-posta, doğum tarihi veya id ara..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>
            Toplam <strong className="text-slate-200 font-mono tabular-nums">{filteredEmployees.length}</strong> kayıt
          </span>
          <div className="flex items-center gap-1">
            <span>Sayfa Başına:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider font-mono">
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 select-none w-20"
                >
                  <div className="flex items-center gap-1">
                    <span>id (INT)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>name VARCHAR(50)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('birthday')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 select-none w-36"
                >
                  <div className="flex items-center gap-1">
                    <span>birthday DATE</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('email')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>email VARCHAR(100)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right w-24">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Kayıt bulunamadı. Arama kriterlerini temizleyin veya veritabanını sıfırlayın.
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-4 font-mono font-medium text-cyan-400 tabular-nums">
                      #{emp.id}
                    </td>
                    <td className="py-2.5 px-4 text-slate-100 font-medium">
                      {emp.name}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-300 tabular-nums">
                      {emp.birthday}
                    </td>
                    <td className="py-2.5 px-4 text-slate-300 font-mono">
                      {emp.email}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(emp)}
                          title="Bu kaydı düzenle (UPDATE)"
                          className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(emp.id)}
                          title="Bu kaydı sil (DELETE)"
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
          <div>
            Gösterilen: <span className="font-mono text-slate-200 tabular-nums">{(currentPage - 1) * pageSize + 1}</span> - <span className="font-mono text-slate-200 tabular-nums">{Math.min(currentPage * pageSize, filteredEmployees.length)}</span> / <span className="font-mono text-slate-200 tabular-nums">{filteredEmployees.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Önceki
            </button>
            <span className="px-2 font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-rose-500/10 text-rose-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Satırı Silmeyi Onaylayın (DELETE)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  id = <strong className="text-slate-200 font-mono">#{deleteConfirmId}</strong> olan çalışan kaydı tablodan silinecek.
                </p>
                <div className="mt-3 p-2 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300">
                  DELETE FROM employee WHERE id = {deleteConfirmId};
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => executeDeleteRow(deleteConfirmId)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md transition-colors"
              >
                Satırı Sil (DELETE)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold text-white">
                Çalışanı Güncelle (UPDATE #{editTarget.id})
              </h3>
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">id (Değiştirilemez - PK)</label>
                <input
                  type="text"
                  disabled
                  value={`#${editTarget.id}`}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded p-2 text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">name VARCHAR(50)</label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">birthday DATE</label>
                <input
                  type="date"
                  required
                  value={editBirthday}
                  onChange={(e) => setEditBirthday(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">email VARCHAR(100)</label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md"
              >
                Değişiklikleri Kaydet (UPDATE)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveAdd}
            className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold text-white">
                Yeni Çalışan Ekle (INSERT INTO employee)
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">name VARCHAR(50) *</label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  placeholder="Örn: Enes Öztürk"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">birthday DATE *</label>
                <input
                  type="date"
                  required
                  value={newBirthday}
                  onChange={(e) => setNewBirthday(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">email VARCHAR(100) *</label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  placeholder="calisan@sirket.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md"
              >
                Kayıt Ekle (INSERT)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
