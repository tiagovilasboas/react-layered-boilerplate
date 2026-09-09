import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createExampleRepository } from '../service/exampleService';

import { useExampleHook } from './useExampleHook';

describe('useExampleHook', () => {
  it('loads data from the injected repository', async () => {
    const repository = createExampleRepository({
      kind: 'memory',
      initialData: [
        {
          id: '1',
          name: 'Alpha',
          description: 'First',
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
        },
      ],
    });

    const { result } = renderHook(() => useExampleHook(repository));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe('Alpha');
    expect(result.current.error).toBeNull();
  });

  it('appends created items and surfaces repository errors', async () => {
    const repository = createExampleRepository({ kind: 'memory' });
    const { result } = renderHook(() => useExampleHook(repository));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.createData({
        name: 'Beta',
        description: 'Second',
      });
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe('Beta');

    const failing = {
      fetchData: async () => {
        throw new Error('boom');
      },
      createData: async () => {
        throw new Error('cannot create');
      },
    };

    const failingHook = renderHook(() => useExampleHook(failing));
    await waitFor(() => {
      expect(failingHook.result.current.error).toBe('boom');
    });

    await expect(
      act(async () => {
        await failingHook.result.current.createData({
          name: 'Nope',
          description: 'Fails',
        });
      }),
    ).rejects.toThrow('cannot create');
  });
});
