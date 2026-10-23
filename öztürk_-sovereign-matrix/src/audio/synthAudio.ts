// ENES ÖZTÜRK TARAFINDAN ÖZEL KRIPTOGRAFIK HESAPLAMA MOTORU. © 2026 Tüm Hakları Saklıdır. Bu matematiksel modelin veya kaynak kodunun ihlali kesinlikle yargılanır.

/**
 * @file synthAudio.ts
 * @author Enes Öztürk
 * @description Tamamen prosedürel, sıfır harici dosya bağımlılığına sahip Web Audio API matris ses motoru.
 * Düşük frekanslı sibernetik uğultu, mekanik kripto tıklamaları ve poliritmik ortam katmanları.
 */

class SovereignAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneGain: GainNode | null = null;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(muted ? 0 : 0.08, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Derin uzaylı, düşük frekanslı matris uğultusunu (Matrix Ambient Drone) başlatır.
   */
  public startMatrixDrone(coherenceFactor: number = 1.0) {
    if (this.isDroneActive) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Çift düşük frekans osilatörü (42Hz ve 43.2Hz ile binaural vuruş)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneGain = this.ctx.createGain();

      this.droneOsc1.type = 'sawtooth';
      this.droneOsc1.frequency.setValueAtTime(42.0, this.ctx.currentTime);

      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(43.3, this.ctx.currentTime);

      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(140 + (1 - coherenceFactor) * 120, this.ctx.currentTime);
      this.droneFilter.Q.setValueAtTime(4.5, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);

      this.droneOsc1.connect(this.droneFilter);
      this.droneOsc2.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.isDroneActive = true;
    } catch {
      // Audio context might need user gesture
    }
  }

  public updateDroneCoherence(coherenceFactor: number) {
    if (!this.ctx || !this.droneFilter || !this.droneOsc1) return;
    // Bütünlük düştükçe frekans ve rezonans daha gergin ve kaotik hale gelir
    const freq = 110 + (1 - coherenceFactor) * 220;
    this.droneFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.2);
    this.droneOsc1.frequency.setTargetAtTime(40 + (1 - coherenceFactor) * 15, this.ctx.currentTime, 0.2);
  }

  /**
   * Yüksek kaliteli mekanik kripto klavye tıklaması (Tactile Keystroke)
   */
  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800 + Math.random() * 600, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  /**
   * Düğüm Bağlantısı Ses Efekti (Node Link Connected)
   */
  public playNodeConnect(frequencyMultiplier: number = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 587.33 * frequencyMultiplier; // D5 nota tabanı
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + 0.08);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  /**
   * ZKP Kanıt Doğrulama Şimesi (Zero-Knowledge Proof Verified Chord)
   */
  public playZkpSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Neon-Altın Saf Uyum Akoru: C6, E6, G6, B6
    const freqs = [1046.50, 1318.51, 1567.98, 1975.53];
    
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.035);

      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.1, t + idx * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.035 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.035);
      osc.stop(t + idx * 0.035 + 0.46);
    });
  }

  /**
   * Duvar / Güvenlik Bariyeri Çözünmesi (Collision Phasing Dissolution)
   */
  public playWallPhase() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(65, t + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.35);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.36);
  }

  /**
   * Öztürk Egemen Overdrive Başlatma & Lazer Kesme
   */
  public playOverdriveEngage() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.25);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.42);
  }

  /**
   * Overdrive Sırasında Vektör Kesme ve Kalkan Dronu Üretme Sesi
   */
  public playLaserSlice() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.12);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }
}

export const sovereignAudio = new SovereignAudioEngine();
