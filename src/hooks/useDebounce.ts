import { useEffect, useState } from 'react';

/**
 * 
 * Hook that is used to limit function calls.
 * 
 * To 'debounce' means to use an internal timer to execute a callback function at a specific interval.
 * 
 * @param value The value to be 'debounced'
 * @param delay Time of delay in miliseconds
 * @returns 
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
