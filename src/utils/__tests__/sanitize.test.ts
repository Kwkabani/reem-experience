import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../sanitize';

describe('sanitizeInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
  });

  it('strips javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('passes clean text through', () => {
    expect(sanitizeInput('Hello World')).toBe('Hello World');
  });

  it('handles empty string', () => {
    expect(sanitizeInput('')).toBe('');
  });
});
