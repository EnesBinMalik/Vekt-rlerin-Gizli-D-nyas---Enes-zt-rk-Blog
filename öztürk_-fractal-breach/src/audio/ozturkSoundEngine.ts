// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

/**
 * Procedural Mathematical Synthesizer and Spatial Matrix Sound Engine
 * Conceived and Designed by Enes Öztürk
 *
 * Emits real-time dynamic sub-bass drones, Chebyshev harmonic overtones,
 * resonant biquad sweeps, and depth-reactive pitch multiplication.
 */
class OzturkSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isRunning: boolean = false;

  // Drone oscillators and nodes
  private masterGain: GainNode | null = null;
  private subOsc1: OscillatorNode | null = null;
  private subOsc2: OscillatorNode | null = null;
  private subFilter: BiquadFilterNode | null = null;
  private subGain: GainNode | null = null;

  private harmonicOsc: OscillatorNode | null = null;
  private harmonicFilter: BiquadFilterNode | null = null;
  private harmonicGain: GainNode | null = null;
  private stereoPanner: StereoPannerNode | null = null;

  // Real-time metrics
  private currentDepth: number = 1.0;
  private currentVelocity: number = 0.0;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported in this client environment.');
    }
  }

  public async resume() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    if (!this.isRunning) {
      this.startAmbientMatrix();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.85;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startAmbientMatrix() {
    if (!this.ctx) return;
    this.isRunning = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.isMuted ? 0 : 0.85;
    this.masterGain.connect(this.ctx.destination);

    // 1. Deep Sub-Bass Matrix Drone (43.65 Hz - 55 Hz fundamental)
    this.subOsc1 = this.ctx.createOscillator();
    this.subOsc2 = this.ctx.createOscillator();
    this.subFilter = this.ctx.createBiquadFilter();
    this.subGain = this.ctx.createGain();

    this.subOsc1.type = 'sawtooth';
    this.subOsc1.frequency.setValueAtTime(43.65, this.ctx.currentTime); // F1 root frequency

    this.subOsc2.type = 'sine';
    this.subOsc2.frequency.setValueAtTime(43.95, this.ctx.currentTime); // Slight 0.3Hz binaural beating

    this.subFilter.type = 'lowpass';
    this.subFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
    this.subFilter.Q.setValueAtTime(4.2, this.ctx.currentTime);

    this.subGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.subOsc1.connect(this.subFilter);
    this.subOsc2.connect(this.subFilter);
    this.subFilter.connect(this.subGain);
    this.subGain.connect(this.masterGain);

    this.subOsc1.start();
    this.subOsc2.start();

    // 2. High-Frequency Quantum Shimmer Layer
    this.harmonicOsc = this.ctx.createOscillator();
    this.harmonicFilter = this.ctx.createBiquadFilter();
    this.harmonicGain = this.ctx.createGain();
    if (this.ctx.createStereoPanner) {
      this.stereoPanner = this.ctx.createStereoPanner();
    }

    this.harmonicOsc.type = 'triangle';
    this.harmonicOsc.frequency.setValueAtTime(174.61, this.ctx.currentTime); // F3

    this.harmonicFilter.type = 'bandpass';
    this.harmonicFilter.frequency.setValueAtTime(440, this.ctx.currentTime);
    this.harmonicFilter.Q.setValueAtTime(7.5, this.ctx.currentTime);

    this.harmonicGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.harmonicOsc.connect(this.harmonicFilter);
    if (this.stereoPanner) {
      this.harmonicFilter.connect(this.stereoPanner);
      this.stereoPanner.connect(this.harmonicGain);
    } else {
      this.harmonicFilter.connect(this.harmonicGain);
    }
    this.harmonicGain.connect(this.masterGain);

    this.harmonicOsc.start();
  }

  /**
   * Updates audio parameters in real-time based on active camera zoom velocity and fractal depth.
   */
  public updateMetrics(depth: number, velocity: number) {
    if (!this.ctx || !this.isRunning) return;

    this.currentDepth = depth;
    this.currentVelocity = velocity;

    const t = this.ctx.currentTime;
    // Logarithmic scale for depth factor (1.0 to 128.0)
    const normalizedDepth = Math.log2(Math.max(1, depth)) / 7.0; // 0 to 1
    const baseFreq = 43.65 * (1 + normalizedDepth * 0.75);

    if (this.subOsc1 && this.subOsc2) {
      this.subOsc1.frequency.setTargetAtTime(baseFreq, t, 0.1);
      this.subOsc2.frequency.setTargetAtTime(baseFreq * 1.008, t, 0.1);
    }

    if (this.subFilter) {
      const cutoff = 110 + normalizedDepth * 280 + Math.min(velocity * 800, 300);
      this.subFilter.frequency.setTargetAtTime(cutoff, t, 0.08);
    }

    if (this.harmonicOsc && this.harmonicFilter) {
      const harmFreq = baseFreq * 4.0;
      this.harmonicOsc.frequency.setTargetAtTime(harmFreq, t, 0.15);
      const sweepCutoff = 350 + Math.sin(t * 0.8) * 150 + normalizedDepth * 600;
      this.harmonicFilter.frequency.setTargetAtTime(sweepCutoff, t, 0.1);
    }

    if (this.stereoPanner) {
      const pan = Math.sin(t * 0.3) * 0.45;
      this.stereoPanner.pan.setTargetAtTime(pan, t, 0.2);
    }
  }

  // --- INTERACTION SOUND FX ---

  /** Overdrive triggered: dramatic low frequency drop, resonant time-dilation sweep */
  public triggerOverdrive() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.85);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(80, t + 0.9);
    filter.Q.setValueAtTime(12.0, t);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 1.2);
  }

  /** Atomic projectile rewritten in Overdrive mode */
  public triggerRewriteSuccess() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    // Dual crystal resonance chime
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);

      gain.gain.setValueAtTime(0.2, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.65);
    });
  }

  /** Fractal matrix fracture pulse */
  public triggerFracturePulse() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(360, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.45);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);
    filter.Q.setValueAtTime(5.0, t);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  /** Mind-Core taking damage */
  public triggerCoreDamage() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.setValueAtTime(80, t + 0.1);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.35);
  }

  /** Recursive trap loop seed alignment lock */
  public triggerTrapResolved() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    // Golden ratio chord
    [432, 540, 648, 864, 1296].forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + idx * 0.08);

      gain.gain.setValueAtTime(0.25, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 1.25);
    });
  }
}

export const soundEngine = new OzturkSoundEngine();
