import { useCallback, useEffect, useState } from 'react';
import { ExampleData, exampleRepository } from '../service/exampleService';

export function useExampleHook() {
  const [data, setData] = useState<ExampleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await exampleRepository.fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(
    async (newData: Omit<ExampleData, 'id' | 'createdAt'>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await exampleRepository.createData(newData);
        setData((prev) => [...prev, result]);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    createData,
  };
}
