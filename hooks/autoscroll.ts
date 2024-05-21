import { useEffect, MutableRefObject } from "react";

// Custom hook for smooth scrolling to the bottom of a container
const useSmoothScrollIntoView = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  dependencies: any[] = []
) => {
  useEffect(() => {
    // Scroll to the bottom whenever dependencies change
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, dependencies);
};

export default useSmoothScrollIntoView;

