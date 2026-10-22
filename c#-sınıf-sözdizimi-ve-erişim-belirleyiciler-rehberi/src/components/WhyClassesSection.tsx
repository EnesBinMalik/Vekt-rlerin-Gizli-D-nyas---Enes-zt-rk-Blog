/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Copy, Sparkles, Plus, Trash2, ArrowRight } from 'lucide-react';

interface SimulatedInstance {
  id: string;
  variableName: string;
  hesapSahibi: string;
  bakiye: number;
  hesapTuru: string;
}

export default function WhyClassesSection() {
  const [activeTab, setActiveTab] = useState<'monolith' | 'modular'>('modular');
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive object instantiation sandbox
  const [instances, setInstances] = useState<SimulatedInstance[]>([
    {
      id: '1',
      variableName: 'hesap1',
      hesapSahibi: 'Ahmet Yılmaz',
      bakiye: 15400,
      hesapTuru: 'Vadesiz TL',
    },
    {
      id: '2',
      variableName: 'hesap2',
      hesapSahibi: 'Zeynep Kaya',
      bakiye: 38200,
      hesapTuru: 'Vadeli Mevduat',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newBakiye, setNewBakiye] = useState(5000);

  const addInstance = () => {
    const ownerName = newName.trim() || `Müşteri ${instances.length + 1}`;
    const newObj: SimulatedInstance = {
      id: Date.now().toString(),
      variableName: `hesap${instances.length + 1}`,
      hesapSahibi: ownerName,
      bakiye: newBakiye,
      hesapTuru: 'Vadesiz TL',
    };
    setInstances([...instances, newObj]);
    setNewName('');
  };

  const removeInstance = (id: string) => {
    if (instances.length <= 1) return;
    setInstances(instances.filter((inst) => inst.id !== id));
  };

  const depositMoney = (id: string, amount: number) => {
    setInstances(
      instances.map((inst) =>
        inst.id === id ? { ...inst, bakiye: inst.bakiye + amount } : inst
      )
    );
  };

  const monolithicCode = `// ❌ KÖTÜ YAKLAŞIM: Her şey tek bir metotta veya tek sınıfta!
// Kod tekrarı yüksek, okunabilirlik zayıf, genişletmesi çok zor.
class Program 
{
    static void Main() 
    {
        // 1. Müşteri verileri
        string musteri1Ad = "Ahmet";
        double musteri1Bakiye = 15000;
        
        // 2. Müşteri verileri (aynı kodlar tekrar ediliyor)
        string musteri2Ad = "Zeynep";
        double musteri2Bakiye = 38000;

        // Para yatırma işlemi doğrudan ana metotta hesaplanıyor
        double yatirilacakTutar = 2000;
        if (yatirilacakTutar > 0) {
            musteri1Bakiye += yatirilacakTutar;
            Console.WriteLine(musteri1Ad + " yeni bakiye: " + musteri1Bakiye);
        }

        // Yeni bir özellik (örn. faiz, transfer) eklenmek istendiğinde
        // Main metodu binlerce satırlık kontrol edilemez bir karmaşaya dönüşür!
    }
}`;

  const modularCode = `// ✅ DOĞRU YAKLAŞIM: Sorumluluklarına göre ayrılmış Sınıflar (OOP)
// Kod tekrarı sıfır, okunabilir, genişletilebilir ve test edilebilir.

public class BankaHesabi 
{
    // 1. Field (Özellik / Durum)
    public string HesapSahibi;
    public double Bakiye;

    // 2. Metot (Davranış)
    public void ParaYatir(double tutar) 
    {
        if (tutar > 0) 
        {
            Bakiye += tutar;
            Console.WriteLine($"{HesapSahibi} hesabına {tutar} TL yatırıldı. Güncel: {Bakiye} TL");
        }
    }
}

class Program 
{
    static void Main() 
    {
        // Kalıptan bağımsız nesneler (instances) türetilir
        BankaHesabi hesap1 = new BankaHesabi();
        hesap1.HesapSahibi = "Ahmet";
        hesap1.ParaYatir(2000);

        BankaHesabi hesap2 = new BankaHesabi();
        hesap2.HesapSahibi = "Zeynep";
        hesap2.ParaYatir(5000);
    }
}`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="neden-sinif" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">
          Temel Kavramlar
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          01. Sınıf Nedir, Neden İhtiyaç Duyarız?
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Sınıflar (Classes), Nesne Yönelimli Programlamanın (OOP) en temel yapı
          taşıdır. C# %100 nesne yönelimli bir dil olduğundan, değişkenler (field)
          ve fonksiyonlar (metot) tek başlarına boşlukta var olamaz; mutlaka bir
          sınıfın çatısı altında toplanırlar.
        </p>
      </div>

      {/* Core Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-3">
            01
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">
            Metotları Parçalara Ayırma Mantığı
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nasıl ki tüm işlemleri tek bir devasa metotta yazmak yerine alt metotlara
            bölmek kod tekrarını önleyip okunabilirliği artırıyorsa; sınıflar da bu
            prensibi bir üst boyuta taşır.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-3">
            02
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">
            Benzer Görevleri Gruplama
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Program geliştirirken bütün metotları tek bir sınıf içine yığmak yerine,
            ortak amaca hizmet eden alan ve metotları tek bir sınıfta toplamak en
            sağlıklı mimari yaklaşımdır.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm mb-3">
            03
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">
            Genişletilebilirlik ve Bakım
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sınıflar sayesinde yeni özellikler eklerken mevcut çalışan kodları
            bozmazsınız. Bir arabaya yeni donanım ekler gibi sistemi güvenle
            büyütebilirsiniz.
          </p>
        </div>
      </div>

      {/* Interactive Architecture Comparison: Monolith vs Modular */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-950/60 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Karşılaştırma:</span>
            <div className="inline-flex p-1 bg-slate-800/80 rounded-lg">
              <button
                onClick={() => setActiveTab('modular')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'modular'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Modüler Sınıf Mimarisi (OOP)
              </button>
              <button
                onClick={() => setActiveTab('monolith')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'monolith'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Spagetti & Monolit Kod
              </button>
            </div>
          </div>

          <button
            onClick={() => handleCopy(activeTab === 'modular' ? modularCode : monolithicCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
          </button>
        </div>

        <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
          <pre className="text-slate-200">
            {activeTab === 'modular' ? modularCode : monolithicCode}
          </pre>
        </div>
      </div>

      {/* Interactive Blueprint vs Instance Simulation */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Canlı Simülasyon
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Sınıf (Kalıp / Blueprint) vs Nesne (Instance) Deneyimi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              <strong className="text-slate-800 font-semibold">BankaHesabi</strong> sınıfı sadece bir kalıptır (hafızada somut veri tutmaz). 
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-indigo-600">new</code> anahtarıyla üretilen her nesne, 
              aynı kuralları ve metotları paylaşırken kendi bağımsız verilerini (Bakiye, İsim) hafızada tutar.
            </p>
          </div>

          {/* New Instance Creator Form */}
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Müşteri Adı..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 w-36 sm:w-44"
            />
            <button
              onClick={addInstance}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>new BankaHesabi()</span>
            </button>
          </div>
        </div>

        {/* Instances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {instances.map((inst, index) => (
            <div
              key={inst.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {inst.variableName}
                    </span>
                    <span className="text-[11px] text-slate-400">Instance #{index + 1}</span>
                  </div>
                  {instances.length > 1 && (
                    <button
                      onClick={() => removeInstance(inst.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Nesneyi Bellekten Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Field (HesapSahibi):</span>
                    <span className="font-semibold text-slate-800">{inst.hesapSahibi}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Field (Bakiye):</span>
                    <span className="font-bold font-mono text-emerald-600 tabular-nums">
                      {inst.bakiye.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kalıp:</span>
                    <span className="font-mono text-slate-600">class BankaHesabi</span>
                  </div>
                </div>
              </div>

              {/* Action: Invoke Method */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-[11px] font-medium text-slate-500 mb-2">
                  Metot Çalıştır: <code className="text-indigo-600 font-mono">ParaYatir(1000)</code>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => depositMoney(inst.id, 1000)}
                    className="flex-1 py-1.5 px-3 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>+1.000 TL Yatır</span>
                  </button>
                  <button
                    onClick={() => depositMoney(inst.id, 5000)}
                    className="py-1.5 px-3 text-xs font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                  >
                    +5.000 TL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
