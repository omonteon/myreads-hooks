import { useCallback } from 'react';

/**
   * Debounce function taken from: https://www.freecodecamp.org/news/javascript-debounce-example/
   * 
   * @param {Function} func Function to be delayed
   * @param {number} timeout Delay of function execution in ms
   * @returns {Function} A function to be delayed by the specified timeout
   */
 function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
  return debouncedFn;
}

export default useDebounce;