import * as THREE from 'three';
import { MaterialTheme } from '../types';

/**
 * Procedurally generates CanvasTextures with zero external dependencies.
 * Ensures SRGBColorSpace and maximum anisotropy according to Three.js guidelines.
 */

const textureCache = new Map<string, THREE.CanvasTexture>();

export function getProceduralTexture(theme: MaterialTheme, renderer?: THREE.WebGLRenderer): THREE.CanvasTexture {
  if (textureCache.has(theme)) {
    return textureCache.get(theme)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  switch (theme) {
    case 'sci_fi_grid': {
      // Tech blue grid pattern
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      const step = 64;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Dots at corners
      ctx.fillStyle = '#0284c7';
      for (let x = 0; x <= 512; x += step) {
        for (let y = 0; y <= 512; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }

    case 'unity_orange': {
      // Classic Unity Hazard / Dev Orange Stripes
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(0, 0, 512, 512);

      ctx.fillStyle = '#18181b';
      const stripeW = 40;
      ctx.beginPath();
      for (let x = -512; x < 1024; x += stripeW * 2) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + stripeW, 0);
        ctx.lineTo(x + stripeW - 256, 512);
        ctx.lineTo(x - 256, 512);
      }
      ctx.fill();
      break;
    }

    case 'dark_metal': {
      // Brushed dark carbon steel
      ctx.fillStyle = '#27272a';
      ctx.fillRect(0, 0, 512, 512);

      // Fine brushed lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 400; i++) {
        const y = Math.random() * 512;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Outer border bevel
      ctx.strokeStyle = '#52525b';
      ctx.lineWidth = 12;
      ctx.strokeRect(6, 6, 500, 500);
      break;
    }

    case 'gold_luxury': {
      // Golden reflective plate with subtle diamond pattern
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(0.5, '#fef08a');
      grad.addColorStop(1, '#d97706');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
      ctx.lineWidth = 4;
      for (let i = 0; i <= 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(0, i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(512, i);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }
      break;
    }

    case 'neon_green': {
      // Neon green cyber grid
      ctx.fillStyle = '#052e16';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 6;
      ctx.strokeRect(10, 10, 492, 492);

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
      ctx.lineWidth = 2;
      for (let i = 40; i < 512; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 10);
        ctx.lineTo(i, 502);
        ctx.stroke();
      }
      break;
    }

    case 'magma_rock': {
      // Dark volcanic basalt with lava veins
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 8;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 15;

      // Veins
      for (let j = 0; j < 6; j++) {
        let x = Math.random() * 512;
        let y = 0;
        ctx.beginPath();
        ctx.moveTo(x, y);
        while (y < 512) {
          x += (Math.random() - 0.5) * 60;
          y += Math.random() * 50 + 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      break;
    }

    default: {
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#71717a';
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, 504, 504);
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  if (renderer) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }

  textureCache.set(theme, texture);
  return texture;
}
