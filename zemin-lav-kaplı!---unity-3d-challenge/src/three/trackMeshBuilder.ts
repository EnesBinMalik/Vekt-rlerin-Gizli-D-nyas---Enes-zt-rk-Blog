import * as THREE from 'three';
import { GameObjectConfig } from '../types';
import { getProceduralTexture } from './proceduralTextures';

/**
 * Procedurally builds high-fidelity composite 3-12 part procedural Three.js meshes
 * for every GameObject in the scene, following Three.js architectural directives.
 */

export function buildGameObjectMesh(
  config: GameObjectConfig,
  renderer?: THREE.WebGLRenderer
): THREE.Group {
  const root = new THREE.Group();
  root.name = `GO_${config.id}`;
  root.userData = { configId: config.id, config };

  const baseTexture = getProceduralTexture(config.materialTheme, renderer);

  const mainMaterial = new THREE.MeshStandardMaterial({
    map: baseTexture,
    color: new THREE.Color(config.color),
    roughness: config.materialTheme === 'gold_luxury' ? 0.2 : 0.45,
    metalness: config.materialTheme === 'gold_luxury' || config.materialTheme === 'dark_metal' ? 0.8 : 0.2,
  });

  const trimMaterial = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.8,
    metalness: 0.5,
  });

  switch (config.type) {
    case 'cube': {
      // Main Box
      const boxGeo = new THREE.BoxGeometry(config.scale.x, config.scale.y, config.scale.z);
      const boxMesh = new THREE.Mesh(boxGeo, mainMaterial);
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      root.add(boxMesh);

      // Bottom Support Pillars/Brackets (Grounding & visual realism)
      const bracketGeo = new THREE.CylinderGeometry(0.2, 0.4, 2.5, 8);
      const b1 = new THREE.Mesh(bracketGeo, trimMaterial);
      b1.position.set(-config.scale.x * 0.4, -config.scale.y * 0.5 - 1.25, -config.scale.z * 0.4);
      const b2 = new THREE.Mesh(bracketGeo, trimMaterial);
      b2.position.set(config.scale.x * 0.4, -config.scale.y * 0.5 - 1.25, config.scale.z * 0.4);
      root.add(b1, b2);
      break;
    }

    case 'ramp': {
      // Wedge Ramp Mesh with slope
      const w = config.scale.x;
      const h = config.scale.y;
      const l = config.scale.z;

      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0, h * 2);
      shape.lineTo(l, 0);
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: w,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.08,
        bevelSegments: 2,
      };

      const rampGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      rampGeo.center();

      const rampMesh = new THREE.Mesh(rampGeo, mainMaterial);
      rampMesh.rotation.y = Math.PI / 2;
      rampMesh.castShadow = true;
      rampMesh.receiveShadow = true;
      root.add(rampMesh);

      // Side Guardrails
      const railGeo = new THREE.BoxGeometry(0.12, 0.4, l);
      const r1 = new THREE.Mesh(railGeo, trimMaterial);
      r1.position.set(-w * 0.5 + 0.1, h * 0.5, 0);
      const r2 = new THREE.Mesh(railGeo, trimMaterial);
      r2.position.set(w * 0.5 - 0.1, h * 0.5, 0);
      root.add(r1, r2);
      break;
    }

    case 'cylinder': {
      const radius = config.scale.x * 0.5;
      const height = config.scale.y;
      const cylGeo = new THREE.CylinderGeometry(radius, radius * 1.05, height, 24);
      const cylMesh = new THREE.Mesh(cylGeo, mainMaterial);
      cylMesh.castShadow = true;
      cylMesh.receiveShadow = true;
      root.add(cylMesh);

      // Glowing Rim Ring
      const ringGeo = new THREE.TorusGeometry(radius * 0.98, 0.06, 8, 32);
      ringGeo.rotateX(Math.PI / 2);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const ringMesh = new THREE.Mesh(ringGeo, glowMat);
      ringMesh.position.y = height * 0.5 + 0.02;
      root.add(ringMesh);

      // Deep Volcanic Foundation
      const foundGeo = new THREE.CylinderGeometry(radius * 1.08, radius * 1.25, 4, 16);
      const foundMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 });
      const foundMesh = new THREE.Mesh(foundGeo, foundMat);
      foundMesh.position.y = -height * 0.5 - 2.0;
      root.add(foundMesh);
      break;
    }

    case 'trampoline': {
      // Base frame
      const frameGeo = new THREE.CylinderGeometry(config.scale.x * 0.55, config.scale.x * 0.6, 0.3, 24);
      const frameMesh = new THREE.Mesh(frameGeo, trimMaterial);
      root.add(frameMesh);

      // Bouncy rubber pad
      const padGeo = new THREE.CylinderGeometry(config.scale.x * 0.48, config.scale.x * 0.48, 0.18, 24);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padMesh.position.y = 0.15;
      padMesh.castShadow = true;
      root.add(padMesh);

      // Center Launch Target Icon
      const targetGeo = new THREE.RingGeometry(0.2, 0.5, 16);
      targetGeo.rotateX(-Math.PI / 2);
      const targetMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const targetMesh = new THREE.Mesh(targetGeo, targetMat);
      targetMesh.position.y = 0.25;
      root.add(targetMesh);
      break;
    }

    case 'booster': {
      // Low profile acceleration track
      const baseGeo = new THREE.BoxGeometry(config.scale.x, config.scale.y, config.scale.z);
      const baseMesh = new THREE.Mesh(baseGeo, trimMaterial);
      root.add(baseMesh);

      // Chevron glow arrows
      const arrowMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      for (let zOffset = -config.scale.z * 0.3; zOffset <= config.scale.z * 0.3; zOffset += 1.2) {
        const arrowGeo = new THREE.ConeGeometry(0.35, 0.8, 3);
        arrowGeo.rotateX(-Math.PI / 2);
        arrowGeo.rotateY(Math.PI);
        const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
        arrowMesh.position.set(0, config.scale.y * 0.5 + 0.05, zOffset);
        root.add(arrowMesh);
      }
      break;
    }

    case 'spinner': {
      // Center Tower Axle
      const axleGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 16);
      const axleMesh = new THREE.Mesh(axleGeo, trimMaterial);
      root.add(axleMesh);

      // Rotating Blade Assembly (child group so we can animate rotation)
      const rotorGroup = new THREE.Group();
      rotorGroup.name = 'rotorGroup';

      const bladeGeo = new THREE.BoxGeometry(config.scale.x, config.scale.y, config.scale.z);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.7,
      });
      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
      bladeMesh.castShadow = true;
      rotorGroup.add(bladeMesh);

      // End weights / warning lights
      const lightGeo = new THREE.SphereGeometry(0.3, 12, 12);
      const lightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const l1 = new THREE.Mesh(lightGeo, lightMat);
      l1.position.set(-config.scale.x * 0.48, 0, 0);
      const l2 = new THREE.Mesh(lightGeo, lightMat);
      l2.position.set(config.scale.x * 0.48, 0, 0);
      rotorGroup.add(l1, l2);

      root.add(rotorGroup);
      break;
    }

    case 'finishRing': {
      // Grand Golden Finish Archway & Particle Ring
      const torusGeo = new THREE.TorusGeometry(config.scale.x * 0.5, 0.28, 16, 32);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0x78350f,
        emissiveIntensity: 0.4,
        roughness: 0.15,
        metalness: 0.95,
      });
      const torusMesh = new THREE.Mesh(torusGeo, goldMat);
      torusMesh.castShadow = true;
      root.add(torusMesh);

      // Support pillars
      const pGeo = new THREE.CylinderGeometry(0.25, 0.35, config.scale.y * 0.7, 12);
      const p1 = new THREE.Mesh(pGeo, trimMaterial);
      p1.position.set(-config.scale.x * 0.5, -config.scale.y * 0.35, 0);
      const p2 = new THREE.Mesh(pGeo, trimMaterial);
      p2.position.set(config.scale.x * 0.5, -config.scale.y * 0.35, 0);
      root.add(p1, p2);

      // Inner glowing victory beacon
      const beaconGeo = new THREE.RingGeometry(0.1, config.scale.x * 0.42, 32);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0xfffbeb,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      root.add(beaconMesh);
      break;
    }

    case 'checkpoint': {
      // Checkpoint Base Plate
      const cpGeo = new THREE.BoxGeometry(config.scale.x, config.scale.y, config.scale.z);
      const cpMesh = new THREE.Mesh(cpGeo, mainMaterial);
      cpMesh.receiveShadow = true;
      root.add(cpMesh);

      // Holographic Flag Pole
      const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 8);
      const poleMesh = new THREE.Mesh(poleGeo, trimMaterial);
      poleMesh.position.set(-config.scale.x * 0.4, 1.25, -config.scale.z * 0.4);
      root.add(poleMesh);

      // Neon Checkpoint Flag
      const flagGeo = new THREE.BoxGeometry(0.8, 0.5, 0.04);
      const flagMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
      });
      const flagMesh = new THREE.Mesh(flagGeo, flagMat);
      flagMesh.position.set(-config.scale.x * 0.4 + 0.4, 2.2, -config.scale.z * 0.4);
      root.add(flagMesh);
      break;
    }

    default: {
      const g = new THREE.BoxGeometry(config.scale.x, config.scale.y, config.scale.z);
      const m = new THREE.Mesh(g, mainMaterial);
      m.castShadow = true;
      m.receiveShadow = true;
      root.add(m);
      break;
    }
  }

  // Set transforms
  root.position.set(config.position.x, config.position.y, config.position.z);
  root.rotation.set(
    (config.rotation.x * Math.PI) / 180,
    (config.rotation.y * Math.PI) / 180,
    (config.rotation.z * Math.PI) / 180
  );

  return root;
}

/**
 * Creates the hero Marble Ball (composite sphere with gloss, race decals, inner reflection)
 */
export function createMarbleBallMesh(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(0.55, 32, 32);

  // Procedural marble texture with racing line
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base metallic gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#38bdf8');
  grad.addColorStop(0.3, '#0284c7');
  grad.addColorStop(0.7, '#0369a1');
  grad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Racing stripes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 110, 512, 36);

  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, 96, 512, 10);
  ctx.fillRect(0, 150, 512, 10);

  // Unity emblem / number
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(256, 128, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('U', 256, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.15,
    metalness: 0.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  mesh.name = 'MarbleBall';

  return mesh;
}
