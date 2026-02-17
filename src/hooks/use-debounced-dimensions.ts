"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(
  ref: RefObject<HTMLElement | null>,
  debounceMs: number = 100
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    updateDimensions();

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, debounceMs);
    };

    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [ref, debounceMs, updateDimensions]);

  return dimensions;
}
