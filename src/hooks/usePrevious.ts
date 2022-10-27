import { useRef, useEffect } from 'react';

/**
 * This is a common use-case for retrieving previous values of props or state
 * when in a functional component (hence without lifecycle methods or a specific instance).
 *
 * Leverages the internal useRef hook to create a container which has a mutable property.
 * 
 * Reference: // https://usehooks.com/usePrevious/
 *
 * @param value Any value, hence the generic
 * @returns returns 'previous' value, that was passed into this hook on last render
 */
function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable
  // and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default usePrevious;
