import React, { useState } from 'react';
import { Bell, Plus, Trash2, Edit2, Volume2, VolumeX, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { MealReminder, MealType } from '../types/diet';
import { MEAL_LABELS } from '../data/foodDatabase';
import { playMealChimeSound, requestNotificationPermission, sendDesktopNotification } from '../utils/reminderService';

interface RemindersManagerProps {
  reminders: MealReminder[];
  onToggleReminder: (id: string) => void;
  onUpdateReminder: (updated: MealReminder) => void;
  onDeleteReminder: (id: string) => void;
  onAddReminder: (reminder: MealReminder) => void;
  onTestTriggerAlarm: (reminder: MealReminder) => void;
}

export const RemindersManager: React.FC<RemindersManagerProps> = ({
  reminders,
  onToggleReminder,
  onUpdateReminder,
  onDeleteReminder,
  onAddReminder,
  onTestTriggerAlarm,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTime, setEditTime] = useState('12:00');
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');

  // New Reminder State
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMealType, setNewMealType] = useState<MealType>('morning_snack');
  const [newTitle, setNewTitle] = useState('Su & Ara Öğün Hatırlatıcısı');
  const [newTime, setNewTime] = useState('15:00');
  const [newMessage, setNewMessage] = useState('1 bardak su için ve sağlıklı ara öğününüzü alın.');

  const [notificationStatus, setNotificationStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setNotificationStatus(res);
    if (res === 'granted') {
      sendDesktopNotification('Bildirimler Aktif!', 'Yemek ve su hatırlatıcılarınız zamanı geldiğinde masaüstünüze iletilecektir.');
      playMealChimeSound();
    }
  };

  const startEdit = (rem: MealReminder) => {
    setEditingId(rem.id);
    setEditTime(rem.time);
    setEditTitle(rem.title);
    setEditMessage(rem.message);
  };

  const saveEdit = (id: string) => {
    const existing = reminders.find(r => r.id === id);
    if (!existing) return;
    onUpdateReminder({
      ...existing,
      time: editTime,
      title: editTitle,
      message: editMessage,
    });
    setEditingId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newRem: MealReminder = {
      id: `custom_rem_${Date.now()}`,
      mealType: newMealType,
      title: newTitle.trim(),
      time: newTime,
      isEnabled: true,
      days: [0, 1, 2, 3, 4, 5, 6],
      soundEnabled: true,
      message: newMessage.trim(),
    };
    onAddReminder(newRem);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Notification Permissions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
            <Bell className="w-4 h-4" />
            Otomatik Beslenme & Su Hatırlatıcıları
          </div>
          <h2 className="text-xl font-bold text-slate-900">Yemek Alarmları & Hatırlatma Yönetimi</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Düzenli beslenme metabolizma hızınızı dengede tutar. Vakti geldiğinde akustik zil sesi ve tarayıcı bildirimi ile öğünlerinizi asla kaçırmazsınız.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {notificationStatus !== 'granted' ? (
            <button
              onClick={handleRequestPermission}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              Masaüstü Bildirimlerine İzin Ver
            </button>
          ) : (
            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl border border-emerald-200 inline-flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Bildirimler Aktif
            </div>
          )}

          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Yeni Alarm Kur
          </button>
        </div>
      </div>

      {/* New Alarm Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateNew}
          className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Yeni Yemek veya Su Hatırlatıcısı Oluştur
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              İptal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Alarm Saati (24s) *</label>
              <input
                type="time"
                required
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Öğün Kategorisi</label>
              <select
                value={newMealType}
                onChange={e => setNewMealType(e.target.value as MealType)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              >
                {Object.entries(MEAL_LABELS).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Alarm Başlığı *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Örn: 2. İkindi Ara Öğünü"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Hatırlatma Mesajı</label>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Vakti geldiğinde ekranda görünecek motive edici not"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              Alarmı Kaydet & Aktifleştir
            </button>
          </div>
        </form>
      )}

      {/* Alarms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map(rem => {
          const isEditing = editingId === rem.id;

          return (
            <div
              key={rem.id}
              className={`p-5 rounded-2xl border transition-all ${
                rem.isEnabled
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-slate-50 border-slate-200/80 opacity-70'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Saat</label>
                    <input
                      type="time"
                      value={editTime}
                      onChange={e => setEditTime(e.target.value)}
                      className="w-full px-3 py-1.5 text-base font-mono font-bold border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Başlık</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Mesaj</label>
                    <textarea
                      rows={2}
                      value={editMessage}
                      onChange={e => setEditMessage(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      İptal
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEdit(rem.id)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {MEAL_LABELS[rem.mealType]?.title || 'Öğün'}
                      </span>
                      {/* Active Toggle Switch */}
                      <button
                        onClick={() => onToggleReminder(rem.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          rem.isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                        title={rem.isEnabled ? 'Alarmı Kapat' : 'Alarmı Aç'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            rem.isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-baseline justify-between mt-1">
                      <h4 className="text-base font-bold text-slate-900">{rem.title}</h4>
                      <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                        {rem.time}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {rem.message}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onUpdateReminder({
                            ...rem,
                            soundEnabled: !rem.soundEnabled,
                          });
                        }}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          rem.soundEnabled
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
                        }`}
                        title={rem.soundEnabled ? 'Zil Sesini Kapat' : 'Zil Sesini Aç'}
                      >
                        {rem.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onTestTriggerAlarm(rem)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
                        title="Bu alarmı hemen dinle ve test et"
                      >
                        Test Et
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(rem)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Alarm Saatini Güncelle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteReminder(rem.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Alarmı Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
