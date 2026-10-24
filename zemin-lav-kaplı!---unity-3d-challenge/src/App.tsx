import React, { useState, useEffect, useCallback } from 'react';
import {
  PRESET_LEVELS,
  INITIAL_COMMUNITY_SUBMISSIONS,
} from './data/presetLevels';
import {
  GameObjectConfig,
  LevelData,
  ObjectType,
  CommunitySubmission,
} from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { UnityTopNav } from './components/UnityTopNav';
import { UnityHierarchy } from './components/UnityHierarchy';
import { UnityInspector } from './components/UnityInspector';
import { UnityBottomDock } from './components/UnityBottomDock';
import { GameHUD } from './components/GameHUD';
import { GuideModal } from './components/GuideModal';
import { SubmitModal } from './components/SubmitModal';
import { CommunityGalleryModal } from './components/CommunityGalleryModal';
import { CertificateModal } from './components/CertificateModal';
import { PhysicsControls } from './physics/ballPhysics';
import { soundManager } from './audio/soundManager';

export default function App() {
  // 1. Level & Scene Objects State
  const [levels, setLevels] = useState<LevelData[]>(() => {
    const saved = localStorage.getItem('unity_lava_levels');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return PRESET_LEVELS;
  });

  const [currentLevelId, setCurrentLevelId] = useState<string>('enes-championship');
  const activeLevel = levels.find((l) => l.id === currentLevelId) || levels[0];
  const [objects, setObjects] = useState<GameObjectConfig[]>(activeLevel.objects);

  // 2. Selection & Panels State
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [isHierarchyOpen, setIsHierarchyOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // 3. Game Play Mode State
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraMode, setCameraMode] = useState<'follow' | 'orbit' | 'topDown'>('follow');
  const [isLavaDeath, setIsLavaDeath] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [winTime, setWinTime] = useState(0);

  // 4. Modals State
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // 5. Community Submissions State
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>(() => {
    const saved = localStorage.getItem('unity_lava_submissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_COMMUNITY_SUBMISSIONS;
  });

  // 6. Keyboard & Touch Physics Controls State
  const [controlsState, setControlsState] = useState<PhysicsControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  // Sync objects when level changes
  useEffect(() => {
    const lvl = levels.find((l) => l.id === currentLevelId) || levels[0];
    setObjects(lvl.objects);
    setSelectedObjectId(null);
    setIsWon(false);
    setIsLavaDeath(false);
  }, [currentLevelId, levels]);

  // Persist levels & submissions
  useEffect(() => {
    localStorage.setItem('unity_lava_levels', JSON.stringify(levels));
  }, [levels]);

  useEffect(() => {
    localStorage.setItem('unity_lava_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handle Level Selection
  const handleSelectLevel = (levelId: string) => {
    setCurrentLevelId(levelId);
    setIsPlayMode(false);
    soundManager.playClick();
  };

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys if typing in inputs
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setControlsState((prev) => ({ ...prev, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setControlsState((prev) => ({ ...prev, backward: true }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setControlsState((prev) => ({ ...prev, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setControlsState((prev) => ({ ...prev, right: true }));
          break;
        case 'Space':
          e.preventDefault();
          setControlsState((prev) => ({ ...prev, jump: true }));
          break;
        case 'KeyR':
          handleReset();
          break;
        case 'Escape':
          setSelectedObjectId(null);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setControlsState((prev) => ({ ...prev, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          setControlsState((prev) => ({ ...prev, backward: false }));
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setControlsState((prev) => ({ ...prev, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setControlsState((prev) => ({ ...prev, right: false }));
          break;
        case 'Space':
          setControlsState((prev) => ({ ...prev, jump: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Play Mode Toggle
  const handleTogglePlayMode = () => {
    soundManager.playClick();
    setIsPlayMode((prev) => {
      const next = !prev;
      if (next) {
        setCameraMode('follow');
        setSelectedObjectId(null);
        setIsWon(false);
        setIsLavaDeath(false);
      } else {
        setCameraMode('orbit');
      }
      return next;
    });
  };

  const handleTogglePause = () => {
    soundManager.playClick();
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    soundManager.playClick();
    setIsWon(false);
    setIsLavaDeath(false);
    // Trigger reset in canvas
    setObjects([...objects]);
  };

  // Add Primitive Object to Scene
  const handleAddObject = (type: ObjectType) => {
    soundManager.playClick();
    const newId = `${type}-${Date.now().toString().slice(-4)}`;

    // Spawn slightly ahead in the scene
    let lastZ = 5;
    if (objects.length > 0) {
      lastZ = Math.max(...objects.map((o) => o.position.z)) + 4;
    }

    const newObj: GameObjectConfig = {
      id: newId,
      name: `Yeni ${type.toUpperCase()}`,
      type,
      position: { x: 0, y: 3.5, z: lastZ },
      rotation: { x: 0, y: 0, z: 0 },
      scale:
        type === 'cube'
          ? { x: 4, y: 0.6, z: 4 }
          : type === 'ramp'
          ? { x: 3.5, y: 0.5, z: 6 }
          : type === 'cylinder'
          ? { x: 3, y: 0.8, z: 3 }
          : type === 'trampoline'
          ? { x: 3.2, y: 0.4, z: 3.2 }
          : type === 'booster'
          ? { x: 2.5, y: 0.3, z: 4 }
          : type === 'spinner'
          ? { x: 4.5, y: 0.5, z: 0.6 }
          : { x: 3, y: 3, z: 0.5 },
      color:
        type === 'ramp'
          ? '#ea580c'
          : type === 'trampoline'
          ? '#8b5cf6'
          : type === 'booster'
          ? '#06b6d4'
          : '#3b82f6',
      materialTheme:
        type === 'ramp'
          ? 'unity_orange'
          : type === 'trampoline'
          ? 'cyber_blue'
          : 'sci_fi_grid',
      isKinematic: true,
      bounciness: type === 'trampoline' ? 1.6 : 0.1,
      friction: 0.5,
      speed: type === 'spinner' ? 2.5 : undefined,
      boostPower: type === 'booster' ? 12 : undefined,
    };

    const updated = [...objects, newObj];
    setObjects(updated);
    setSelectedObjectId(newId);

    // Update active level data
    setLevels((prev) =>
      prev.map((l) => (l.id === currentLevelId ? { ...l, objects: updated } : l))
    );
  };

  // Delete Object
  const handleDeleteObject = (id: string) => {
    const updated = objects.filter((o) => o.id !== id);
    setObjects(updated);
    if (selectedObjectId === id) {
      setSelectedObjectId(null);
    }
    setLevels((prev) =>
      prev.map((l) => (l.id === currentLevelId ? { ...l, objects: updated } : l))
    );
  };

  // Duplicate Object
  const handleDuplicateObject = (id: string) => {
    const target = objects.find((o) => o.id === id);
    if (!target) return;

    const copyId = `${target.type}-${Date.now().toString().slice(-4)}`;
    const copyObj: GameObjectConfig = {
      ...target,
      id: copyId,
      name: `${target.name} (Kopya)`,
      position: {
        x: target.position.x,
        y: target.position.y,
        z: target.position.z + target.scale.z + 1,
      },
    };

    const updated = [...objects, copyObj];
    setObjects(updated);
    setSelectedObjectId(copyId);
    setLevels((prev) =>
      prev.map((l) => (l.id === currentLevelId ? { ...l, objects: updated } : l))
    );
  };

  // Update Object Config from Inspector
  const handleUpdateObject = (updated: GameObjectConfig) => {
    const newObjects = objects.map((o) => (o.id === updated.id ? updated : o));
    setObjects(newObjects);
    setLevels((prev) =>
      prev.map((l) => (l.id === currentLevelId ? { ...l, objects: newObjects } : l))
    );
  };

  // Game Win / Lava Death Events
  const handleGameWin = useCallback((elapsedTime: number) => {
    setIsWon(true);
    setWinTime(elapsedTime);
  }, []);

  const handleLavaDeath = useCallback(() => {
    setIsLavaDeath(true);
    setTimeout(() => {
      setIsLavaDeath(false);
    }, 1100);
  }, []);

  // Submit Assignment
  const handleSubmitAssignment = (newSub: CommunitySubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  // Like Community Submission
  const handleLikeSubmission = (id: string) => {
    soundManager.playClick();
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s))
    );
  };

  // Load level from Community Gallery
  const handleLoadLevelFromGallery = (levelData: LevelData) => {
    // Check if level already in levels list
    const exists = levels.find((l) => l.id === levelData.id);
    if (!exists) {
      setLevels((prev) => [levelData, ...prev]);
    }
    setCurrentLevelId(levelData.id);
    setObjects(levelData.objects);
    setIsPlayMode(true);
    setCameraMode('follow');
  };

  const selectedObject = objects.find((o) => o.id === selectedObjectId) || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 font-sans select-none">
      {/* 1. Unity Top Navigation Bar */}
      <UnityTopNav
        levels={levels}
        currentLevelId={currentLevelId}
        onSelectLevel={handleSelectLevel}
        isPlayMode={isPlayMode}
        onTogglePlayMode={handleTogglePlayMode}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onReset={handleReset}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenCommunity={() => setIsCommunityOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(soundManager.toggleMute())}
      />

      {/* 2. WebGL 3D Scene Viewport */}
      <ThreeCanvas
        objects={objects}
        ballStartPos={activeLevel.ballStartPos}
        selectedObjectId={selectedObjectId}
        onSelectObject={setSelectedObjectId}
        isPlayMode={isPlayMode}
        isPaused={isPaused}
        onGameWin={handleGameWin}
        onLavaDeath={handleLavaDeath}
        controlsState={controlsState}
        cameraMode={cameraMode}
      />

      {/* 3. Editor Viewport Panels (Scene View mode only) */}
      {!isPlayMode && (
        <>
          <UnityHierarchy
            objects={objects}
            selectedObjectId={selectedObjectId}
            onSelectObject={setSelectedObjectId}
            onAddObject={handleAddObject}
            onDeleteObject={handleDeleteObject}
            onDuplicateObject={handleDuplicateObject}
            isOpen={isHierarchyOpen}
            onToggleOpen={() => setIsHierarchyOpen(!isHierarchyOpen)}
          />

          <UnityInspector
            selectedObject={selectedObject}
            onUpdateObject={handleUpdateObject}
            onClose={() => setSelectedObjectId(null)}
            isOpen={isInspectorOpen}
            onToggleOpen={() => setIsInspectorOpen(!isInspectorOpen)}
          />
        </>
      )}

      {/* 4. Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      <UnityBottomDock
        onAddObject={handleAddObject}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        isPlayMode={isPlayMode}
      />

      {/* 5. Game Mode HUD (Timer, Mobile Touch Controls, Lava Alerts, Victory) */}
      <GameHUD
        isPlayMode={isPlayMode}
        isLavaDeath={isLavaDeath}
        isWon={isWon}
        winTime={winTime}
        onRestart={handleReset}
        controlsState={controlsState}
        onSetControls={setControlsState}
      />

      {/* 6. Modals */}
      {isGuideOpen && <GuideModal onClose={() => setIsGuideOpen(false)} />}

      {isSubmitOpen && (
        <SubmitModal
          currentLevel={{
            ...activeLevel,
            objects,
          }}
          onSubmit={handleSubmitAssignment}
          onClose={() => setIsSubmitOpen(false)}
        />
      )}

      {isCommunityOpen && (
        <CommunityGalleryModal
          submissions={submissions}
          onLoadLevel={handleLoadLevelFromGallery}
          onLikeSubmission={handleLikeSubmission}
          onClose={() => setIsCommunityOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal onClose={() => setIsCertificateOpen(false)} />
      )}
    </div>
  );
}
