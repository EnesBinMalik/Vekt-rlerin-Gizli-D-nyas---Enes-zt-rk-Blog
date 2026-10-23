import React, { useState } from 'react';
import { X, Database, Table, Key } from 'lucide-react';
import { SAMPLE_FILMS, SAMPLE_CUSTOMERS, SAMPLE_PAYMENTS } from '../data/dvdRentalData';

interface SchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColumnDef {
  name: string;
  type: string;
  key?: 'PK' | 'FK';
  nullable: boolean;
  desc: string;
}

const SCHEMAS: {
  [table: string]: {
    description: string;
    columns: ColumnDef[];
  };
} = {
  film: {
    description: 'DVD Rental kataloğundaki tüm film kayıtlarını, kiralama sürelerini, ücretlerini ve özelliklerini saklar.',
    columns: [
      { name: 'film_id', type: 'SMALLINT UNSIGNED', key: 'PK', nullable: false, desc: 'Benzersiz film kimlik numarası (Auto Increment)' },
      { name: 'title', type: 'VARCHAR(255)', nullable: false, desc: 'Filmin adı (Örn: ACADEMY DINOSAUR)' },
      { name: 'description', type: 'TEXT', nullable: true, desc: 'Film özeti ve konusu' },
      { name: 'release_year', type: 'YEAR', nullable: true, desc: 'Yayınlanma yılı' },
      { name: 'rental_rate', type: 'DECIMAL(4,2)', nullable: false, desc: 'Standart kiralama bedeli ($) (Örn: 0.99, 2.99, 4.99)' },
      { name: 'length', type: 'SMALLINT UNSIGNED', nullable: true, desc: 'Film süresi (dakika cinsinden)' },
      { name: 'replacement_cost', type: 'DECIMAL(5,2)', nullable: false, desc: 'Kaybolma/hasar durumunda yenileme bedeli ($)' },
      { name: 'rating', type: "ENUM('G','PG','PG-13','R','NC-17')", nullable: true, desc: 'Yaş sınırı derecelendirmesi' },
      { name: 'special_features', type: "SET('Trailers','Commentaries',...)", nullable: true, desc: 'Ekstra içerikler' }
    ]
  },
  customer: {
    description: 'Kayıtlı müşterilerin temel kimlik, e-posta, iletişim ve aktiflik bilgilerini içerir.',
    columns: [
      { name: 'customer_id', type: 'SMALLINT UNSIGNED', key: 'PK', nullable: false, desc: 'Benzersiz müşteri numarası' },
      { name: 'store_id', type: 'TINYINT UNSIGNED', key: 'FK', nullable: false, desc: 'Bağlı olduğu mağaza kodu' },
      { name: 'first_name', type: 'VARCHAR(45)', nullable: false, desc: 'Müşteri adı (Örn: ELEANOR, KARL)' },
      { name: 'last_name', type: 'VARCHAR(45)', nullable: false, desc: 'Müşteri soyadı (Örn: HUNT, SEAL)' },
      { name: 'email', type: 'VARCHAR(50)', nullable: true, desc: 'Müşteri e-posta adresi' },
      { name: 'address_id', type: 'SMALLINT UNSIGNED', key: 'FK', nullable: false, desc: 'Adres referansı' },
      { name: 'active', type: 'TINYINT(1)', nullable: false, desc: 'Hesap aktif mi (1 = Evet, 0 = Hayır)' },
      { name: 'create_date', type: 'DATETIME', nullable: false, desc: 'Kayıt oluşturulma tarihi' }
    ]
  },
  payment: {
    description: 'Müşterilerin kiralama işlemleri karşılığında yaptığı tüm ödeme işlemlerinin kayıtları.',
    columns: [
      { name: 'payment_id', type: 'SMALLINT UNSIGNED', key: 'PK', nullable: false, desc: 'Benzersiz ödeme işlem numarası' },
      { name: 'customer_id', type: 'SMALLINT UNSIGNED', key: 'FK', nullable: false, desc: 'Ödemeyi yapan müşteri referansı' },
      { name: 'staff_id', type: 'TINYINT UNSIGNED', key: 'FK', nullable: false, desc: 'İşlemi onaylayan personel referansı' },
      { name: 'rental_id', type: 'INT', key: 'FK', nullable: true, desc: 'İlgili kiralama işlem numarası' },
      { name: 'amount', type: 'DECIMAL(5,2)', nullable: false, desc: 'Ödenen tutar ($)' },
      { name: 'payment_date', type: 'DATETIME', nullable: false, desc: 'İşlemin yapıldığı tarih ve saat' }
    ]
  }
};

export const SchemaModal: React.FC<SchemaModalProps> = ({ isOpen, onClose }) => {
  const [selectedTable, setSelectedTable] = useState<'film' | 'customer' | 'payment'>('film');
  const [viewMode, setViewMode] = useState<'columns' | 'sample'>('columns');

  if (!isOpen) return null;

  const currentSchema = SCHEMAS[selectedTable];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                DVD Rental (MySQL) Veri Tabanı Şeması
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tablo yapıları, veri tipleri ve anahtar (Key) ilişkileri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Selector Tabs */}
        <div className="px-6 py-3 bg-slate-950/30 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800/80">
            {(['film', 'customer', 'payment'] as const).map(table => (
              <button
                key={table}
                onClick={() => setSelectedTable(table)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedTable === table
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>{table}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs">
            <button
              onClick={() => setViewMode('columns')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === 'columns' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sütun Tanımları
            </button>
            <button
              onClick={() => setViewMode('sample')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === 'sample' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Örnek Veriler (5 Satır)
            </button>
          </div>
        </div>

        {/* Description Banner */}
        <div className="px-6 py-2.5 bg-slate-900 border-b border-slate-800/60 text-xs text-slate-300">
          <span className="font-semibold text-cyan-400">{selectedTable} tablosu: </span>
          <span>{currentSchema.description}</span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'columns' ? (
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold text-slate-300">Sütun Adı</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-300">Veri Tipi</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-300 text-center">Anahtar</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-300 text-center">Boş Olabilir</th>
                    <th className="py-2.5 px-4 font-semibold text-slate-300">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {currentSchema.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-4 font-mono font-medium text-cyan-300">
                        {col.name}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-purple-300">
                        {col.type}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {col.key ? (
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              col.key === 'PK'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                                : 'bg-blue-950 text-blue-300 border border-blue-800/60'
                            }`}
                          >
                            <Key className="w-2.5 h-2.5" />
                            {col.key}
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-400">
                        {col.nullable ? 'YES' : 'NO'}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">
                        {col.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-950/40">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[11px]">
                  <tr>
                    {selectedTable === 'film' && (
                      <>
                        <th className="py-2.5 px-3">film_id</th>
                        <th className="py-2.5 px-4">title</th>
                        <th className="py-2.5 px-3 text-right">rental_rate</th>
                        <th className="py-2.5 px-3 text-right">length</th>
                        <th className="py-2.5 px-3 text-right">replacement_cost</th>
                        <th className="py-2.5 px-3">rating</th>
                      </>
                    )}
                    {selectedTable === 'customer' && (
                      <>
                        <th className="py-2.5 px-3">customer_id</th>
                        <th className="py-2.5 px-4">first_name</th>
                        <th className="py-2.5 px-4">last_name</th>
                        <th className="py-2.5 px-4">email</th>
                        <th className="py-2.5 px-3">active</th>
                      </>
                    )}
                    {selectedTable === 'payment' && (
                      <>
                        <th className="py-2.5 px-3">payment_id</th>
                        <th className="py-2.5 px-3">customer_id</th>
                        <th className="py-2.5 px-3 text-right">amount</th>
                        <th className="py-2.5 px-4">payment_date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {selectedTable === 'film' &&
                    SAMPLE_FILMS.slice(0, 5).map(f => (
                      <tr key={f.film_id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 text-cyan-300 tabular-nums">{f.film_id}</td>
                        <td className="py-2.5 px-4 text-slate-100 font-sans">{f.title}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-300 tabular-nums">{f.rental_rate} $</td>
                        <td className="py-2.5 px-3 text-right tabular-nums">{f.length} dk</td>
                        <td className="py-2.5 px-3 text-right tabular-nums">{f.replacement_cost} $</td>
                        <td className="py-2.5 px-3 text-slate-400">{f.rating}</td>
                      </tr>
                    ))}
                  {selectedTable === 'customer' &&
                    SAMPLE_CUSTOMERS.slice(0, 5).map(c => (
                      <tr key={c.customer_id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 text-cyan-300 tabular-nums">{c.customer_id}</td>
                        <td className="py-2.5 px-4 font-sans text-slate-100">{c.first_name}</td>
                        <td className="py-2.5 px-4 font-sans text-slate-100">{c.last_name}</td>
                        <td className="py-2.5 px-4 text-slate-400">{c.email}</td>
                        <td className="py-2.5 px-3 text-emerald-400">{c.active === 1 ? '1 (Aktif)' : '0'}</td>
                      </tr>
                    ))}
                  {selectedTable === 'payment' &&
                    SAMPLE_PAYMENTS.slice(0, 5).map(p => (
                      <tr key={p.payment_id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 text-cyan-300 tabular-nums">{p.payment_id}</td>
                        <td className="py-2.5 px-3 tabular-nums">{p.customer_id}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-300 tabular-nums">{p.amount.toFixed(2)} $</td>
                        <td className="py-2.5 px-4 text-slate-400">{p.payment_date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Tüm tablolar MySQL InnoDB motoru üzerinde ilişkilendirilmiştir.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
