import * as THREE from 'three';

export interface LavaSeaController {
  group: THREE.Group;
  update: (time: number, delta: number) => void;
  dispose: () => void;
}

export function createLavaSea(): LavaSeaController {
  const group = new THREE.Group();
  group.name = 'Floor_Lava_Sea';

  // 1. Procedural Animated Lava Canvas Texture
  const lavaCanvas = document.createElement('canvas');
  lavaCanvas.width = 512;
  lavaCanvas.height = 512;
  const ctx = lavaCanvas.getContext('2d')!;

  const lavaTexture = new THREE.CanvasTexture(lavaCanvas);
  lavaTexture.wrapS = THREE.RepeatWrapping;
  lavaTexture.wrapT = THREE.RepeatWrapping;
  lavaTexture.repeat.set(16, 16);
  lavaTexture.colorSpace = THREE.SRGBColorSpace;

  // 2. Lava Surface Plane
  const planeGeo = new THREE.PlaneGeometry(350, 350, 48, 48);
  planeGeo.rotateX(-Math.PI / 2);

  // Store original Y for wave animation
  const posAttr = planeGeo.attributes.position;
  const originalY = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    originalY[i] = posAttr.getY(i);
  }

  const lavaMaterial = new THREE.MeshStandardMaterial({
    map: lavaTexture,
    color: new THREE.Color(0xff4500),
    emissive: new THREE.Color(0xd94406),
    emissiveIntensity: 0.85,
    roughness: 0.35,
    metalness: 0.1,
  });

  const lavaMesh = new THREE.Mesh(planeGeo, lavaMaterial);
  lavaMesh.position.y = 0;
  lavaMesh.receiveShadow = false; // lava self-illuminates
  group.add(lavaMesh);

  // 3. Volcanic Basalt Rocks protruding from lava
  const rockGeo = new THREE.DodecahedronGeometry(2.5, 1);
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x1c1917,
    roughness: 0.9,
    metalness: 0.1,
  });

  const rockInstanced = new THREE.InstancedMesh(rockGeo, rockMat, 40);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.2;
    const dist = 18 + Math.random() * 90;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist + 25;
    const y = -0.6 + Math.random() * 0.8;
    const scale = 1.2 + Math.random() * 2.5;

    dummy.position.set(x, y, z);
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.8), scale);
    dummy.updateMatrix();
    rockInstanced.setMatrixAt(i, dummy.matrix);
  }
  rockInstanced.instanceMatrix.needsUpdate = true;
  group.add(rockInstanced);

  // 4. Rising Embers / Sparks Particle System
  const emberCount = 350;
  const emberGeo = new THREE.BufferGeometry();
  const emberPositions = new Float32Array(emberCount * 3);
  const emberSpeeds = new Float32Array(emberCount);
  const emberOffsets = new Float32Array(emberCount);

  for (let i = 0; i < emberCount; i++) {
    emberPositions[i * 3] = (Math.random() - 0.5) * 120;
    emberPositions[i * 3 + 1] = Math.random() * 12;
    emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 140 + 25;
    emberSpeeds[i] = 1.2 + Math.random() * 2.8;
    emberOffsets[i] = Math.random() * Math.PI * 2;
  }

  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

  // Procedural spark texture
  const sparkCanvas = document.createElement('canvas');
  sparkCanvas.width = 64;
  sparkCanvas.height = 64;
  const sparkCtx = sparkCanvas.getContext('2d')!;
  const grad = sparkCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 200, 1)');
  grad.addColorStop(0.3, 'rgba(255, 120, 0, 0.8)');
  grad.addColorStop(0.8, 'rgba(255, 50, 0, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sparkCtx.fillStyle = grad;
  sparkCtx.fillRect(0, 0, 64, 64);

  const sparkTexture = new THREE.CanvasTexture(sparkCanvas);

  const emberMaterial = new THREE.PointsMaterial({
    size: 0.7,
    map: sparkTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0xffaa33,
  });

  const emberPoints = new THREE.Points(emberGeo, emberMaterial);
  group.add(emberPoints);

  // 5. Warm Under-Glow Point Light
  const lavaLight = new THREE.PointLight(0xff4400, 2.8, 60);
  lavaLight.position.set(0, 2, 20);
  group.add(lavaLight);

  let lastTextureUpdate = 0;

  // Redraw procedural magma cracks periodically
  function drawMagma(t: number) {
    ctx.fillStyle = '#670a00';
    ctx.fillRect(0, 0, 512, 512);

    // Flowing glowing veins
    for (let i = 0; i < 9; i++) {
      const cy = (i * 64 + t * 25) % 512;
      const grad = ctx.createLinearGradient(0, cy - 20, 0, cy + 20);
      grad.addColorStop(0, '#7f1d1d');
      grad.addColorStop(0.5, '#f97316');
      grad.addColorStop(0.7, '#fef08a');
      grad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, cy - 14, 512, 28);
    }

    // Floating dark magma crust blobs
    ctx.fillStyle = '#1c1917';
    for (let c = 0; c < 16; c++) {
      const bx = (c * 77 + Math.sin(t + c) * 30) % 512;
      const by = (c * 93 + Math.cos(t * 0.8 + c) * 30) % 512;
      ctx.beginPath();
      ctx.arc(bx < 0 ? bx + 512 : bx, by < 0 ? by + 512 : by, 22 + (c % 4) * 8, 0, Math.PI * 2);
      ctx.fill();
    }

    lavaTexture.needsUpdate = true;
  }

  // Initial draw
  drawMagma(0);

  const update = (time: number, delta: number) => {
    // 1. Gently animate surface waves
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const wave = Math.sin(x * 0.08 + time * 2) * Math.cos(z * 0.08 + time * 1.5) * 0.25;
      posAttr.setY(i, originalY[i] + wave);
    }
    posAttr.needsUpdate = true;

    // 2. Texture offset for flowing magma look
    lavaTexture.offset.y = (time * 0.02) % 1;
    lavaTexture.offset.x = (Math.sin(time * 0.03) * 0.05) % 1;

    // Redraw magma pattern every ~100ms
    if (time - lastTextureUpdate > 0.09) {
      drawMagma(time);
      lastTextureUpdate = time;
    }

    // 3. Update rising embers
    const pos = emberGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < emberCount; i++) {
      let y = pos.getY(i) + emberSpeeds[i] * delta * 2.2;
      if (y > 18) {
        y = 0.2;
      }
      pos.setY(i, y);

      // gentle drift
      const x = pos.getX(i) + Math.sin(time * 1.8 + emberOffsets[i]) * delta * 0.6;
      pos.setX(i, x);
    }
    pos.needsUpdate = true;

    // 4. Subtle pulsating light
    lavaLight.intensity = 2.4 + Math.sin(time * 3.5) * 0.4;
  };

  const dispose = () => {
    planeGeo.dispose();
    lavaMaterial.dispose();
    lavaTexture.dispose();
    rockGeo.dispose();
    rockMat.dispose();
    emberGeo.dispose();
    emberMaterial.dispose();
    sparkTexture.dispose();
  };

  return { group, update, dispose };
}
