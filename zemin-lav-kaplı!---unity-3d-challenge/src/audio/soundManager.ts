/**
 * Procedural Web Audio API sound synthesizer
 * Zero external audio files (100% code generated, zero 404s)
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private rollGain: GainNode | null = null;
  private rollSource: AudioBufferSourceNode | null = null;
  private lavaAmbienceGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.rollGain) {
      this.rollGain.gain.value = 0;
    }
    if (this.lavaAmbienceGain) {
      this.lavaAmbienceGain.gain.value = muted ? 0 : 0.08;
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /** Starts background bubbling lava ambient sound */
  public startLavaAmbience() {
    if (this.lavaAmbienceGain || this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Create brown/pink noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 2.5; // boost
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 220;

      const gain = this.ctx.createGain();
      gain.gain.value = this.isMuted ? 0 : 0.08;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();

      this.lavaAmbienceGain = gain;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /** Plays rolling sound scaled with ball speed */
  public updateRollingSound(speed: number, isGrounded: boolean) {
    if (this.isMuted || !this.ctx || !isGrounded || speed < 0.2) {
      if (this.rollGain) {
        this.rollGain.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.08);
      }
      return;
    }

    try {
      if (!this.rollGain) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = 65;

        filter.type = 'lowpass';
        filter.frequency.value = 260;

        gain.gain.value = 0;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();

        this.rollGain = gain;
      }

      const targetGain = Math.min(0.2, (speed / 15) * 0.18);
      const t = this.ctx.currentTime;
      this.rollGain.gain.setTargetAtTime(targetGain, t, 0.05);
    } catch {
      // ignore
    }
  }

  /** Jump or bounce sound */
  public playBounce(strength: number = 1) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140 + strength * 80, t);
      osc.frequency.exponentialRampToValueAtTime(320 + strength * 140, t + 0.12);

      gain.gain.setValueAtTime(0.25 * Math.min(1.5, strength), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch {
      // ignore
    }
  }

  /** Booster pad acceleration whoosh */
  public playBooster() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.35);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(1600, t + 0.35);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.4);
    } catch {
      // ignore
    }
  }

  /** Ball touched lava - sizzle and steam */
  public playLavaSizzle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // White noise for steam
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1800;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);

      // Low plunge thud
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(120, t);
      thud.frequency.exponentialRampToValueAtTime(30, t + 0.35);

      thudGain.gain.setValueAtTime(0.4, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(t);
      thud.stop(t + 0.35);
    } catch {
      // ignore
    }
  }

  /** Checkpoint touched sound */
  public playCheckpoint() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0.18, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  /** Victory fanfare when ball reaches Finish Ring */
  public playVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [
        { freq: 440, delay: 0 },
        { freq: 554.37, delay: 0.12 },
        { freq: 659.25, delay: 0.24 },
        { freq: 880, delay: 0.38 },
        { freq: 880, delay: 0.58 },
        { freq: 1108.73, delay: 0.78 }
      ];

      const t0 = this.ctx.currentTime;
      notes.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, t0 + n.delay);

        gain.gain.setValueAtTime(0.25, t0 + n.delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + n.delay + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t0 + n.delay);
        osc.stop(t0 + n.delay + 0.65);
      });
    } catch {
      // ignore
    }
  }

  /** Subtle UI click feedback */
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
