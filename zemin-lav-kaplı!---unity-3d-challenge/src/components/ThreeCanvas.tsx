import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import confetti from 'canvas-confetti';
import { GameObjectConfig, Vector3D } from '../types';
import { createLavaSea, LavaSeaController } from '../three/lavaSea';
import { buildGameObjectMesh, createMarbleBallMesh } from '../three/trackMeshBuilder';
import { BallPhysicsSimulation, PhysicsControls } from '../physics/ballPhysics';
import { soundManager } from '../audio/soundManager';

interface ThreeCanvasProps {
  objects: GameObjectConfig[];
  ballStartPos: Vector3D;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  isPlayMode: boolean;
  isPaused: boolean;
  onGameWin: (elapsedTime: number) => void;
  onLavaDeath: () => void;
  controlsState: PhysicsControls;
  cameraMode: 'follow' | 'orbit' | 'topDown';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  objects,
  ballStartPos,
  selectedObjectId,
  onSelectObject,
  isPlayMode,
  isPaused,
  onGameWin,
  onLavaDeath,
  controlsState,
  cameraMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // References to keep state across frames without tearing down WebGL
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orbitControlsRef = useRef<OrbitControls | null>(null);
  const physicsRef = useRef<BallPhysicsSimulation | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const ballMeshRef = useRef<THREE.Mesh | null>(null);
  const lavaControllerRef = useRef<LavaSeaController | null>(null);
  const selectionBoxRef = useRef<THREE.BoxHelper | null>(null);

  // Mutable prop mirrors to avoid stale closures in rAF loop
  const propsRef = useRef({
    objects,
    ballStartPos,
    selectedObjectId,
    onSelectObject,
    isPlayMode,
    isPaused,
    controlsState,
    cameraMode,
    onGameWin,
    onLavaDeath,
  });
  propsRef.current = {
    objects,
    ballStartPos,
    selectedObjectId,
    onSelectObject,
    isPlayMode,
    isPaused,
    controlsState,
    cameraMode,
    onGameWin,
    onLavaDeath,
  };

  const gameTimerRef = useRef<number>(0);
  const hasWonRef = useRef<boolean>(false);
  const hasDiedRef = useRef<boolean>(false);

  // Setup WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x180b08); // Dark volcanic ambiance
    scene.fog = new THREE.FogExp2(0x180b08, 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      600
    );
    camera.position.set(0, 14, -18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Setup (Warm key light, cool sky hemisphere light, lava underglow)
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0xb45309, 0.7);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    dirLight.position.set(25, 45, 15);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    const d = 45;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);

    // Orbit Controls for Scene View
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = !isSoftwareGl;
    orbitControls.dampingFactor = 0.06;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below lava plane
    orbitControls.target.set(0, 4, 15);
    orbitControlsRef.current = orbitControls;

    // Lava Sea Floor
    const lavaSea = createLavaSea();
    scene.add(lavaSea.group);
    lavaControllerRef.current = lavaSea;

    // Objects Group
    const objectsGroup = new THREE.Group();
    objectsGroup.name = 'TrackObjects';
    scene.add(objectsGroup);
    objectsGroupRef.current = objectsGroup;

    // Marble Ball
    const ballMesh = createMarbleBallMesh();
    scene.add(ballMesh);
    ballMeshRef.current = ballMesh;

    // Ball Physics
    const physics = new BallPhysicsSimulation(propsRef.current.ballStartPos);
    physics.setMesh(ballMesh);
    physicsRef.current = physics;

    // Selection Box Helper for Unity Inspector highlight
    const selBox = new THREE.BoxHelper(new THREE.Mesh(), 0x38bdf8);
    selBox.visible = false;
    scene.add(selBox);
    selectionBoxRef.current = selBox;

    // Pre-warm renderer
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycast click for object selection in Scene View
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (propsRef.current.isPlayMode) return; // Only in scene edit view
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (objectsGroupRef.current) {
        const intersects = raycaster.intersectObjects(objectsGroupRef.current.children, true);
        if (intersects.length > 0) {
          // Find root GameObject
          let cur: THREE.Object3D | null = intersects[0].object;
          while (cur && !cur.userData?.configId && cur.parent && cur.parent !== objectsGroupRef.current) {
            cur = cur.parent;
          }
          if (cur && cur.userData?.configId) {
            propsRef.current.onSelectObject(cur.userData.configId);
            soundManager.playClick();
            return;
          }
        }
      }
      propsRef.current.onSelectObject(null);
    };

    container.addEventListener('pointerdown', handleClick);

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Main Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Update lava animation
      lavaSea.update(time, delta);

      const p = propsRef.current;

      // Animate spinning hazard obstacles in scene
      if (objectsGroupRef.current) {
        objectsGroupRef.current.children.forEach((child) => {
          const cfg = child.userData?.config as GameObjectConfig | undefined;
          if (cfg && cfg.type === 'spinner' && cfg.speed) {
            const rotor = child.getObjectByName('rotorGroup');
            if (rotor) {
              rotor.rotation.y += cfg.speed * delta;
            }
          }
        });
      }

      // Physics Simulation in Play Mode
      if (p.isPlayMode && !p.isPaused && physicsRef.current) {
        gameTimerRef.current += delta;

        // Compute camera yaw angle for relative steering
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);
        const cameraAngleY = Math.atan2(camDir.x, camDir.z);

        physicsRef.current.update(delta, p.objects, p.controlsState, cameraAngleY);

        // Check Lava Death
        if (physicsRef.current.isInLava && !hasDiedRef.current) {
          hasDiedRef.current = true;
          p.onLavaDeath();
          setTimeout(() => {
            physicsRef.current?.respawn();
            hasDiedRef.current = false;
          }, 1100);
        }

        // Check Victory Goal
        if (physicsRef.current.isFinished && !hasWonRef.current) {
          hasWonRef.current = true;
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
          p.onGameWin(gameTimerRef.current);
        }
      }

      // Camera Handling
      if (p.isPlayMode && p.cameraMode === 'follow' && physicsRef.current) {
        orbitControls.enabled = false;
        const ballPos = physicsRef.current.position;
        const targetCamPos = new THREE.Vector3(
          ballPos.x,
          ballPos.y + 4.8,
          ballPos.z - 7.5
        );
        camera.position.lerp(targetCamPos, 0.08);
        const lookTarget = new THREE.Vector3(ballPos.x, ballPos.y + 0.8, ballPos.z + 4.0);
        camera.lookAt(lookTarget);
      } else if (p.isPlayMode && p.cameraMode === 'topDown' && physicsRef.current) {
        orbitControls.enabled = false;
        const ballPos = physicsRef.current.position;
        camera.position.set(ballPos.x, ballPos.y + 18, ballPos.z);
        camera.lookAt(ballPos);
      } else {
        orbitControls.enabled = true;
        orbitControls.update();
      }

      // Update Selection Box for Selected Object
      if (!p.isPlayMode && p.selectedObjectId && objectsGroupRef.current && selectionBoxRef.current) {
        const selectedMesh = objectsGroupRef.current.children.find(
          (c) => c.userData?.configId === p.selectedObjectId
        );
        if (selectedMesh) {
          selectionBoxRef.current.setFromObject(selectedMesh);
          selectionBoxRef.current.visible = true;
        } else {
          selectionBoxRef.current.visible = false;
        }
      } else if (selectionBoxRef.current) {
        selectionBoxRef.current.visible = false;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handleClick);
      window.removeEventListener('resize', handleResize);
      lavaSea.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync objects into 3D scene when `objects` prop changes
  useEffect(() => {
    if (!objectsGroupRef.current || !rendererRef.current) return;
    const group = objectsGroupRef.current;

    // Clear previous objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    // Rebuild meshes
    objects.forEach((cfg) => {
      const mesh = buildGameObjectMesh(cfg, rendererRef.current!);
      group.add(mesh);
    });

    // Update selection helper
    if (selectionBoxRef.current) {
      selectionBoxRef.current.visible = false;
    }
  }, [objects]);

  // Handle Play Mode switches and Ball Reset
  useEffect(() => {
    if (physicsRef.current) {
      if (isPlayMode) {
        physicsRef.current.resetTo(ballStartPos);
        hasWonRef.current = false;
        hasDiedRef.current = false;
        gameTimerRef.current = 0;
        soundManager.startLavaAmbience();
      } else {
        physicsRef.current.resetTo(ballStartPos);
        if (orbitControlsRef.current && cameraRef.current) {
          orbitControlsRef.current.target.set(0, 4, 15);
          cameraRef.current.position.set(0, 14, -18);
        }
      }
    }
  }, [isPlayMode, ballStartPos]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none outline-none cursor-grab active:cursor-grabbing"
    />
  );
};
