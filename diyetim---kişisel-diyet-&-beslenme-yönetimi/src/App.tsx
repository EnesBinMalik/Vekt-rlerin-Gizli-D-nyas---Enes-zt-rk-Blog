import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DailyTracker } from './components/DailyTracker';
import { DietProgramBuilder } from './components/DietProgramBuilder';
import { RemindersManager } from './components/RemindersManager';
import { FoodLibraryView } from './components/FoodLibraryView';
import { DietReportView } from './components/DietReportView';
import { AlarmAlertModal } from './components/AlarmAlertModal';
import { Footer } from './components/Footer';
import { INITIAL_FOOD_DATABASE } from './data/foodDatabase';
import { SAMPLE_PROGRAMS } from './data/samplePrograms';
import { DEFAULT_REMINDERS, playMealChimeSound, sendDesktopNotification } from './utils/reminderService';
import { generateInitialHistory } from './data/sampleHistory';
import { DailyLogEntry, DietProgram, FoodItem, MealPlanItem, MealReminder, MealType } from './types/diet';

const STORAGE_KEYS = {
  FOOD_DB: 'diyetim_food_db_v1',
  PROGRAMS: 'diyetim_programs_v1',
  ACTIVE_PROG_ID: 'diyetim_active_prog_id_v1',
  REMINDERS: 'diyetim_reminders_v1',
  HISTORY: 'diyetim_history_v1',
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('daily');
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // 1. Food Database
  const [foodDatabase, setFoodDatabase] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOOD_DB);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FOOD_DATABASE;
  });

  // 2. Diet Programs
  const [dietPrograms, setDietPrograms] = useState<DietProgram[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_PROGRAMS;
  });

  // 3. Active Program ID
  const [activeProgramId, setActiveProgramId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROG_ID);
      if (saved) return saved;
    } catch {}
    return SAMPLE_PROGRAMS[0].id;
  });

  // 4. Reminders
  const [reminders, setReminders] = useState<MealReminder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REMINDERS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_REMINDERS;
  });

  // 5. Daily History Logs
  const [historyLogs, setHistoryLogs] = useState<DailyLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return generateInitialHistory();
  });

  // 6. Active Triggered Reminder Modal State
  const [triggeredReminder, setTriggeredReminder] = useState<MealReminder | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOOD_DB, JSON.stringify(foodDatabase));
  }, [foodDatabase]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(dietPrograms));
  }, [dietPrograms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROG_ID, activeProgramId);
  }, [activeProgramId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(historyLogs));
  }, [historyLogs]);

  // Active program object
  const activeProgram = useMemo(() => {
    return dietPrograms.find(p => p.id === activeProgramId) || dietPrograms[0] || SAMPLE_PROGRAMS[0];
  }, [dietPrograms, activeProgramId]);

  // Current log for selected date (create empty day structure if not exist)
  const currentLog = useMemo(() => {
    const existing = historyLogs.find(l => l.date === selectedDate);
    if (existing) return existing;

    const newEmptyLog: DailyLogEntry = {
      id: `log_${selectedDate}`,
      date: selectedDate,
      meals: {
        breakfast: [],
        morning_snack: [],
        lunch: [],
        afternoon_snack: [],
        dinner: [],
        night_snack: [],
      },
      waterGlasses: 0,
      notes: '',
    };
    return newEmptyLog;
  }, [historyLogs, selectedDate]);

  // Update current day log
  const handleUpdateCurrentLog = useCallback((updated: DailyLogEntry) => {
    setHistoryLogs(prev => {
      const index = prev.findIndex(l => l.date === updated.date);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = updated;
        return copy;
      } else {
        return [updated, ...prev];
      }
    });
  }, []);

  // Meal Alarm Clock Engine
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentDayIndex = now.getDay(); // 0 is Sun, 1 is Mon...
      const todayDateStr = now.toISOString().split('T')[0];

      reminders.forEach(rem => {
        if (
          rem.isEnabled &&
          rem.time === currentTimeStr &&
          rem.days.includes(currentDayIndex) &&
          rem.lastTriggeredDate !== todayDateStr
        ) {
          // Play sound
          if (rem.soundEnabled) {
            playMealChimeSound();
          }

          // Desktop notification
          sendDesktopNotification(rem.title, rem.message);

          // Pop in-app alert modal
          setTriggeredReminder(rem);

          // Mark as triggered today to avoid double fire
          setReminders(prev =>
            prev.map(r => (r.id === rem.id ? { ...r, lastTriggeredDate: todayDateStr } : r))
          );
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [reminders]);

  // Reminder Management Handlers
  const handleToggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, isEnabled: !r.isEnabled } : r))
    );
  };

  const handleUpdateReminder = (updated: MealReminder) => {
    setReminders(prev =>
      prev.map(r => (r.id === updated.id ? updated : r))
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleAddReminder = (newReminder: MealReminder) => {
    setReminders(prev => [...prev, newReminder]);
  };

  const handleTestTriggerAlarm = (reminder: MealReminder) => {
    if (reminder.soundEnabled) {
      playMealChimeSound();
    }
    sendDesktopNotification(reminder.title, reminder.message);
    setTriggeredReminder(reminder);
  };

  // Program Management Handlers
  const handleSaveProgram = (program: DietProgram) => {
    setDietPrograms(prev => {
      const exists = prev.some(p => p.id === program.id);
      if (exists) {
        return prev.map(p => (p.id === program.id ? program : p));
      }
      return [...prev, program];
    });
  };

  const handleDeleteProgram = (programId: string) => {
    setDietPrograms(prev => prev.filter(p => p.id !== programId));
    if (activeProgramId === programId) {
      setActiveProgramId(SAMPLE_PROGRAMS[0].id);
    }
  };

  // Transfer meal to today's log
  const handleTransferMealToToday = (mealType: MealType, items: MealPlanItem[]) => {
    const existingItems = currentLog.meals[mealType] || [];
    const clonedItems = items.map(it => ({
      ...it,
      id: `logged_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    }));

    handleUpdateCurrentLog({
      ...currentLog,
      meals: {
        ...currentLog.meals,
        [mealType]: [...existingItems, ...clonedItems],
      },
    });

    setCurrentTab('daily');
  };

  // Food Library Handlers
  const handleAddNewCustomFood = (food: FoodItem) => {
    setFoodDatabase(prev => [food, ...prev]);
  };

  const handleAddFoodToToday = (item: MealPlanItem, meal: MealType) => {
    const existing = currentLog.meals[meal] || [];
    handleUpdateCurrentLog({
      ...currentLog,
      meals: {
        ...currentLog.meals,
        [meal]: [...existing, item],
      },
    });
  };

  // Export / Reset Data
  const handleExportData = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      authorSignature: 'Enes Öztürk',
      activeProgramId,
      dietPrograms,
      reminders,
      historyLogs,
      customFoods: foodDatabase.filter(f => f.isCustom),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diyetim_yedek_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (window.confirm('Tüm verileriniz varsayılan örnek verilere sıfırlanacaktır. Onaylıyor musunuz?')) {
      localStorage.clear();
      setFoodDatabase(INITIAL_FOOD_DATABASE);
      setDietPrograms(SAMPLE_PROGRAMS);
      setActiveProgramId(SAMPLE_PROGRAMS[0].id);
      setReminders(DEFAULT_REMINDERS);
      setHistoryLogs(generateInitialHistory());
      setSelectedDate(todayStr);
    }
  };

  const activeRemindersCount = reminders.filter(r => r.isEnabled).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeRemindersCount={activeRemindersCount}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'daily' && (
          <DailyTracker
            currentLog={currentLog}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onUpdateCurrentLog={handleUpdateCurrentLog}
            activeProgram={activeProgram}
            foodDatabase={foodDatabase}
            onAddNewCustomFood={handleAddNewCustomFood}
          />
        )}

        {currentTab === 'programs' && (
          <DietProgramBuilder
            programs={dietPrograms}
            activeProgramId={activeProgramId}
            onSelectActiveProgram={setActiveProgramId}
            onSaveProgram={handleSaveProgram}
            onDeleteProgram={handleDeleteProgram}
            foodDatabase={foodDatabase}
            onAddNewCustomFood={handleAddNewCustomFood}
            onTransferMealToToday={handleTransferMealToToday}
          />
        )}

        {currentTab === 'reminders' && (
          <RemindersManager
            reminders={reminders}
            onToggleReminder={handleToggleReminder}
            onUpdateReminder={handleUpdateReminder}
            onDeleteReminder={handleDeleteReminder}
            onAddReminder={handleAddReminder}
            onTestTriggerAlarm={handleTestTriggerAlarm}
          />
        )}

        {currentTab === 'library' && (
          <FoodLibraryView
            foodDatabase={foodDatabase}
            onAddNewCustomFood={handleAddNewCustomFood}
            onAddFoodToToday={handleAddFoodToToday}
          />
        )}

        {currentTab === 'report' && (
          <DietReportView logs={historyLogs} activeProgram={activeProgram} />
        )}
      </main>

      {/* Realtime Alarm Notification Popup Modal */}
      <AlarmAlertModal
        reminder={triggeredReminder}
        onClose={() => setTriggeredReminder(null)}
        onGoToMeal={mealType => {
          setCurrentTab('daily');
        }}
      />

      {/* Application Footer */}
      <Footer onExportData={handleExportData} onResetData={handleResetData} />
    </div>
  );
}
