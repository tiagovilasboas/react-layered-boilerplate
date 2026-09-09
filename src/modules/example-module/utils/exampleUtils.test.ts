import { describe, expect, it, vi } from 'vitest';

import { debounce, formatDate, generateId, truncateText } from './exampleUtils';

describe('exampleUtils', () => {
  it('formats dates in pt-BR', () => {
    const formatted = formatDate(new Date('2026-01-15T12:30:00.000Z'));
    expect(formatted).toMatch(/2026/);
    expect(formatted).toMatch(/janeiro/i);
  });

  it('truncates text longer than maxLength', () => {
    expect(truncateText('hello', 10)).toBe('hello');
    expect(truncateText('hello world', 5)).toBe('hello...');
  });

  it('generates a non-empty id', () => {
    expect(generateId().length).toBeGreaterThan(0);
  });

  it('debounces calls', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const debounced = debounce(spy, 100);

    debounced('a');
    debounced('b');
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('b');
    vi.useRealTimers();
  });
});
