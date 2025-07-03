import { useState, useCallback } from 'react';

export function useExampleHook(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [count, setCount] = useState(0);

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
    setCount(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setCount(0);
  }, [initialValue]);

  return {
    value,
    count,
    updateValue,
    reset,
  };
} 