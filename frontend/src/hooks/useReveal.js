import { useEffect } from 'react';

const useReveal = () => {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const observed = new WeakSet();
    const timers = new Set();
    const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    let observer = null;

    const revealElement = (element, delay = 0) => {
      const timer = window.setTimeout(() => {
        element.classList.add('visible');
        timers.delete(timer);
      }, delay);

      timers.add(timer);
    };

    const observeElement = (element) => {
      if (!(element instanceof HTMLElement) || observed.has(element)) {
        return;
      }

      observed.add(element);

      if (!hasIntersectionObserver) {
        revealElement(element);
        return;
      }

      observer.observe(element);
    };

    const scan = (root) => {
      if (!(root instanceof HTMLElement)) {
        return;
      }

      if (root.matches(selectors)) {
        observeElement(root);
      }

      root.querySelectorAll(selectors).forEach(observeElement);
    };

    if (hasIntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const siblings = Array.from(
                entry.target.parentElement?.querySelectorAll(selectors) || []
              );
              const index = siblings.indexOf(entry.target);
              const delay = Math.max(index, 0) * 80;

              revealElement(entry.target, delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
    }

    scan(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          scan(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);
};

export default useReveal;
