import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Play,
  RotateCcw,
  StepForward,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Terminal as TerminalIcon,
  Cpu,
  ArrowRight,
  Info
} from 'lucide-react';
import { PRESETS } from '../data/presets';
import { PresetModel, PresetType } from '../types';

export const InteractiveCapsuleLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<PresetType>('person');
  const currentPreset: PresetModel =
    PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  // Object State in Memory
  const [currentFieldValue, setCurrentFieldValue] = useState<any>(
    currentPreset.initialFieldValue
  );

  // Custom input value for Set calls
  const [inputValue, setInputValue] = useState<string>('25');

  // Execution state
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [currentOperation, setCurrentOperation] = useState<
    'idle' | 'direct_field_denied' | 'set_valid' | 'set_invalid' | 'get'
  >('idle');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [logs, setLogs] = useState<
    { id: string; time: string; type: 'info' | 'success' | 'error' | 'warn'; text: string }[]
  >([]);

  // Reset memory when preset changes
  useEffect(() => {
    setCurrentFieldValue(currentPreset.initialFieldValue);
    setActiveStep(0);
    setIsExecuting(false);
    setCurrentOperation('idle');
    setValidationMessage('');
    if (selectedPresetId === 'person') setInputValue('25');
    else if (selectedPresetId === 'ogrenci') setInputValue('Enes Öztürk');
    else if (selectedPresetId === 'bank') setInputValue('250');
    else if (selectedPresetId === 'game') setInputValue('65');

    const initTime = new Date().toLocaleTimeString('tr-TR');
    setLogs([
      {
        id: 'init-' + Date.now(),
        time: initTime,
        type: 'info',
        text: `[C# Runtime] '${currentPreset.title}' örneği bellekte (Heap) oluşturuldu. İlk değer: ${currentPreset.initialFieldValue}`,
      },
    ]);
  }, [selectedPresetId]);

  const addLog = (type: 'info' | 'success' | 'error' | 'warn', text: string) => {
    const time = new Date().toLocaleTimeString('tr-TR');
    setLogs((prev) => [{ id: Math.random().toString(), time, type, text }, ...prev.slice(0, 19)]);
  };

  // 1. Attempt Direct Field Access (Illustrates the compile-time barrier)
  const handleDirectFieldAccess = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveStep(1);
    setCurrentOperation('direct_field_denied');
    setValidationMessage(
      `Derleme Hatası (CS0122): '${currentPreset.title.split(' ')[0]}.${currentPreset.fieldName}' private erişim belirtecine sahip olduğu için sınıf dışından erişilemez!`
    );

    addLog(
      'error',
      `CS0122 Hatası: ${currentPreset.title.split(' ')[0]}.${currentPreset.fieldName} doğrudan değiştirilemez! Private koruma kalkanı devrede.`
    );

    setTimeout(() => {
      setIsExecuting(false);
    }, 1200);
  };

  // 2. Property Set Invocation (with validation)
  const handlePropertySet = (valToAssign: any) => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveStep(1);

    const validationResult = currentPreset.validate(valToAssign);

    if (currentPreset.id === 'bank' && valToAssign === 'direct_assign') {
      setCurrentOperation('set_invalid');
      setValidationMessage("Hata: 'Balance' yalnızca 'get' erişimcisine sahiptir (Salt-Okunur).");
      addLog('error', `BankaHesabi.Balance = ... ataması yapılamaz! (Read-only property)`);
      setTimeout(() => setIsExecuting(false), 1200);
      return;
    }

    addLog(
      'info',
      `[Çağrı] ${currentPreset.title.split(' ')[0]}.${currentPreset.propertyName} = ${valToAssign}; çağrıldı. Değer 'value' parametresine aktarılıyor...`
    );

    // Step 1: Flow into property
    setTimeout(() => {
      setActiveStep(2); // Guard check

      setTimeout(() => {
        if (validationResult.success) {
          // Success: write to memory
          setActiveStep(3);
          setCurrentOperation('set_valid');
          setCurrentFieldValue(validationResult.transformedVal);
          setValidationMessage(`Koşul sağlandı! 'value' (${valToAssign}) başarıyla private '${currentPreset.fieldName}' alanına yazıldı.`);
          addLog(
            'success',
            `[Atama Başarılı] private ${currentPreset.fieldName} = ${validationResult.transformedVal}; olarak güncellendi.`
          );
        } else {
          // Rejected: field kept intact
          setActiveStep(3);
          setCurrentOperation('set_invalid');
          setValidationMessage(validationResult.errorReason || 'Koşul sağlanamadığı için atama iptal edildi.');
          addLog(
            'warn',
            `[Güvenlik Engeli] ${validationResult.errorReason || 'Geçersiz değer!'} Değer yazılmadı, eski değer (${currentFieldValue}) korundu.`
          );
        }
        setIsExecuting(false);
      }, 700);
    }, 600);
  };

  // 3. Property Get Invocation
  const handlePropertyGet = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveStep(1);
    setCurrentOperation('get');

    addLog(
      'info',
      `[Çağrı] var sonuc = ${currentPreset.title.split(' ')[0]}.${currentPreset.propertyName}; (get erişimcisi tetiklendi)`
    );

    setTimeout(() => {
      setActiveStep(2); // Reading from private memory
      setTimeout(() => {
        setActiveStep(3);
        setValidationMessage(`'get' bloğu çalıştı: 'return ${currentPreset.fieldName};' çağrısıyla ${currentFieldValue} değeri dış dünyaya güvenle iletildi.`);
        addLog(
          'success',
          `[Çıktı / Konsol] ${currentPreset.title.split(' ')[0]}.${currentPreset.propertyName} -> ${currentFieldValue}`
        );
        setIsExecuting(false);
      }, 600);
    }, 500);
  };

  const handleReset = () => {
    setCurrentFieldValue(currentPreset.initialFieldValue);
    setActiveStep(0);
    setIsExecuting(false);
    setCurrentOperation('idle');
    setValidationMessage('');
    addLog('info', `Bellek sıfırlandı. İlk değer: ${currentPreset.initialFieldValue}`);
  };

  return (
    <section id="lab" className="py-16 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <span>CANLI İNTERAKTİF DENEY LABORATUVARI</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Enes Öztürk İmzasıyla</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Kapsülleme (Encapsulation) Simülatörü
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              C# nesnesinin koruma duvarını, private field belleğini ve public property (get/set)
              doğrulama filtrelerini adım adım canlı olarak test edin.
            </p>
          </div>

          {/* Preset Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedPresetId === preset.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {preset.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Preset Info Banner */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <span>Aktif Sınıf: {currentPreset.title}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentPreset.subtitle}</p>
              <div className="mt-1 text-xs font-mono text-indigo-300">
                Kural / Filtre: <span className="text-slate-200">{currentPreset.validationDescription}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Belleği Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Simulation Stage: 3-Column Visual Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Caller / Dış Dünya (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-4">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <TerminalIcon className="w-4 h-4 text-indigo-400" />
                  1. Dış Dünya (Caller / Main)
                </span>
                <span className="font-mono text-[11px] text-slate-500">Program.cs</span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Diğer sınıflar veya <code className="text-indigo-300 font-mono">Main()</code> metodu nesneye yalnızca izin verilen kanallardan erişebilir.
              </p>

              {/* Action 1: Direct Field Access (Failure Demo) */}
              <div className="mb-4 p-3 rounded-xl bg-rose-950/20 border border-rose-900/40">
                <div className="flex items-center justify-between text-xs font-medium text-rose-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Doğrudan Field Erişimi Dene
                  </span>
                  <span className="font-mono text-[10px] text-rose-400">YASAK</span>
                </div>
                <div className="font-mono text-xs text-slate-300 mb-2.5 bg-slate-950/80 p-2 rounded border border-rose-950">
                  nesne.{currentPreset.fieldName} = -5;
                </div>
                <button
                  onClick={handleDirectFieldAccess}
                  disabled={isExecuting}
                  className="w-full py-2 text-xs font-semibold text-rose-200 bg-rose-900/40 hover:bg-rose-900/70 border border-rose-800/50 rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Korumasız Atama Girişimi (CS0122)</span>
                </button>
              </div>

              {/* Action 2: Controlled Property Set */}
              <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-medium text-indigo-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Property Set İle Değer Ata
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">KONTROLLÜ</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-slate-400 whitespace-nowrap">
                    .{currentPreset.propertyName} =
                  </span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Değer..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handlePropertySet(inputValue)}
                    disabled={isExecuting}
                    className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Ata</span>
                  </button>
                </div>

                {/* Preset Fast Click buttons */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Örnek Değerler:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPreset.testOptions.validExamples.map((ex, idx) => (
                      <button
                        key={'val-' + idx}
                        onClick={() => {
                          setInputValue(String(ex.value));
                          handlePropertySet(ex.value);
                        }}
                        disabled={isExecuting}
                        className="px-2 py-1 text-[11px] font-mono text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 rounded transition-colors disabled:opacity-50"
                        title={ex.explanation}
                      >
                        ✓ {ex.label}
                      </button>
                    ))}
                    {currentPreset.testOptions.invalidExamples.map((ex, idx) => (
                      <button
                        key={'inval-' + idx}
                        onClick={() => {
                          setInputValue(String(ex.value));
                          handlePropertySet(ex.value);
                        }}
                        disabled={isExecuting}
                        className="px-2 py-1 text-[11px] font-mono text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded transition-colors disabled:opacity-50"
                        title={ex.explanation}
                      >
                        ✗ {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action 3: Controlled Property Get */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Unlock className="w-3.5 h-3.5 text-amber-400" />
                    Property GET İle Değer Oku
                  </span>
                  <span className="font-mono text-[10px] text-indigo-400">GÜVENLİ OKUMA</span>
                </div>
                <div className="font-mono text-xs text-slate-400 mb-2 bg-slate-950/90 p-2 rounded border border-slate-800">
                  Console.WriteLine(nesne.{currentPreset.propertyName});
                </div>
                <button
                  onClick={handlePropertyGet}
                  disabled={isExecuting}
                  className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Değeri Oku (GET Çağrısı)</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Dış sınıflar belleğe doğrudan yazamaz. Tüm trafik Property kapısından geçer.
            </div>
          </div>

          {/* Column 2: Public Property Gateway / Sınıf Kalkanı (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-4">
                <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  2. Kapsül Kapısı (Public Property)
                </span>
                <span className="font-mono text-[11px] text-indigo-400">
                  {currentPreset.propertyName}
                </span>
              </div>

              {/* Live Flow State Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Çalışma Aşaması:</span>
                  <span className="font-mono font-semibold text-indigo-300">
                    {activeStep === 0 && 'Beklemede (Idle)'}
                    {activeStep === 1 && 'Değer Geldi (Transfer)'}
                    {activeStep === 2 && 'Koşul İnceleniyor (Filtre)'}
                    {activeStep === 3 && (currentOperation === 'set_valid' ? 'Kabul Edildi' : currentOperation === 'set_invalid' ? 'Reddedildi' : 'Okundu')}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentOperation === 'set_invalid' || currentOperation === 'direct_field_denied'
                        ? 'bg-rose-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${(activeStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Code Guard Window */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 mb-4">
                <div className="text-slate-500 text-[11px]">
                  // {currentPreset.propertyName} Property Gövdesi
                </div>
                
                {/* SET block */}
                <div
                  className={`p-2.5 rounded-lg border transition-all ${
                    activeStep >= 1 && currentOperation.startsWith('set')
                      ? 'bg-indigo-950/60 border-indigo-500 text-slate-100 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-indigo-300 mb-1">
                    set &#123;
                  </div>
                  <div className="pl-3 text-[11px] space-y-1">
                    <div className="text-slate-300">
                      {currentPreset.id === 'person' && (
                        <>
                          <span className="text-purple-400">if</span> (value &gt; 0)
                          <div className="pl-3 text-emerald-400">
                            {currentPreset.fieldName} = value;
                          </div>
                        </>
                      )}
                      {currentPreset.id === 'ogrenci' && (
                        <>
                          <span className="text-purple-400">if</span> (!string.IsNullOrWhiteSpace(value))
                          <div className="pl-3 text-emerald-400">
                            {currentPreset.fieldName} = value.Trim();
                          </div>
                        </>
                      )}
                      {currentPreset.id === 'bank' && (
                        <div className="text-rose-400 italic">
                          // set bloğu YOK! Sadece get tanımlı.
                        </div>
                      )}
                      {currentPreset.id === 'game' && (
                        <>
                          <div className="text-slate-400">{currentPreset.fieldName} = Math.Clamp(value, 0, 100);</div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="font-semibold text-indigo-300 mt-1">&#125;</div>
                </div>

                {/* GET block */}
                <div
                  className={`p-2.5 rounded-lg border transition-all ${
                    activeStep >= 1 && currentOperation === 'get'
                      ? 'bg-amber-950/50 border-amber-500 text-slate-100 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-amber-300 mb-1">
                    get &#123;
                  </div>
                  <div className="pl-3 text-[11px] text-slate-300">
                    <span className="text-purple-400">return</span> {currentPreset.fieldName};
                  </div>
                  <div className="font-semibold text-amber-300 mt-1">&#125;</div>
                </div>
              </div>

              {/* Status explanation alert */}
              {validationMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${
                    currentOperation === 'set_valid'
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : currentOperation === 'get'
                      ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  {currentOperation === 'set_valid' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : currentOperation === 'get' ? (
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{validationMessage}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-400">Enes Öztürk Kuralı:</span> &ldquo;Property bir bekçidir; hatalı veriyi içeri sokmaz, doğru veriyi biçimlendirir.&rdquo;
            </div>
          </div>

          {/* Column 3: The Vault Core / Private Field Bellek (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-4">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  3. Gizli Çekirdek (Private Field)
                </span>
                <span className="font-mono text-[11px] text-slate-500">RAM / Heap</span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Bellek hücresi yalnızca sınıf içindeki metot ve property tarafından okunup yazılabilir.
              </p>

              {/* Memory Cell Graphic */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden mb-5">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
                  0x7FFE9B40
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs text-slate-400 mb-1">
                  private {currentPreset.fieldType} {currentPreset.fieldName};
                </div>
                <div
                  className={`text-2xl font-bold font-mono transition-all duration-300 ${
                    currentOperation === 'set_valid'
                      ? 'text-emerald-400 scale-110'
                      : 'text-amber-400'
                  }`}
                >
                  {String(currentFieldValue)}
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Durum: Güvenli & Korumalı
                </div>
              </div>

              {/* Field vs Property Quick Comparison Card */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider">
                  Neden Doğrudan Field Erişimi Sakıncalıdır?
                </div>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>Doğrudan public field yapılırsa dışarıdan <code className="text-rose-300">p.age = -1000</code> yazılabilir.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>İş kuralları (validation) işletilemez, nesne bozuk durumda kalır.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Kapsülleme sayesinde veri güvenliği nesnenin kendi kontrolündedir.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Erişim Tipi: <strong>Private</strong></span>
              <span>Tür: <strong>{currentPreset.fieldType}</strong></span>
            </div>
          </div>
        </div>

        {/* Live Execution Console / Terminal Log */}
        <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-300">
                C# Çalışma Zamanı Konsolu (Enes Öztürk Lab Trace)
              </span>
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              Konsolu Temizle
            </button>
          </div>

          <div className="p-4 font-mono text-xs max-h-56 overflow-y-auto space-y-2">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic">Konsol boş. Yukarıdaki butonlarla simülasyonu başlatın.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-slate-600 select-none tabular-nums">[{log.time}]</span>
                  <span
                    className={
                      log.type === 'error'
                        ? 'text-rose-400 font-semibold'
                        : log.type === 'warn'
                        ? 'text-amber-400 font-semibold'
                        : log.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-slate-300'
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
