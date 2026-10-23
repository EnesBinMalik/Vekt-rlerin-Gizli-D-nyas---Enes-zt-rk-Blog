import React, { useState, useMemo } from 'react';
import { JoinType } from '../types/sql';
import { VennDiagram } from './VennDiagram';
import {
  initialCities,
  initialCountries,
  initialCustomers,
  initialPayments,
  initialRentals,
} from '../data/dvdrentalData';
import { ArrowRight, Play, SlidersHorizontal, Sparkles } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [selectedScenarioPreset, setSelectedScenarioPreset] = useState<'city_country' | 'customer_payment' | 'customer_rental'>('city_country');
  const [selectedJoinType, setSelectedJoinType] = useState<JoinType>('LEFT JOIN');

  // Compute live result
  const liveResult = useMemo(() => {
    if (selectedScenarioPreset === 'city_country') {
      const countryMap = new Map<number, string>();
      const visitedCountryIds = new Set<number>();
      initialCountries.forEach((c) => countryMap.set(c.country_id, c.country));

      const rows: Record<string, any>[] = [];

      initialCities.forEach((city) => {
        const hasCountry = city.country_id !== null && countryMap.has(city.country_id);
        const countryName = hasCountry ? countryMap.get(city.country_id!) : null;
        if (hasCountry && city.country_id) {
          visitedCountryIds.add(city.country_id);
        }

        if (selectedJoinType === 'INNER JOIN') {
          if (hasCountry) {
            rows.push({ city: city.city, country: countryName, status: 'Eşleşen' });
          }
        } else if (selectedJoinType === 'LEFT JOIN') {
          rows.push({
            city: city.city,
            country: countryName,
            status: hasCountry ? 'Eşleşen' : 'Yalnızca Şehir (Ülke NULL)',
          });
        } else if (selectedJoinType === 'RIGHT JOIN') {
          if (hasCountry) {
            rows.push({ city: city.city, country: countryName, status: 'Eşleşen' });
          }
        } else if (selectedJoinType === 'FULL JOIN') {
          rows.push({
            city: city.city,
            country: countryName,
            status: hasCountry ? 'Eşleşen' : 'Yalnızca Şehir (Ülke NULL)',
          });
        }
      });

      // RIGHT JOIN or FULL JOIN: add countries without matching city
      if (selectedJoinType === 'RIGHT JOIN' || selectedJoinType === 'FULL JOIN') {
        initialCountries.forEach((country) => {
          if (!visitedCountryIds.has(country.country_id)) {
            rows.push({
              city: null,
              country: country.country,
              status: 'Yalnızca Ülke (Şehir NULL)',
            });
          }
        });
      }

      return {
        leftTable: 'city',
        rightTable: 'country',
        onClause: 'city.country_id = country.country_id',
        columns: ['city', 'country'],
        rows,
      };
    } else if (selectedScenarioPreset === 'customer_payment') {
      const customerMap = new Map<number, { first_name: string; last_name: string }>();
      const visitedCustomerIds = new Set<number>();
      initialCustomers.forEach((c) => {
        customerMap.set(c.customer_id, { first_name: c.first_name, last_name: c.last_name });
      });

      const rows: Record<string, any>[] = [];

      initialPayments.forEach((p) => {
        const hasCustomer = p.customer_id !== null && customerMap.has(p.customer_id);
        const customer = hasCustomer ? customerMap.get(p.customer_id!) : null;
        if (hasCustomer && p.customer_id) {
          visitedCustomerIds.add(p.customer_id);
        }

        if (selectedJoinType === 'INNER JOIN') {
          if (hasCustomer && customer) {
            rows.push({
              payment_id: p.payment_id,
              first_name: customer.first_name,
              last_name: customer.last_name,
              status: 'Eşleşen',
            });
          }
        } else if (selectedJoinType === 'RIGHT JOIN') {
          rows.push({
            payment_id: p.payment_id,
            first_name: customer ? customer.first_name : null,
            last_name: customer ? customer.last_name : null,
            status: customer ? 'Eşleşen' : 'Yalnızca Ödeme (Müşteri NULL)',
          });
        } else if (selectedJoinType === 'LEFT JOIN') {
          // In customer LEFT JOIN payment, all customers are kept
          // But in our preset select we show payment_id, first_name, last_name
          if (hasCustomer && customer) {
            rows.push({
              payment_id: p.payment_id,
              first_name: customer.first_name,
              last_name: customer.last_name,
              status: 'Eşleşen',
            });
          }
        } else if (selectedJoinType === 'FULL JOIN') {
          rows.push({
            payment_id: p.payment_id,
            first_name: customer ? customer.first_name : null,
            last_name: customer ? customer.last_name : null,
            status: customer ? 'Eşleşen' : 'Yalnızca Ödeme (Müşteri NULL)',
          });
        }
      });

      // Add customers without payment for LEFT and FULL
      if (selectedJoinType === 'LEFT JOIN' || selectedJoinType === 'FULL JOIN') {
        initialCustomers.forEach((c) => {
          if (!visitedCustomerIds.has(c.customer_id)) {
            rows.push({
              payment_id: null,
              first_name: c.first_name,
              last_name: c.last_name,
              status: 'Yalnızca Müşteri (Ödeme NULL)',
            });
          }
        });
      }

      return {
        leftTable: 'customer',
        rightTable: 'payment',
        onClause: 'customer.customer_id = payment.customer_id',
        columns: ['payment_id', 'first_name', 'last_name'],
        rows,
      };
    } else {
      // customer_rental
      const customerMap = new Map<number, { first_name: string; last_name: string }>();
      const visitedCustomerIds = new Set<number>();
      initialCustomers.forEach((c) => {
        customerMap.set(c.customer_id, { first_name: c.first_name, last_name: c.last_name });
      });

      const rows: Record<string, any>[] = [];

      initialRentals.forEach((r) => {
        const hasCustomer = r.customer_id !== null && customerMap.has(r.customer_id);
        const customer = hasCustomer ? customerMap.get(r.customer_id!) : null;
        if (hasCustomer && r.customer_id) {
          visitedCustomerIds.add(r.customer_id);
        }

        if (selectedJoinType === 'INNER JOIN') {
          if (hasCustomer && customer) {
            rows.push({
              rental_id: r.rental_id,
              first_name: customer.first_name,
              last_name: customer.last_name,
              status: 'Eşleşen',
            });
          }
        } else if (selectedJoinType === 'FULL JOIN') {
          rows.push({
            rental_id: r.rental_id,
            first_name: customer ? customer.first_name : null,
            last_name: customer ? customer.last_name : null,
            status: customer ? 'Eşleşen' : 'Yalnızca Kiralama (Müşteri NULL)',
          });
        } else if (selectedJoinType === 'LEFT JOIN') {
          // customer LEFT JOIN rental
          if (hasCustomer && customer) {
            rows.push({
              rental_id: r.rental_id,
              first_name: customer.first_name,
              last_name: customer.last_name,
              status: 'Eşleşen',
            });
          }
        } else if (selectedJoinType === 'RIGHT JOIN') {
          rows.push({
            rental_id: r.rental_id,
            first_name: customer ? customer.first_name : null,
            last_name: customer ? customer.last_name : null,
            status: customer ? 'Eşleşen' : 'Yalnızca Kiralama (Müşteri NULL)',
          });
        }
      });

      if (selectedJoinType === 'LEFT JOIN' || selectedJoinType === 'FULL JOIN') {
        initialCustomers.forEach((c) => {
          if (!visitedCustomerIds.has(c.customer_id)) {
            rows.push({
              rental_id: null,
              first_name: c.first_name,
              last_name: c.last_name,
              status: 'Yalnızca Müşteri (Kiralama NULL)',
            });
          }
        });
      }

      return {
        leftTable: 'customer',
        rightTable: 'rental',
        onClause: 'customer.customer_id = rental.customer_id',
        columns: ['rental_id', 'first_name', 'last_name'],
        rows,
      };
    }
  }, [selectedScenarioPreset, selectedJoinType]);

  const liveSqlQuery = `SELECT \n    ${liveResult.columns.map((c) => `${c}`).join(', ')}\nFROM ${liveResult.leftTable}\n${selectedJoinType} ${liveResult.rightTable}\n    ON ${liveResult.onClause};`;

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">İnteraktif JOIN Simülatörü & Laboratuvarı</h2>
            <p className="text-xs text-slate-400">
              JOIN türünü anında değiştirerek satır sayılarındaki ve NULL değerlerdeki canlı değişimi gözlemleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              1. Veri Seti ve Tablo Çifti Seçin:
            </label>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedScenarioPreset('city_country');
                  setSelectedJoinType('LEFT JOIN');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                  selectedScenarioPreset === 'city_country'
                    ? 'bg-sky-950/70 border-sky-500 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-sky-300">Senaryo 1: city & country</div>
                  <div className="text-[11px] text-slate-400">Şehir ve Ülke Eşleştirmesi</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-sky-900/40 text-sky-300">Özgün: LEFT</span>
              </button>

              <button
                onClick={() => {
                  setSelectedScenarioPreset('customer_payment');
                  setSelectedJoinType('RIGHT JOIN');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                  selectedScenarioPreset === 'customer_payment'
                    ? 'bg-emerald-950/70 border-emerald-500 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-emerald-300">Senaryo 2: customer & payment</div>
                  <div className="text-[11px] text-slate-400">payment_id ile first_name, last_name</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300">Özgün: RIGHT</span>
              </button>

              <button
                onClick={() => {
                  setSelectedScenarioPreset('customer_rental');
                  setSelectedJoinType('FULL JOIN');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                  selectedScenarioPreset === 'customer_rental'
                    ? 'bg-purple-950/70 border-purple-500 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-purple-300">Senaryo 3: customer & rental</div>
                  <div className="text-[11px] text-slate-400">rental_id ile first_name, last_name</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300">Özgün: FULL</span>
              </button>
            </div>
          </div>

          {/* JOIN Type Switcher */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              2. JOIN Türünü Değiştirin ve Farkı Görün:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'] as JoinType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedJoinType(type)}
                  className={`p-3 rounded-xl border text-center font-mono font-bold text-xs transition cursor-pointer ${
                    selectedJoinType === type
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 border-sky-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div>{type}</div>
                  <div className="text-[10px] font-sans font-normal text-slate-300 mt-1">
                    {type === 'LEFT JOIN' && 'Sol tablo korunur'}
                    {type === 'RIGHT JOIN' && 'Sağ tablo korunur'}
                    {type === 'FULL JOIN' && 'Her iki tablo korunur'}
                    {type === 'INNER JOIN' && 'Sadece eşleşenler'}
                  </div>
                </button>
              ))}
            </div>

            {/* Dynamic Generated SQL Preview */}
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto">
              <pre>{liveSqlQuery}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Visual & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Venn Diagram */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Görsel Venn Şeması
            </h3>
            <VennDiagram
              joinType={selectedJoinType}
              leftTableName={liveResult.leftTable}
              rightTableName={liveResult.rightTable}
            />

            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-white">Canlı İstatistikler:</div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dönen Toplam Satır:</span>
                <span className="font-mono text-emerald-400 font-bold">{liveResult.rows.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NULL İçeren Satırlar:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {liveResult.rows.filter((r) => liveResult.columns.some((c) => r[c] === null)).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Canlı Simülasyon Çıktısı</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {liveResult.rows.length} satır
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {liveResult.leftTable} {selectedJoinType} {liveResult.rightTable}
            </span>
          </div>

          <div className="overflow-x-auto max-h-96 scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center text-slate-500">#</th>
                  {liveResult.columns.map((c) => (
                    <th key={c} className="py-2.5 px-4 font-semibold text-slate-200">
                      {c}
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right">Durum Açıklaması</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {liveResult.rows.map((row, idx) => {
                  const hasNull = liveResult.columns.some((c) => row[c] === null);
                  return (
                    <tr key={idx} className={`hover:bg-slate-800/30 transition ${hasNull ? 'bg-amber-950/15' : ''}`}>
                      <td className="py-2 px-3 text-center text-slate-500 font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      {liveResult.columns.map((c) => {
                        const val = row[c];
                        return (
                          <td key={c} className="py-2.5 px-4 font-mono">
                            {val === null ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                                NULL
                              </span>
                            ) : (
                              <span className="text-slate-200">{String(val)}</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="py-2 px-3 text-right text-[11px]">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                            row.status.includes('Eşleşen')
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                              : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
