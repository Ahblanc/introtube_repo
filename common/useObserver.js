import { useEffect } from "react";

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = "0px",
}) => {
  useEffect(() => {
    let observer;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin]);
};
