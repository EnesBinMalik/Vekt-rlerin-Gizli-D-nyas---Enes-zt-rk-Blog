import React, { useState } from 'react';
import { Database, Table, Key, Info, Play, ExternalLink } from 'lucide-react';
import { getTablePreview } from '../services/sqlEngine';
import { ResultsTable } from './ResultsTable';

interface TableMeta {
  name: 'film' | 'customer' | 'category';
  title: string;
  description: string;
  primaryKey: string;
  columns: {
    name: string;
    type: string;
    constraints?: string;
    description: string;
  }[];
}

const SCHEMA_DEFINITIONS: TableMeta[] = [
  {
    name: 'film',
    title: 'film Tablosu (Film Kataloğu)',
    description: 'Dvdrental mağazasında kiralanabilir tüm filmlerin süreleri, kiralama oranları ve maliyet bilgileri.',
    primaryKey: 'film_id',
    columns: [
      { name: 'film_id', type: 'integer', constraints: 'PRIMARY KEY', description: 'Benzersiz film kimlik numarası' },
      { name: 'title', type: 'varchar(255)', constraints: 'NOT NULL', description: 'Filmin adı / başlığı' },
      { name: 'description', type: 'text', description: 'Filmin konusu ve özet açıklaması' },
      { name: 'release_year', type: 'smallint', description: 'Filmin vizyona çıkış yılı (örn. 2006)' },
      { name: 'rental_duration', type: 'smallint', constraints: 'DEFAULT 3', description: 'Kiralama süresi (gün)' },
      { name: 'rental_rate', type: 'numeric(4,2)', constraints: 'NOT NULL DEFAULT 4.99', description: 'Kiralama bedeli (0.99, 2.99, 4.99)' },
      { name: 'length', type: 'smallint', description: 'Filmin toplam süresi (dakika)' },
      { name: 'replacement_cost', type: 'numeric(5,2)', constraints: 'NOT NULL', description: 'Filmin kayıp/hasar durumunda tazmin bedeli' },
      { name: 'rating', type: 'varchar(10)', description: 'MPAA yaş derecesi (G, PG, PG-13, R, NC-17)' },
      { name: 'special_features', type: 'text', description: 'Ek özellikler (Trailers, Deleted Scenes, vb.)' }
    ]
  },
  {
    name: 'customer',
    title: 'customer Tablosu (Müşteriler)',
    description: 'Kayıtlı müşterilerin kimlik, isim, soyisim, e-posta ve aktiflik kayıtları.',
    primaryKey: 'customer_id',
    columns: [
      { name: 'customer_id', type: 'integer', constraints: 'PRIMARY KEY', description: 'Benzersiz müşteri numarası (Mary = 1)' },
      { name: 'store_id', type: 'smallint', constraints: 'NOT NULL', description: 'Bağlı olduğu mağaza kimliği (1 veya 2)' },
      { name: 'first_name', type: 'varchar(45)', constraints: 'NOT NULL', description: 'Müşterinin ilk adı (örn. Mary)' },
      { name: 'last_name', type: 'varchar(45)', constraints: 'NOT NULL', description: 'Müşterinin soyadı (örn. SMITH)' },
      { name: 'email', type: 'varchar(50)', description: 'Müşteri e-posta adresi' },
      { name: 'address_id', type: 'smallint', constraints: 'NOT NULL', description: 'Adres referans kimliği' },
      { name: 'active', type: 'integer', constraints: 'DEFAULT 1', description: 'Müşteri aktif mi (1 = Evet, 0 = Hayır)' }
    ]
  },
  {
    name: 'category',
    title: 'category Tablosu (Kategoriler & Türler)',
    description: 'Filmlerin sınıflandırıldığı film kategorileri (Action, Drama, Sci-Fi vb.).',
    primaryKey: 'category_id',
    columns: [
      { name: 'category_id', type: 'integer', constraints: 'PRIMARY KEY', description: 'Kategori kimliği' },
      { name: 'name', type: 'varchar(25)', constraints: 'NOT NULL', description: 'Kategori ismi' }
    ]
  }
];

interface SchemaBrowserProps {
  onSelectQueryInEditor: (sql: string) => void;
}

export const SchemaBrowser: React.FC<SchemaBrowserProps> = ({ onSelectQueryInEditor }) => {
  const [activeTable, setActiveTable] = useState<'film' | 'customer' | 'category'>('film');

  const selectedMeta = SCHEMA_DEFINITIONS.find((t) => t.name === activeTable)!;
  const previewData = getTablePreview(activeTable, 10);

  return (
    <div className="space-y-6">
      {/* Table selector tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
        {SCHEMA_DEFINITIONS.map((table) => {
          const isActive = table.name === activeTable;
          return (
            <button
              key={table.name}
              onClick={() => setActiveTable(table.name)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/60'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Table className="h-4 w-4" />
              <span>{table.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? 'bg-cyan-800/80 text-cyan-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {table.columns.length} sütun
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Table Overview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-mono">
                {selectedMeta.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {selectedMeta.description}
            </p>
          </div>

          <button
            onClick={() => onSelectQueryInEditor(`SELECT * FROM ${selectedMeta.name} LIMIT 25;`)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 px-3 py-1.5 text-xs font-medium"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Editörde Sorgula (SELECT *)</span>
          </button>
        </div>

        {/* Columns Grid */}
        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Sütun Adı</th>
                  <th className="py-2.5 px-4">Veri Tipi</th>
                  <th className="py-2.5 px-4">Kısıtlar (Constraints)</th>
                  <th className="py-2.5 px-4">Açıklama / Anlamı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {selectedMeta.columns.map((col) => {
                  const isPk = col.name === selectedMeta.primaryKey;
                  return (
                    <tr key={col.name} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-4 font-mono font-semibold text-slate-200 flex items-center gap-1.5">
                        {isPk && <Key className="h-3 w-3 text-amber-400" />}
                        <span className={isPk ? 'text-amber-300' : 'text-slate-200'}>
                          {col.name}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-cyan-300 text-[11px]">
                        {col.type}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-[11px]">
                        {col.constraints ? (
                          <span className={`px-2 py-0.5 rounded ${
                            isPk
                              ? 'bg-amber-950/70 text-amber-300 border border-amber-800/50'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {col.constraints}
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">
                        {col.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Table Data Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <span>Canlı Tablo Önizlemesi</span>
            <span className="text-xs text-slate-400 font-normal">
              (İlk 10 kayıt gösteriliyor)
            </span>
          </h3>
        </div>

        <ResultsTable
          columns={previewData.columns}
          rows={previewData.rows}
          title={`${selectedMeta.name} İlk 10 Kayıt`}
          maxInitialRows={10}
        />
      </div>
    </div>
  );
};
