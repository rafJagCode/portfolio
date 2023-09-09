import { useEffect, useCallback } from 'react';

const useTabHandling = () => {
  const getTabbableElements = () => {
    const topbar = document.getElementById('topbar');
    const sidebar = document.getElementById('sidebar');
    const section = fullpage_api.getActiveSection().item;
    const elements = [sidebar, topbar];
    if (sidebar.dataset.isOpen === 'false') elements.push(section);
    return elements
      .flatMap((el) => Array.from(el.querySelectorAll('*[tabindex]')))
      .filter((el) => {
        el.focus();
        return document.activeElement === el && el.tabIndex >= 0;
      })
      .sort((el1, el2) => el1.tabIndex - el2.tabIndex);
  };

  const focusNext = (tabbableElements, currentlyFocusedElement) => {
    const next = tabbableElements.find((el) => el !== currentlyFocusedElement && el.tabIndex >= currentlyFocusedElement.tabIndex) || tabbableElements.at(0);
    next.focus({ preventScroll: true });
  };

  const focusPrev = (tabbableElements, currentlyFocusedElement) => {
    const prev = tabbableElements.findLast((el) => el !== currentlyFocusedElement && el.tabIndex <= currentlyFocusedElement.tabIndex) || tabbableElements.at(-1);
    prev.focus({ preventScroll: true });
  };

  const handleTab = useCallback((e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    e.stopPropagation();
    const currentlyFocusedElement = document.activeElement;
    const tabbableElements = getTabbableElements();

    if (e.getModifierState('Shift')) return focusPrev(tabbableElements, currentlyFocusedElement);
    focusNext(tabbableElements, currentlyFocusedElement);
  }, []);

  useEffect(() => {
    addEventListener('keydown', handleTab, true);
    return () => removeEventListener('keydown', handleTab, true);
  });
};

export default useTabHandling;
