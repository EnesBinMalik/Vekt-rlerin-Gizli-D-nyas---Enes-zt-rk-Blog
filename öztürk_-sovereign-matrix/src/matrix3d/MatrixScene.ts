// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file MatrixScene.ts
 * @author Enes Öztürk
 * @description 3D Gerçek Zamanlı Dinamik Matris Simülasyonu, Özel GPU Shader Deplasmanı,
 * Sıfır Çöp Toplama (Zero-GC) render döngüsü, Kuantum Dolanıklı Düğümler ve Duvar Çözünmesi.
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  MatrixNode, 
  WallBarrier, 
  IntrusionDaemon, 
  ShieldDrone,
  computeEntangledMirrorEntropy,
  decouplePayloadToShield,
  ZkpProof
} from '../crypto/sovereignMath';
import { sovereignAudio } from '../audio/synthAudio';

// Reusable zero-GC mathematical temporary instances
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _vec2Pointer = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();
const _dummyMatrix = new THREE.Matrix4();
const _colorA = new THREE.Color();

export interface MatrixSceneCallbacks {
  onNodeSelected?: (node: MatrixNode, chainCount: number) => void;
  onZkpSuccess?: (proof: ZkpProof) => void;
  onWallPhased?: (wall: WallBarrier) => void;
  onDaemonDecoupled?: (drone: ShieldDrone) => void;
  onCoherenceDrain?: (amount: number) => void;
  onExploitCompiled?: () => void;
  onOverdriveTick?: (remainingSeconds: number) => void;
}

export class SovereignMatrixEngine {
  public container: HTMLElement;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public isSoftwareGl: boolean = false;
  
  // Game Entities
  public nodes: MatrixNode[] = [];
  public walls: WallBarrier[] = [];
  public daemons: IntrusionDaemon[] = [];
  public shieldDrones: ShieldDrone[] = [];
  public selectedNodeChain: string[] = [];

  // 3D Visual References
  private nodeMeshes: Map<string, THREE.Group> = new Map();
  private wallMeshes: Map<string, THREE.Mesh> = new Map();
  private daemonMeshes: Map<string, THREE.Group> = new Map();
  private shieldDroneMeshes: Map<string, THREE.Mesh> = new Map();
  private connectionLineMesh: THREE.LineSegments | null = null;
  private matrixGridMesh: THREE.Mesh | null = null;
  private mainframeGroup: THREE.Group | null = null;
  private spectreGroup: THREE.Group | null = null;
  private beamMesh: THREE.Mesh | null = null;
  private sliceLineMesh: THREE.Line | null = null;

  // Animation & Loop variables
  private frameId: number = 0;
  private clock: THREE.Clock = new THREE.Clock();
  private isDestroyed: boolean = false;
  private callbacks: MatrixSceneCallbacks;

  // Overdrive Mode State
  public isOverdriveActive: boolean = false;
  public overdriveTimeLeft: number = 0;
  private slicePoints: THREE.Vector3[] = [];
  private isPointerDown: boolean = false;

  // Camera Target for smooth damping
  private targetCameraPos = new THREE.Vector3(0, 16, 18);
  private targetCameraLook = new THREE.Vector3(0, 1.5, 0);
  private currentCameraLook = new THREE.Vector3(0, 1.5, 0);

  constructor(container: HTMLElement, callbacks: MatrixSceneCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    // 1. Detect software WebGL per Three.js guidelines
    this.isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Initialize high-performance WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // 3. Scene & Horizon Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030509);
    this.scene.fog = new THREE.FogExp2(0x030509, 0.024);

    // 4. Camera (portrait / tactical vertical orientation optimized)
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(54, aspect, 0.1, 150);
    this.camera.position.set(0, 17, 19);
    this.camera.lookAt(0, 1.5, 0);

    // 5. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Balanced 3-Point Lighting Rig
    this.setupLighting();

    // 7. Build Procedural World
    this.buildSovereignMainframe();
    this.buildSpectreEntity();
    this.buildProceduralMatrixGrid();
    this.initDefaultMatrixNodes();
    this.initDefaultWalls();
    this.initDefaultDaemons();

    // 8. Event Listeners
    this.setupInteractions();

    // 9. Start Game Loop
    this.startLoop();
  }

  private setupLighting() {
    // Key Light (Warm Radiant Gold)
    const keyLight = new THREE.DirectionalLight(0xffdf80, 2.8);
    keyLight.position.set(8, 18, 10);
    keyLight.castShadow = !this.isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 50;
      keyLight.shadow.camera.left = -15;
      keyLight.shadow.camera.right = 15;
      keyLight.shadow.camera.top = 15;
      keyLight.shadow.camera.bottom = -15;
    }
    this.scene.add(keyLight);

    // Cool Sky / Ground Hemisphere Light (Cyan / Void Purple)
    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x1f0b38, 1.2);
    this.scene.add(hemiLight);

    // Rim / Spot light on Mainframe Center
    const rimLight = new THREE.PointLight(0xffc83b, 3.5, 25);
    rimLight.position.set(0, 7, 0);
    this.scene.add(rimLight);
  }

  /**
   * 1. Öztürk Egemen Merkezi Ana Bilgisayar (Mutlak Çekirdek Kule)
   * 3-12 parçalı procedürel monolitik kuantum kulesi.
   */
  private buildSovereignMainframe() {
    const mainframe = new THREE.Group();
    mainframe.position.set(0, 0, 0);

    // Part 1: Crystalline Quantum Singularity Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffc83b,
      emissive: 0xff9900,
      emissiveIntensity: 0.9,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 3.6;
    mainframe.add(coreMesh);

    // Part 2: Inner Cryptographic Monolith Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.7, 1.2, 5.5, 6);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: false,
    });
    const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
    pillarMesh.position.y = 2.75;
    mainframe.add(pillarMesh);

    // Part 3 & 4: Dual Rotating Sovereign Gold Rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.08, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffc83b,
      metalness: 0.98,
      roughness: 0.15,
      emissive: 0xaa7700,
      emissiveIntensity: 0.3,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat);
    ringMesh1.position.y = 3.6;
    ringMesh1.rotation.x = Math.PI / 2;
    ringMesh1.name = 'ring1';
    mainframe.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.06, 16, 32);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat);
    ringMesh2.position.y = 3.6;
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.name = 'ring2';
    mainframe.add(ringMesh2);

    // Part 5: Tiered Polygonal Base Pedestal
    const baseGeo = new THREE.CylinderGeometry(2.4, 3.2, 0.8, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      metalness: 0.85,
      roughness: 0.35,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.4;
    baseMesh.receiveShadow = !this.isSoftwareGl;
    mainframe.add(baseMesh);

    // Part 6: Vertical Sovereign Quantum Energy Beam
    const beamGeo = new THREE.CylinderGeometry(0.12, 0.12, 28, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffc83b,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    this.beamMesh = new THREE.Mesh(beamGeo, beamMat);
    this.beamMesh.position.y = 14;
    mainframe.add(this.beamMesh);

    // Part 7: Contact Radial Shadow Grounding
    const contactGeo = new THREE.PlaneGeometry(8, 8);
    const contactMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const contactMesh = new THREE.Mesh(contactGeo, contactMat);
    contactMesh.rotation.x = -Math.PI / 2;
    contactMesh.position.y = 0.02;
    mainframe.add(contactMesh);

    this.scene.add(mainframe);
    this.mainframeGroup = mainframe;
  }

  /**
   * 2. Elit Kriptografik Hayalet (Spectre Entity)
   * 6 parçalı kompozit oyuncu avatarı (altın & cam gövde, dönen gimbale, vektör jetleri).
   */
  private buildSpectreEntity() {
    const spectre = new THREE.Group();
    spectre.position.set(0, 1.2, 6.5);

    // Part 1: Diamond Core
    const coreGeo = new THREE.OctahedronGeometry(0.35, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    spectre.add(core);

    // Part 2: Gyroscope Outer Ring
    const gyroGeo = new THREE.TorusGeometry(0.65, 0.03, 12, 24);
    const gyroMat = new THREE.MeshStandardMaterial({
      color: 0xffc83b,
      metalness: 0.95,
      roughness: 0.2,
    });
    const gyro = new THREE.Mesh(gyroGeo, gyroMat);
    gyro.name = 'spectreGyro';
    spectre.add(gyro);

    // Part 3: Visor Focus Shroud
    const visorGeo = new THREE.ConeGeometry(0.2, 0.45, 4);
    const visorMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.x = Math.PI / 2;
    visor.position.z = 0.45;
    spectre.add(visor);

    // Part 4: Thrust Vector Glow
    const thrustGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const thrustMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const thrust = new THREE.Mesh(thrustGeo, thrustMat);
    thrust.position.z = -0.4;
    spectre.add(thrust);

    // Ground shadow
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.18;
    spectre.add(shadow);

    this.scene.add(spectre);
    this.spectreGroup = spectre;
  }

  /**
   * 3. Prosedürel Kriptografik Matris Izgarası (Vertex Shader Deplasmanlı)
   */
  private buildProceduralMatrixGrid() {
    const size = 44;
    const segments = 44;
    const gridGeo = new THREE.PlaneGeometry(size, size, segments, segments);
    gridGeo.rotateX(-Math.PI / 2);

    // Procedural Grid Line Canvas Texture (zero external files)
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#05070d';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#00f0ff18';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 256, 256);
    ctx.strokeStyle = '#ffc83b22';
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, 192, 192);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(22, 22);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const gridMat = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0x111827,
      roughness: 0.6,
      metalness: 0.8,
      wireframe: false,
    });

    // onBeforeCompile with custom GLSL displacement
    gridMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `
        uniform float uTime;
        ${shader.vertexShader}
      `;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float dist = length(transformed.xz);
        float ripple = sin(dist * 0.7 - uTime * 2.5) * 0.22;
        float cyberWave = cos(transformed.x * 0.5 + uTime) * sin(transformed.z * 0.5 + uTime) * 0.15;
        transformed.y += (ripple + cyberWave) * smoothstep(1.5, 18.0, dist);
        `
      );
      gridMat.userData.shader = shader;
    };

    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.position.y = 0;
    gridMesh.receiveShadow = !this.isSoftwareGl;
    this.scene.add(gridMesh);
    this.matrixGridMesh = gridMesh;
  }

  /**
   * 4. Varsayılan Taktik Kriptografik Düğümlerin Başlatılması
   */
  public initDefaultMatrixNodes() {
    // Clear existing
    this.nodeMeshes.forEach(m => this.scene.remove(m));
    this.nodeMeshes.clear();

    this.nodes = [
      {
        id: 'NODE-CYAN-01',
        quadrant: 1,
        x: -4.5,
        y: 1.2,
        z: 3.5,
        type: 'authenticated',
        label: 'AUTH_0x7F4A',
        hexAddress: '0x7F4A00',
        entropyWeight: 0.82,
        isUnlocked: true,
        isActive: false,
        clearanceLevel: 1,
      },
      {
        id: 'NODE-ENTANGLED-01A',
        quadrant: 1,
        x: -2.8,
        y: 1.2,
        z: 1.0,
        type: 'entangled',
        label: 'Q_ENT_K1',
        hexAddress: '0x88BC10',
        entropyWeight: 0.94,
        entangledTargetId: 'NODE-ENTANGLED-01B',
        isUnlocked: true,
        isActive: false,
        clearanceLevel: 2,
      },
      {
        id: 'NODE-ENTANGLED-01B',
        quadrant: 3,
        x: 2.8,
        y: 1.2,
        z: -1.0,
        type: 'entangled',
        label: 'Q_MIRR_K1',
        hexAddress: '0xDEAD20',
        entropyWeight: 0.16, // Inverted mirror entropy
        entangledTargetId: 'NODE-ENTANGLED-01A',
        isUnlocked: false,
        isActive: false,
        clearanceLevel: 2,
      },
      {
        id: 'NODE-PURPLE-01',
        quadrant: 2,
        x: -3.8,
        y: 1.2,
        z: -4.2,
        type: 'anomaly',
        label: 'VOID_INT_09',
        hexAddress: '0xFF01EA',
        entropyWeight: 0.45,
        isUnlocked: false,
        isActive: false,
        clearanceLevel: 3,
      },
      {
        id: 'NODE-GOLD-SOV',
        quadrant: 4,
        x: 4.5,
        y: 1.2,
        z: 3.8,
        type: 'sovereign',
        label: 'ÖZTÜRK_SEC_L1',
        hexAddress: '0xEO2026',
        entropyWeight: 0.99,
        isUnlocked: false,
        isActive: false,
        clearanceLevel: 4,
      },
      {
        id: 'NODE-CYAN-02',
        quadrant: 4,
        x: 3.8,
        y: 1.2,
        z: 6.2,
        type: 'authenticated',
        label: 'GATE_0x1134',
        hexAddress: '0x1134FF',
        entropyWeight: 0.73,
        isUnlocked: true,
        isActive: false,
        clearanceLevel: 1,
      }
    ];

    // Generate 3D Meshes for Nodes
    this.nodes.forEach(node => {
      const group = new THREE.Group();
      group.position.set(node.x, node.y, node.z);

      let color = 0x00f0ff; // Neon Cyan
      if (node.type === 'anomaly') color = 0x9d4edd; // Void Purple
      if (node.type === 'sovereign') color = 0xffc83b; // Neon Gold
      if (node.type === 'entangled') color = 0x00ffa3; // Emerald Quantum

      // Node Crystalline Core
      const geo = new THREE.IcosahedronGeometry(0.42, 1);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Node Halo Ring
      const ringGeo = new THREE.TorusGeometry(0.65, 0.02, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.name = 'haloRing';
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      group.userData = { nodeId: node.id };
      this.scene.add(group);
      this.nodeMeshes.set(node.id, group);
    });

    this.rebuildNodeLines();
  }

  /**
   * 5. Güvenlik Duvarlarının (Wall Barrier) Başlatılması
   */
  public initDefaultWalls() {
    this.wallMeshes.forEach(m => this.scene.remove(m));
    this.wallMeshes.clear();

    this.walls = [
      {
        id: 'WALL-SECTOR-A',
        position: [-1.5, 2.0, 4.0],
        size: [3.5, 4.0, 0.4],
        requiredClearance: 2,
        sectorKey: 'SEC_ALPHA_EO26',
        isPhased: false,
        phaseProgress: 0,
      },
      {
        id: 'WALL-SECTOR-B',
        position: [2.0, 2.0, -3.5],
        size: [4.0, 4.0, 0.4],
        requiredClearance: 3,
        sectorKey: 'SEC_BETA_EO26',
        isPhased: false,
        phaseProgress: 0,
      }
    ];

    this.walls.forEach(wall => {
      const geo = new THREE.BoxGeometry(...wall.size);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x9d4edd,
        emissive: 0x5a189a,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...wall.position);
      mesh.castShadow = !this.isSoftwareGl;
      mesh.receiveShadow = !this.isSoftwareGl;
      this.scene.add(mesh);
      this.wallMeshes.set(wall.id, mesh);
    });
  }

  /**
   * 6. Kötü Niyetli Şifre Çözme Alt Programları (Intrusion Daemons)
   */
  public initDefaultDaemons() {
    this.daemonMeshes.forEach(m => this.scene.remove(m));
    this.daemonMeshes.clear();

    this.daemons = [
      {
        id: 'DAEMON-01',
        x: -8.0,
        y: 1.5,
        z: -7.0,
        targetX: 0,
        targetZ: 0,
        speed: 0.55,
        bruteForcePower: 14,
        payloadType: 'buffer_overflow',
        isDecoupled: false,
      },
      {
        id: 'DAEMON-02',
        x: 9.0,
        y: 1.5,
        z: -6.0,
        targetX: 0,
        targetZ: 0,
        speed: 0.65,
        bruteForcePower: 22,
        payloadType: 'side_channel',
        isDecoupled: false,
      }
    ];

    this.daemons.forEach(daemon => {
      const group = new THREE.Group();
      group.position.set(daemon.x, daemon.y, daemon.z);

      // Spiky pyramid daemon
      const geo = new THREE.ConeGeometry(0.55, 1.2, 5);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x4a0e4e,
        emissive: 0x9d4edd,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2;
      group.add(mesh);

      // Warning ring
      const ringGeo = new THREE.TorusGeometry(0.7, 0.02, 8, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.name = 'warnRing';
      group.add(ring);

      this.scene.add(group);
      this.daemonMeshes.set(daemon.id, group);
    });
  }

  /**
   * Düğümler Arası Bağlantı Çizgilerini Yeniden Hesapla
   */
  private rebuildNodeLines() {
    if (this.connectionLineMesh) {
      this.scene.remove(this.connectionLineMesh);
      this.connectionLineMesh.geometry.dispose();
      this.connectionLineMesh = null;
    }

    if (this.selectedNodeChain.length < 2) return;

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < this.selectedNodeChain.length - 1; i++) {
      const n1 = this.nodes.find(n => n.id === this.selectedNodeChain[i]);
      const n2 = this.nodes.find(n => n.id === this.selectedNodeChain[i + 1]);
      if (n1 && n2) {
        points.push(new THREE.Vector3(n1.x, n1.y, n1.z));
        points.push(new THREE.Vector3(n2.x, n2.y, n2.z));
      }
    }

    if (points.length === 0) return;

    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 3,
      transparent: true,
      opacity: 0.9,
    });
    this.connectionLineMesh = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.connectionLineMesh);
  }

  /**
   * Pointer & Touch Etkileşim Dinleyicileri
   */
  private setupInteractions() {
    const el = this.renderer.domElement;

    el.addEventListener('pointerdown', (e) => {
      this.isPointerDown = true;
      this.handlePointerRaycast(e);

      // Overdrive Mode Laser Slice start
      if (this.isOverdriveActive) {
        const pt = this.getScreenWorldPoint(e);
        if (pt) {
          this.slicePoints = [pt];
        }
      }
    });

    el.addEventListener('pointermove', (e) => {
      if (this.isPointerDown && this.isOverdriveActive) {
        const pt = this.getScreenWorldPoint(e);
        if (pt) {
          this.slicePoints.push(pt);
          this.updateSliceMesh();
          this.checkDaemonSliceCollision(pt);
        }
      }
    });

    el.addEventListener('pointerup', () => {
      this.isPointerDown = false;
      if (this.isOverdriveActive) {
        this.clearSliceMesh();
      }
    });

    // Resize handler
    window.addEventListener('resize', this.onResize);
  }

  private onResize = () => {
    if (!this.container || this.isDestroyed) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private getScreenWorldPoint(e: PointerEvent): THREE.Vector3 | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    _vec2Pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _vec2Pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    _raycaster.setFromCamera(_vec2Pointer, this.camera);
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.2);
    const intersection = new THREE.Vector3();
    return _raycaster.ray.intersectPlane(groundPlane, intersection);
  }

  private handlePointerRaycast(e: PointerEvent) {
    if (this.isOverdriveActive) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    _vec2Pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _vec2Pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    _raycaster.setFromCamera(_vec2Pointer, this.camera);

    const hitGroups: THREE.Group[] = [];
    this.nodeMeshes.forEach(grp => hitGroups.push(grp));
    const intersects = _raycaster.intersectObjects(hitGroups, true);

    if (intersects.length > 0) {
      let current: THREE.Object3D | null = intersects[0].object;
      while (current && !current.userData.nodeId) {
        current = current.parent;
      }
      if (current && current.userData.nodeId) {
        const nodeId = current.userData.nodeId as string;
        this.selectNode(nodeId);
      }
    }
  }

  public selectNode(nodeId: string) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return;

    sovereignAudio.playKeyClick();
    sovereignAudio.playNodeConnect(1 + this.selectedNodeChain.length * 0.15);

    // If already in chain, remove or restart
    if (this.selectedNodeChain.includes(nodeId)) {
      this.selectedNodeChain = this.selectedNodeChain.filter(id => id !== nodeId);
    } else {
      this.selectedNodeChain.push(nodeId);
    }

    // Move Spectre to clicked node
    if (this.spectreGroup) {
      this.spectreGroup.position.set(node.x, node.y + 0.3, node.z);
    }

    // Check Quantum Entanglement trigger
    if (node.type === 'entangled' && node.entangledTargetId) {
      const mirrorNode = this.nodes.find(n => n.id === node.entangledTargetId);
      if (mirrorNode) {
        mirrorNode.entropyWeight = computeEntangledMirrorEntropy(node.entropyWeight);
        mirrorNode.isUnlocked = true;
        // Trigger visual highlight on mirror mesh
        const mirrorMesh = this.nodeMeshes.get(mirrorNode.id);
        if (mirrorMesh) {
          mirrorMesh.scale.set(1.4, 1.4, 1.4);
        }
      }
    }

    this.rebuildNodeLines();
    this.callbacks.onNodeSelected?.(node, this.selectedNodeChain.length);
  }

  /**
   * Oyuncu Sıfır Bilgi Kanıtını Doğrular (Authenticate Action)
   */
  public executeAuthenticate(proof: ZkpProof) {
    if (this.selectedNodeChain.length === 0) return;

    sovereignAudio.playZkpSuccess();

    // Unlock connected walls if clearance met
    const activeClearance = Math.max(...this.selectedNodeChain.map(id => {
      const n = this.nodes.find(node => node.id === id);
      return n ? n.clearanceLevel : 1;
    }));

    this.walls.forEach(wall => {
      if (activeClearance >= wall.requiredClearance && !wall.isPhased) {
        wall.isPhased = true;
        sovereignAudio.playWallPhase();
        this.callbacks.onWallPhased?.(wall);
      }
    });

    this.callbacks.onZkpSuccess?.(proof);
    this.callbacks.onExploitCompiled?.();
  }

  /**
   * Öztürk Egemen Overdrive Başlatma (10 Saniye Süre)
   */
  public triggerOverdrive() {
    this.isOverdriveActive = true;
    this.overdriveTimeLeft = 10.0;
    sovereignAudio.playOverdriveEngage();

    // Darken background & shift camera to tactical top-down perspective
    this.targetCameraPos.set(0, 22, 0.1);
    this.targetCameraLook.set(0, 0, 0);

    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.density = 0.045;
    }
  }

  private checkDaemonSliceCollision(pt: THREE.Vector3) {
    for (let i = this.daemons.length - 1; i >= 0; i--) {
      const daemon = this.daemons[i];
      if (daemon.isDecoupled) continue;

      const dist = Math.hypot(daemon.x - pt.x, daemon.z - pt.z);
      if (dist < 1.6) {
        // Successfully sliced and decoupled session key!
        daemon.isDecoupled = true;
        sovereignAudio.playLaserSlice();

        // Spawn Shield Drone
        const shieldDrone = decouplePayloadToShield(daemon, this.shieldDrones.length);
        this.shieldDrones.push(shieldDrone);
        this.createShieldDroneMesh(shieldDrone);

        // Remove Daemon mesh with particle flash
        const dMesh = this.daemonMeshes.get(daemon.id);
        if (dMesh) {
          this.scene.remove(dMesh);
          this.daemonMeshes.delete(daemon.id);
        }
        this.daemons.splice(i, 1);

        this.callbacks.onDaemonDecoupled?.(shieldDrone);
      }
    }
  }

  private createShieldDroneMesh(drone: ShieldDrone) {
    const geo = new THREE.DodecahedronGeometry(0.3, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffc83b,
      emissive: 0xffaa00,
      emissiveIntensity: 0.9,
      metalness: 0.9,
      roughness: 0.1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    this.scene.add(mesh);
    this.shieldDroneMeshes.set(drone.id, mesh);
  }

  private updateSliceMesh() {
    if (this.sliceLineMesh) {
      this.scene.remove(this.sliceLineMesh);
      this.sliceLineMesh.geometry.dispose();
      this.sliceLineMesh = null;
    }
    if (this.slicePoints.length < 2) return;

    const geo = new THREE.BufferGeometry().setFromPoints(this.slicePoints);
    const mat = new THREE.LineBasicMaterial({
      color: 0xffc83b,
      linewidth: 4,
    });
    this.sliceLineMesh = new THREE.Line(geo, mat);
    this.scene.add(this.sliceLineMesh);
  }

  private clearSliceMesh() {
    if (this.sliceLineMesh) {
      this.scene.remove(this.sliceLineMesh);
      this.sliceLineMesh.geometry.dispose();
      this.sliceLineMesh = null;
    }
    this.slicePoints = [];
  }

  /**
   * Matris Bakış Açısını Kaydır (Shift Action)
   */
  public shiftPerspective(quadrant: number) {
    sovereignAudio.playKeyClick();
    if (quadrant === 1) {
      this.targetCameraPos.set(-10, 14, 12);
    } else if (quadrant === 2) {
      this.targetCameraPos.set(-10, 14, -12);
    } else if (quadrant === 3) {
      this.targetCameraPos.set(10, 14, -12);
    } else {
      this.targetCameraPos.set(0, 16, 18);
    }
    this.targetCameraLook.set(0, 1.5, 0);
  }

  /**
   * Zero-GC Render & Simülasyon Döngüsü (Paced on Software WebGL)
   */
  private startLoop() {
    const tick = () => {
      if (this.isDestroyed) return;

      const delta = Math.min(this.clock.getDelta(), 0.1);
      const elapsed = this.clock.getElapsedTime();

      // 1. Camera exponential damping
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.targetCameraPos.x, 3.5, delta);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetCameraPos.y, 3.5, delta);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.targetCameraPos.z, 3.5, delta);

      this.currentCameraLook.x = THREE.MathUtils.damp(this.currentCameraLook.x, this.targetCameraLook.x, 3.5, delta);
      this.currentCameraLook.y = THREE.MathUtils.damp(this.currentCameraLook.y, this.targetCameraLook.y, 3.5, delta);
      this.currentCameraLook.z = THREE.MathUtils.damp(this.currentCameraLook.z, this.targetCameraLook.z, 3.5, delta);
      this.camera.lookAt(this.currentCameraLook);

      // 2. Animate Mainframe Core & Rings
      if (this.mainframeGroup) {
        const ring1 = this.mainframeGroup.getObjectByName('ring1');
        const ring2 = this.mainframeGroup.getObjectByName('ring2');
        if (ring1) ring1.rotation.z += delta * 0.9;
        if (ring2) ring2.rotation.y += delta * 1.3;
      }

      // 3. Animate Spectre Gyro & Hover
      if (this.spectreGroup) {
        const gyro = this.spectreGroup.getObjectByName('spectreGyro');
        if (gyro) {
          gyro.rotation.x += delta * 2.0;
          gyro.rotation.y += delta * 2.5;
        }
        this.spectreGroup.position.y = 1.2 + Math.sin(elapsed * 2.5) * 0.12;
      }

      // 4. Update GPU Matrix Grid Shader Time
      if (this.matrixGridMesh) {
        const mat = this.matrixGridMesh.material as THREE.MeshStandardMaterial;
        if (mat.userData.shader) {
          mat.userData.shader.uniforms.uTime.value = elapsed;
        }
      }

      // 5. Animate Node Halo Rings
      this.nodeMeshes.forEach(grp => {
        const halo = grp.getObjectByName('haloRing');
        if (halo) halo.rotation.z += delta * 1.5;
      });

      // 6. Dynamic Wall Phasing Dissolution
      this.walls.forEach(wall => {
        if (wall.isPhased && wall.phaseProgress < 1.0) {
          wall.phaseProgress = Math.min(1.0, wall.phaseProgress + delta * 1.5);
          const mesh = this.wallMeshes.get(wall.id);
          if (mesh) {
            const mat = mesh.material as THREE.MeshPhysicalMaterial;
            mat.opacity = 0.85 * (1.0 - wall.phaseProgress);
            mesh.scale.set(1.0, Math.max(0.01, 1.0 - wall.phaseProgress), 1.0);
            if (wall.phaseProgress >= 1.0) {
              mesh.visible = false;
            }
          }
        }
      });

      // 7. Daemons Brute-Force March Towards Sovereign Core
      for (let i = 0; i < this.daemons.length; i++) {
        const daemon = this.daemons[i];
        if (daemon.isDecoupled) continue;

        _vec3A.set(daemon.targetX - daemon.x, 0, daemon.targetZ - daemon.z);
        const dist = _vec3A.length();
        if (dist > 1.2) {
          _vec3A.normalize();
          daemon.x += _vec3A.x * daemon.speed * delta;
          daemon.z += _vec3A.z * daemon.speed * delta;

          const dMesh = this.daemonMeshes.get(daemon.id);
          if (dMesh) {
            dMesh.position.set(daemon.x, daemon.y + Math.sin(elapsed * 4 + i) * 0.1, daemon.z);
            dMesh.lookAt(0, 1.5, 0);
          }
        } else {
          // Attacking Mainframe Core directly! Coherence drain
          this.callbacks.onCoherenceDrain?.(daemon.bruteForcePower * delta * 0.3);
        }
      }

      // 8. Shield Drones Orbiting Sovereign Core
      this.shieldDrones.forEach((drone, idx) => {
        drone.orbitAngle += drone.orbitSpeed;
        const mesh = this.shieldDroneMeshes.get(drone.id);
        if (mesh) {
          mesh.position.x = Math.cos(drone.orbitAngle) * drone.orbitRadius;
          mesh.position.z = Math.sin(drone.orbitAngle) * drone.orbitRadius;
          mesh.position.y = 2.5 + Math.sin(elapsed * 3 + idx) * 0.4;
          mesh.rotation.y += delta * 2;
        }
      });

      // 9. Overdrive Timer Countdown
      if (this.isOverdriveActive) {
        this.overdriveTimeLeft -= delta;
        this.callbacks.onOverdriveTick?.(Math.max(0, this.overdriveTimeLeft));
        if (this.overdriveTimeLeft <= 0) {
          this.isOverdriveActive = false;
          this.clearSliceMesh();
          this.targetCameraPos.set(0, 16, 18);
          this.targetCameraLook.set(0, 1.5, 0);
          if (this.scene.fog instanceof THREE.FogExp2) {
            this.scene.fog.density = 0.024;
          }
        }
      }

      // 10. Render frame
      this.renderer.render(this.scene, this.camera);

      // Software WebGL pacing
      if (this.isSoftwareGl) {
        this.afterDraw(tick);
      } else {
        this.frameId = requestAnimationFrame(tick);
      }
    };

    if (this.isSoftwareGl) {
      this.afterDraw(tick);
    } else {
      this.frameId = requestAnimationFrame(tick);
    }
  }

  private afterDraw(cb: () => void) {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (this.isDestroyed) return;
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        this.frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.frameId = window.setTimeout(cb, 80);
      }
    };
    this.frameId = window.setTimeout(poll, 5);
  }

  public dispose() {
    this.isDestroyed = true;
    window.removeEventListener('resize', this.onResize);
    if (this.isSoftwareGl) {
      clearTimeout(this.frameId);
    } else {
      cancelAnimationFrame(this.frameId);
    }
    this.renderer.dispose();
  }
}
