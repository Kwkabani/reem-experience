import { useState, useEffect, useRef, useCallback } from 'react';

export interface TimedMessage {
  text: string;
  speed?: number;
  buffer?: number;
}

export interface SequenceState {
  activeIndex: number;
  isComplete: boolean;
}

export default function useSequentialMessages(messages: TimedMessage[]) {
  const [state, setState] = useState<SequenceState>({ activeIndex: 0, isComplete: false });
  const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bufferTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const clearTimers = useCallback(() => {
    if (charTimerRef.current) clearInterval(charTimerRef.current);
    if (bufferTimerRef.current) clearTimeout(bufferTimerRef.current);
    charTimerRef.current = null;
    bufferTimerRef.current = null;
  }, []);

  useEffect(() => {
    const msg = messagesRef.current[state.activeIndex];
    if (!msg || state.isComplete) return;

    const speed = msg.speed ?? 30;
    const chars = msg.text.length;
    let charIdx = 0;

    charTimerRef.current = setInterval(() => {
      charIdx++;
      if (charIdx >= chars) {
        clearTimers();
        const buffer = msg.buffer ?? Math.max(1.0, chars * 0.015);
        bufferTimerRef.current = setTimeout(() => {
          const next = state.activeIndex + 1;
          if (next >= messagesRef.current.length) {
            setState({ activeIndex: next, isComplete: true });
          } else {
            setState({ activeIndex: next, isComplete: false });
          }
        }, buffer * 1000);
      }
    }, speed);

    return clearTimers;
  }, [state.activeIndex, state.isComplete, clearTimers]);

  return state;
}
