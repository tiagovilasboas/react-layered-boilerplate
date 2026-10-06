import { useCallback, useEffect, useState } from 'react';

import {
  ExampleData,
  ExampleRepository,
  exampleRepository,
} from '../service/exampleService';

export interface UseExampleHookResult {
  data: ExampleData[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  createData: (
    newData: Omit<ExampleData, 'id' | 'createdAt'>,
  ) => Promise<ExampleData>;
}

export function useExampleHook(
  repository: ExampleRepository = exampleRepository,
): UseExampleHookResult {
  const [data, setData] = useState<ExampleData[]>([]);
  // Starts as true because the effect below loads data on mount.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await repository.fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const createData = useCallback(
    async (newData: Omit<ExampleData, 'id' | 'createdAt'>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await repository.createData(newData);
        setData((prev) => [...prev, result]);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [repository],
  );

  // Initial load: state is only set from promise callbacks (not synchronously
  // in the effect body), and stale responses are ignored after cleanup.
  useEffect(() => {
    let ignore = false;
    repository
      .fetchData()
      .then(
        (result) => {
          if (!ignore) setData(result);
        },
        (err: unknown) => {
          if (!ignore) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
        },
      )
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [repository]);

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
  };
}
