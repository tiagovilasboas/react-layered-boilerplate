import { describe, expect, it, vi } from 'vitest';

import { createExampleRepository, type ExampleDataDto } from './exampleService';

const jsonResponse = (body: unknown, ok = true, status = 200): Response =>
  ({
    ok,
    status,
    json: async () => body,
  }) as Response;

describe('createExampleRepository', () => {
  it('defaults to an in-memory implementation', async () => {
    const repository = createExampleRepository();
    await expect(repository.fetchData()).resolves.toEqual([]);
  });

  it('seeds and mutates in-memory data without touching the network', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const repository = createExampleRepository({
      kind: 'memory',
      initialData: [
        {
          id: 'seed',
          name: 'Seed',
          description: 'From factory',
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
        },
      ],
    });

    const created = await repository.createData({
      name: 'New',
      description: 'Added',
    });
    const all = await repository.fetchData();

    expect(all).toHaveLength(2);
    expect(all[1]).toMatchObject({ name: 'New', description: 'Added' });
    expect(created.id).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('maps HTTP DTOs onto the domain model', async () => {
    const dto: ExampleDataDto = {
      id: '1',
      name: 'Remote',
      description: 'From API',
      createdAt: '2026-02-02T00:00:00.000Z',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => jsonResponse([dto])),
    );

    const repository = createExampleRepository({
      kind: 'http',
      baseUrl: 'https://api.example.com',
    });
    const [item] = await repository.fetchData();

    expect(item.name).toBe('Remote');
    expect(item.createdAt).toBeInstanceOf(Date);
    expect(item.createdAt.toISOString()).toBe(dto.createdAt);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');
    vi.unstubAllGlobals();
  });

  it('maps HTTP create responses and throws on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === 'POST') {
          return jsonResponse({
            id: '2',
            name: 'Posted',
            description: 'Created',
            createdAt: '2026-03-03T00:00:00.000Z',
          });
        }
        return jsonResponse(null, false, 500);
      }),
    );

    const repository = createExampleRepository({ kind: 'http' });
    const created = await repository.createData({
      name: 'Posted',
      description: 'Created',
    });

    expect(created.createdAt).toBeInstanceOf(Date);
    await expect(repository.fetchData()).rejects.toThrow('HTTP error! status: 500');
    vi.unstubAllGlobals();
  });
});
