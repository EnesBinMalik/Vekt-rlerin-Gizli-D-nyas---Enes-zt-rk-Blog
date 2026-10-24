import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameSettings,
  GameResult,
  Question,
  UserAnswerRecord,
  PlayerStats,
} from './types/trivia';
import { pickQuestions } from './utils/questionPicker';
import {
  getStoredHighScore,
  getStoredStats,
  getStoredHistory,
  saveGameResult,
  getSoundSetting,
  saveSoundSetting,
} from './utils/storage';
import { soundManager } from './utils/audio';
import { generateAITriviaQuestions } from './services/aiTriviaService';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import { StatsModal } from './components/StatsModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Screen views: 'start' | 'playing' | 'result'
  const [currentScreen, setCurrentScreen] = useState<'start' | 'playing' | 'result'>('start');

  // Stats & Persistence
  const [highScore, setHighScore] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    highScore: 0,
    gamesPlayed: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    totalTimeouts: 0,
    bestStreak: 0,
  });
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Default game settings as required by the user:
  // "varsayılan olarak 10 soruluk, doğru yanlış şeklinde bir oyun oluşturulmalıdır"
  const [settings, setSettings] = useState<GameSettings>({
    questionCount: 10,
    questionType: 'true_false',
    difficulty: 'all',
    category: 'all',
    timePerQuestion: 12, // 12 seconds per question
    soundEnabled: true,
  });

  // Gameplay state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreakInGame, setMaxStreakInGame] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(12);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userRecords, setUserRecords] = useState<UserAnswerRecord[]>([]);
  const [latestResult, setLatestResult] = useState<GameResult | null>(null);

  // Modals & AI state
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // References for timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickSecondRef = useRef<number>(12);

  // Initialize data on mount
  useEffect(() => {
    const storedHigh = getStoredHighScore();
    const storedStats = getStoredStats();
    const storedHist = getStoredHistory();
    const soundPref = getSoundSetting();

    setHighScore(storedHigh);
    setPlayerStats(storedStats);
    setGameHistory(storedHist);
    setSoundEnabled(soundPref);
    soundManager.setMuted(!soundPref);
  }, []);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.setMuted(!nextVal);
    saveSoundSetting(nextVal);
  };

  const handleUpdateSettings = (partial: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  // Clear timers helper
  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
  };

  // Start new game
  const handleStartGame = (overrideSettings?: Partial<GameSettings>, customQuestionPool?: Question[]) => {
    clearAllTimers();
    const activeSettings: GameSettings = {
      ...settings,
      ...overrideSettings,
    };
    setSettings(activeSettings);

    const selectedQuestions = customQuestionPool || pickQuestions(activeSettings);

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreakInGame(0);
    setUserRecords([]);
    setLatestResult(null);
    setCurrentScreen('playing');

    // Start first question
    prepareQuestion(0, activeSettings.timePerQuestion || 12);
  };

  // Start with AI-generated questions
  const handleStartAIGame = async (topic: string) => {
    setIsLoadingAI(true);
    try {
      const generated = await generateAITriviaQuestions(topic, settings);
      setIsLoadingAI(false);
      handleStartGame({ customTopic: topic }, generated);
    } catch (err) {
      setIsLoadingAI(false);
      throw err;
    }
  };

  // Setup question and start 12s countdown timer
  const prepareQuestion = (index: number, initialTime: number = 12) => {
    clearAllTimers();
    setIsAnswered(false);
    setTimeRemaining(initialTime);
    lastTickSecondRef.current = Math.ceil(initialTime);

    const startTime = Date.now();
    const durationMs = initialTime * 1000;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingSec = Math.max(0, (durationMs - elapsed) / 1000);
      setTimeRemaining(remainingSec);

      // Play tick audio on last 3 seconds
      const currentSec = Math.ceil(remainingSec);
      if (currentSec <= 3 && currentSec > 0 && currentSec !== lastTickSecondRef.current) {
        lastTickSecondRef.current = currentSec;
        soundManager.playTick(true);
      }

      // Check if time expired
      if (remainingSec <= 0) {
        clearAllTimers();
        handleTimeExpired(index);
      }
    }, 50);
  };

  // When time expires (Süre dolduğunda o soru yanlış olarak belirlenip sonraki soruya geçer)
  const handleTimeExpired = (index: number) => {
    setIsAnswered(true);
    soundManager.playTimeout();

    const currentQ = questions[index];
    if (!currentQ) return;

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      type: currentQ.type,
      userAnswer: null,
      correctAnswer: currentQ.correctAnswer,
      isCorrect: false,
      timedOut: true,
      timeRemaining: 0,
      timeSpent: settings.timePerQuestion || 12,
      pointsEarned: 0,
      explanation: currentQ.explanation,
      category: currentQ.category,
    };

    setUserRecords((prev) => [...prev, record]);
    setStreak(0); // Reset streak on timeout

    // Auto-advance to next question after 2.4 seconds so user can see what the answer was
    autoNextTimerRef.current = setTimeout(() => {
      handleNextQuestion(index);
    }, 2400);
  };

  // User clicked an answer
  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    clearAllTimers();
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const isCorrect = answer === currentQ.correctAnswer;
    const timeSpent = Math.max(0, (settings.timePerQuestion || 12) - timeRemaining);

    let points = 0;
    let nextStreak = streak;

    if (isCorrect) {
      soundManager.playCorrect();
      nextStreak = streak + 1;
      setStreak(nextStreak);
      setMaxStreakInGame((prev) => Math.max(prev, nextStreak));

      // Scoring: 100 base + speed bonus + combo streak
      const basePoints = 100;
      const speedBonus = Math.round(timeRemaining * 10); // up to 120 points
      const streakMultiplier = nextStreak >= 5 ? 3 : nextStreak >= 3 ? 2 : nextStreak >= 2 ? 1.5 : 1;
      points = Math.round((basePoints + speedBonus) * streakMultiplier);

      setScore((prev) => prev + points);
    } else {
      soundManager.playWrong();
      setStreak(0);
    }

    const record: UserAnswerRecord = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      type: currentQ.type,
      userAnswer: answer,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      timedOut: false,
      timeRemaining: Math.round(timeRemaining * 10) / 10,
      timeSpent: Math.round(timeSpent * 10) / 10,
      pointsEarned: points,
      explanation: currentQ.explanation,
      category: currentQ.category,
    };

    setUserRecords((prev) => [...prev, record]);

    // Auto-advance after 2.2 seconds or user can click 'Sonraki Soru'
    autoNextTimerRef.current = setTimeout(() => {
      handleNextQuestion(currentIndex);
    }, 2200);
  };

  // Proceed to next question or conclude game
  const handleNextQuestion = (fromIndex?: number) => {
    clearAllTimers();
    const idx = fromIndex !== undefined ? fromIndex : currentIndex;
    const nextIdx = idx + 1;

    if (nextIdx < questions.length) {
      setCurrentIndex(nextIdx);
      prepareQuestion(nextIdx, settings.timePerQuestion || 12);
    } else {
      finishGame();
    }
  };

  // Conclude game & calculate results
  const finishGame = useCallback(() => {
    clearAllTimers();

    setUserRecords((records) => {
      const totalQ = records.length;
      const correctCount = records.filter((r) => r.isCorrect).length;
      const timeoutCount = records.filter((r) => r.timedOut).length;
      const wrongCount = totalQ - correctCount;
      const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      const totalTimeSpent = records.reduce((acc, curr) => acc + curr.timeSpent, 0);
      const averageTime = totalQ > 0 ? Math.round((totalTimeSpent / totalQ) * 10) / 10 : 0;

      const finalResult: GameResult = {
        id: `game-${Date.now()}`,
        date: new Date().toISOString(),
        score,
        isHighScore: score > highScore,
        totalQuestions: totalQ,
        correctCount,
        wrongCount,
        timeoutCount,
        accuracy,
        totalTimeSpent: Math.round(totalTimeSpent * 10) / 10,
        averageTime,
        bestStreak: maxStreakInGame,
        settings,
        records,
      };

      const { isNewHighScore, updatedStats } = saveGameResult(finalResult);
      if (isNewHighScore) {
        setHighScore(finalResult.score);
      }
      setPlayerStats(updatedStats);
      setGameHistory(getStoredHistory());
      setLatestResult(finalResult);
      setCurrentScreen('result');

      return records;
    });
  }, [score, highScore, maxStreakInGame, settings]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const currentQuestion = questions[currentIndex];
  const currentUserRecord = userRecords[currentIndex] || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        highScore={highScore}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onGoHome={() => {
          clearAllTimers();
          setCurrentScreen('start');
        }}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4">
        {currentScreen === 'start' && (
          <StartScreen
            stats={playerStats}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onStartGame={handleStartGame}
            onStartAIGame={handleStartAIGame}
            isLoadingAI={isLoadingAI}
          />
        )}

        {currentScreen === 'playing' && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            score={score}
            streak={streak}
            timeRemaining={timeRemaining}
            isAnswered={isAnswered}
            userAnswerRecord={currentUserRecord}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={() => handleNextQuestion(currentIndex)}
          />
        )}

        {currentScreen === 'result' && latestResult && (
          <ResultScreen
            result={latestResult}
            highScore={highScore}
            onPlayAgain={() => handleStartGame()}
            onOpenSettings={() => {
              setCurrentScreen('start');
            }}
            onGoHome={() => setCurrentScreen('start')}
          />
        )}
      </main>

      {/* Footer with Enes Öztürk Signature */}
      <Footer />

      {/* Modals */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={playerStats}
        history={gameHistory}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
