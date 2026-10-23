import React, { useState } from 'react';
import { Database, Key, Copy, Check, ShieldCheck, Code2 } from 'lucide-react';

export const SchemaInspector: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const ddlSql = `CREATE DATABASE IF NOT EXISTS test
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE test;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_employee_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  const handleCopyDdl = () => {
    navigator.clipboard.writeText(ddlSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const columns = [
    {
      name: 'id',
      type: 'INTEGER / INT',
      nullValue: 'NO',
      key: 'PRIMARY KEY (PRI)',
      defaultVal: 'AUTO_INCREMENT',
      description: 'Her çalışan için benzersiz otomatik artan tam sayı kimliği.'
    },
    {
      name: 'name',
      type: 'VARCHAR(50)',
      nullValue: 'NO',
      key: 'None',
      defaultVal: 'None',
      description: 'Çalışanın adı ve soyadı (maksimum 50 karakter).'
    },
    {
      name: 'birthday',
      type: 'DATE',
      nullValue: 'NO',
      key: 'None',
      defaultVal: 'None',
      description: 'Çalışanın doğum tarihi (YYYY-MM-DD standart formatında).'
    },
    {
      name: 'email',
      type: 'VARCHAR(100)',
      nullValue: 'NO',
      key: 'UNIQUE (UNI)',
      defaultVal: 'None',
      description: 'Çalışanın benzersiz e-posta adresi (maksimum 100 karakter).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Table Metadata */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">
                MySQL Tablo Şeması: <span className="font-mono text-cyan-400">test.employee</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              İstenen sütun bilgileri: <strong className="text-slate-200">id(INTEGER)</strong>, <strong className="text-slate-200">name VARCHAR(50)</strong>, <strong className="text-slate-200">doğum günü DATE</strong>, <strong className="text-slate-200">email VARCHAR(100)</strong>.
            </p>
          </div>

          <button
            onClick={handleCopyDdl}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">DDL Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>CREATE TABLE DDL Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Sütun Spesifikasyonları (Column Definitions)
          </span>
          <span className="text-xs text-slate-500 font-mono">
            InnoDB · utf8mb4 · 4 Sütun
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400">
                <th className="py-3 px-4">Sütun Adı</th>
                <th className="py-3 px-4">Veri Tipi</th>
                <th className="py-3 px-4">NULL?</th>
                <th className="py-3 px-4">Anahtar (Key)</th>
                <th className="py-3 px-4">Ek Özellik (Extra)</th>
                <th className="py-3 px-4 font-sans">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {columns.map((col) => (
                <tr key={col.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-400 flex items-center gap-1.5">
                    {col.name === 'id' && <Key className="w-3 h-3 text-amber-400" />}
                    <span>{col.name}</span>
                  </td>
                  <td className="py-3 px-4 text-purple-300 font-medium">
                    {col.type}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {col.nullValue}
                  </td>
                  <td className="py-3 px-4">
                    {col.key.includes('PRI') ? (
                      <span className="text-amber-400 font-semibold">{col.key}</span>
                    ) : col.key.includes('UNI') ? (
                      <span className="text-cyan-400 font-semibold">{col.key}</span>
                    ) : (
                      <span className="text-slate-500">{col.key}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-emerald-400">
                    {col.defaultVal}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DDL Code Block */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>MySQL DDL (Veritabanı & Tablo Oluşturma Kodu)</span>
        </div>
        <pre className="bg-slate-950 p-4 rounded-md border border-slate-800/90 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
          {ddlSql}
        </pre>
      </div>
    </div>
  );
};
