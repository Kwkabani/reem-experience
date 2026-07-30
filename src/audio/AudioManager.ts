import { AUDIO_TONES } from '../config/audio';

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
      // Audio not supported - silently ignore
    }
  }

  dispose() {
    this.timeouts.forEach((t) => clearTimeout(t));
    this.timeouts = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.initialized = false;
  }

  // BUG-02 FIX: async + await resume so sounds play on first user gesture
  async play(
    type:
      | 'click'
      | 'success'
      | 'error'
      | 'door'
      | 'typing'
      | 'typing_soft'
      | 'complete'
      | 'loading'
      | 'ready',
  ) {
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
        this.playTone(
          AUDIO_TONES.click.freq,
          AUDIO_TONES.click.duration,
          AUDIO_TONES.click.type,
          AUDIO_TONES.click.volume,
        );
        break;
      case 'success':
        for (const tone of AUDIO_TONES.success) {
          if ('delay' in tone && tone.delay) {
            this.timeouts.push(
              setTimeout(
                () => this.playTone(tone.freq, tone.duration, tone.type, tone.volume),
                tone.delay,
              ),
            );
          } else {
            this.playTone(tone.freq, tone.duration, tone.type, tone.volume);
          }
        }
        break;
      case 'error':
        for (const tone of AUDIO_TONES.error) {
          if ('delay' in tone && tone.delay) {
            this.timeouts.push(
              setTimeout(
                () => this.playTone(tone.freq, tone.duration, tone.type, tone.volume),
                tone.delay,
              ),
            );
          } else {
            this.playTone(tone.freq, tone.duration, tone.type, tone.volume);
          }
        }
        break;
      case 'door':
        this.playNoise(AUDIO_TONES.door.noiseDuration, AUDIO_TONES.door.volume);
        break;
      case 'typing':
        this.playTone(
          AUDIO_TONES.typing.freq,
          AUDIO_TONES.typing.duration,
          AUDIO_TONES.typing.type,
          AUDIO_TONES.typing.volume,
        );
        break;
      case 'typing_soft':
        this.playTone(
          AUDIO_TONES.typing_soft.freq,
          AUDIO_TONES.typing_soft.duration,
          AUDIO_TONES.typing_soft.type,
          AUDIO_TONES.typing_soft.volume,
        );
        break;
      case 'complete':
        for (const tone of AUDIO_TONES.complete) {
          if ('delay' in tone && tone.delay) {
            this.timeouts.push(
              setTimeout(
                () => this.playTone(tone.freq, tone.duration, tone.type, tone.volume),
                tone.delay,
              ),
            );
          } else {
            this.playTone(tone.freq, tone.duration, tone.type, tone.volume);
          }
        }
        break;
      case 'loading':
        this.playTone(
          AUDIO_TONES.loading.freq,
          AUDIO_TONES.loading.duration,
          AUDIO_TONES.loading.type,
          AUDIO_TONES.loading.volume,
        );
        break;
      case 'ready':
        this.playSweep(
          AUDIO_TONES.ready.startFreq,
          AUDIO_TONES.ready.endFreq,
          AUDIO_TONES.ready.duration,
          AUDIO_TONES.ready.type,
          AUDIO_TONES.ready.volume,
        );
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

  private playSweep(
    startFreq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType,
    volume: number,
  ) {
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
