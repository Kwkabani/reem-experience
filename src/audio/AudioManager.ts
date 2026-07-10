export class AudioManager {
  private ctx: AudioContext | null = null;
  private initialized = false;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch {
      console.warn('Audio not supported');
    }
  }

  dispose() {
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.initialized = false;
  }

  // BUG-02 FIX: async + await resume so sounds play on first user gesture
  async play(type: 'click' | 'success' | 'error' | 'door' | 'typing' | 'complete' | 'loading' | 'ready') {
    if (!this.ctx || !this.initialized) return;

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Some browsers block audio even after gesture; fail silently
        return;
      }
    }

    switch (type) {
      case 'click':
        this.playTone(800, 0.05, 'square', 0.1);
        break;
      case 'success':
        this.playTone(523, 0.1, 'sine', 0.15);
        this.timeouts.push(setTimeout(() => this.playTone(659, 0.1, 'sine', 0.15), 100));
        this.timeouts.push(setTimeout(() => this.playTone(784, 0.15, 'sine', 0.15), 200));
        break;
      case 'error':
        this.playTone(300, 0.15, 'sawtooth', 0.12);
        this.timeouts.push(setTimeout(() => this.playTone(200, 0.2, 'sawtooth', 0.12), 150));
        break;
      case 'door':
        this.playNoise(0.3, 0.08);
        break;
      case 'typing':
        this.playTone(1000, 0.02, 'sine', 0.04);
        break;
      case 'complete':
        this.playTone(262, 0.15, 'sine', 0.1);
        this.timeouts.push(setTimeout(() => this.playTone(330, 0.15, 'sine', 0.1), 150));
        this.timeouts.push(setTimeout(() => this.playTone(392, 0.15, 'sine', 0.1), 300));
        this.timeouts.push(setTimeout(() => this.playTone(523, 0.3, 'sine', 0.15), 450));
        break;
      case 'loading':
        this.playTone(200, 0.08, 'sine', 0.05);
        break;
      case 'ready':
        this.playSweep(300, 600, 0.15, 'sine', 0.1);
        break;
    }
  }

  private playTone(freq: number, duration: number, type: OscillatorType, volume: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  private playSweep(startFreq: number, endFreq: number, duration: number, type: OscillatorType, volume: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(endFreq, this.ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  private playNoise(duration: number, volume: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start();
  }
}
