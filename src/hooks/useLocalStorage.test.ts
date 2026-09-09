import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  let mockStorage: Record<string, string> = {};
  let mockGetItem: ReturnType<typeof vi.fn>;
  let mockSetItem: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockStorage = {};
    mockGetItem = vi.fn((key: string) => mockStorage[key] || null);
    mockSetItem = vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    });

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('should return default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
    expect(mockGetItem).toHaveBeenCalledWith('test-key');
  });

  it('should return stored value from localStorage', () => {
    mockStorage['test-key'] = '"stored-value"';

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('stored-value');
  });

  it('should update value and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(mockSetItem).toHaveBeenCalledWith('test-key', '"new-value"');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(mockSetItem).toHaveBeenCalledWith('test-key', '1');
  });

  it('should handle invalid JSON gracefully', () => {
    mockStorage['test-key'] = 'invalid-json';

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('should handle null from localStorage', () => {
    mockGetItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });
});
