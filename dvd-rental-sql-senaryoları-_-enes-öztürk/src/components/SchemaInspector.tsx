import React from 'react';
import { Database, Key, Table, Layers, ArrowRight } from 'lucide-react';

const SCHEMA_COLUMNS = [
  { name: 'film_id', type: 'integer', pk: true, nullable: 'NO', defaultVal: "nextval('film_film_id_seq')", desc: 'Birincil anahtar (Primary Key)' },
  { name: 'title', type: 'character varying(255)', pk: false, nullable: 'NO', defaultVal: 'NULL', desc: 'Filmin adı (Büyük harf standart)' },
  { name: 'description', type: 'text', pk: false, nullable: 'YES', defaultVal: 'NULL', desc: 'Filmin kısa özeti ve senaryosu' },
  { name: 'release_year', type: 'smallint', pk: false, nullable: 'YES', defaultVal: 'NULL', desc: 'Vizyona giriş yılı' },
  { name: 'language_id', type: 'smallint', pk: false, nullable: 'NO', defaultVal: 'NULL', desc: 'Dil referansı (FK -> language.language_id)' },
  { name: 'rental_duration', type: 'smallint', pk: false, nullable: 'NO', defaultVal: '3', desc: 'Varsayılan kiralama süresi (gün)' },
  { name: 'rental_rate', type: 'numeric(4,2)', pk: false, nullable: 'NO', defaultVal: '4.99', desc: 'Kiralama bedeli ($0.99, $2.99, $4.99)' },
  { name: 'length', type: 'smallint', pk: false, nullable: 'YES', defaultVal: 'NULL', desc: 'Filmin süresi (dakika cinsinden)' },
  { name: 'replacement_cost', type: 'numeric(5,2)', pk: false, nullable: 'NO', defaultVal: '19.99', desc: 'Kaybolma/hasar yenileme bedeli' },
  { name: 'rating', type: 'mpaa_rating (enum)', pk: false, nullable: 'YES', defaultVal: "'G'", desc: 'MPAA derecelendirmesi (G, PG, PG-13, R, NC-17)' },
  { name: 'special_features', type: 'text[]', pk: false, nullable: 'YES', defaultVal: 'NULL', desc: 'Özel içerikler (Trailers, Deleted Scenes vb.)' },
  { name: 'last_update', type: 'timestamp', pk: false, nullable: 'NO', defaultVal: 'now()', desc: 'Kaydın son güncellenme zaman damgası' },
];

export const SchemaInspector: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Table metadata overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">public.film</div>
              <h2 className="text-lg font-bold text-white">film Tablosu Veri Sözlüğü & Şema Tanımı</h2>
            </div>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Toplam Sütun: <strong className="text-white font-mono">12</strong></span>
            <span>·</span>
            <span>Toplam Satır: <strong className="text-white font-mono">1.000</strong></span>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Kolon Adı</th>
                <th className="py-2.5 px-3">Veri Tipi</th>
                <th className="py-2.5 px-3">PK / Anahtar</th>
                <th className="py-2.5 px-3">Boş (Nullable)</th>
                <th className="py-2.5 px-3">Varsayılan (Default)</th>
                <th className="py-2.5 px-3 font-sans">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {SCHEMA_COLUMNS.map((col, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-1.5">
                    {col.pk && <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span>{col.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-blue-300">{col.type}</td>
                  <td className="py-2.5 px-3">
                    {col.pk ? (
                      <span className="text-amber-400 font-semibold text-[11px]">PRIMARY KEY</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{col.nullable}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[150px]">{col.defaultVal}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-300">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relational Context */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>dvdrental İlişkisel Veri Modeli İçindeki Yeri</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          PostgreSQL dvdrental örnek veri tabanında <code className="text-blue-300 bg-slate-950 px-1 py-0.5 rounded font-mono">film</code> tablosu merkezî bir varlıktır. Envanter, aktörler, kategoriler ve kiralama işlemleri film tablosu ile doğrudan veya ara tablolar üzerinden ilişkilidir:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <div className="font-semibold text-blue-300 mb-1">film ↔ inventory</div>
            <div className="text-slate-400 text-[11px]">1 : N ilişkisi. Her filmin mağazalardaki fiziksel DVD kopyalarını temsil eder.</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <div className="font-semibold text-emerald-300 mb-1">film ↔ film_actor ↔ actor</div>
            <div className="text-slate-400 text-[11px]">N : M ilişkisi. Bir filmde birden fazla oyuncu, bir oyuncunun birden çok filmi olabilir.</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <div className="font-semibold text-amber-300 mb-1">film ↔ film_category ↔ category</div>
            <div className="text-slate-400 text-[11px]">N : M ilişkisi. Filmlerin Aksiyon, Komedi, Dram vb. kategorilerini eşler.</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
            <div className="font-semibold text-purple-300 mb-1">inventory ↔ rental ↔ payment</div>
            <div className="text-slate-400 text-[11px]">İşlem hattı. Kiralanan her kopya için müşteri ve ödeme kayıtları bağlanır.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
