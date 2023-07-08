import { getContext } from 'svelte';
import { Writable, writable } from 'svelte/store';

import type { MantineColorScheme } from '../theme.types';
import type { MantineContextValue } from '../MantineProvider.svelte';

function disableTransition() {
  const style = document.createElement('style');
  style.innerHTML = '*, *::before, *::after {transition: none !important;}';
  style.setAttribute('data-mantine-disable-transition', 'true');
  document.head.appendChild(style);

  const clear = () =>
    document
      .querySelectorAll('[data-mantine-disable-transition]')
      .forEach((element) => element.remove());
  return clear;
}

interface MantineColorSchemeStore {
  clearStyles: () => void;
  timeout: number;
  colorScheme: MantineColorScheme;
}

const mantineColorSchemeStore = writable<MantineColorSchemeStore>({
  clearStyles: () => {},
  timeout: 0,
  colorScheme: 'light',
});

export function useMantineColorScheme() {
  const ctx = getContext<Writable<MantineContextValue>>('mantine-provider');

  let _setColorScheme: MantineContextValue['setColorScheme'];
  let _clearColorScheme: MantineContextValue['clearColorScheme'];
  let _colorScheme: MantineContextValue['colorScheme'] = 'auto';
  let timeoutRef: number;

  ctx.subscribe((value) => {
    _setColorScheme = value.setColorScheme;
    _clearColorScheme = value.clearColorScheme;
    _colorScheme = value.colorScheme;
  });

  mantineColorSchemeStore.subscribe((value) => {
    timeoutRef = value.timeout;
  });

  if (!ctx) {
    throw new Error('[@mantine/core] MantineProvider was not found in tree');
  }

  const setColorScheme = (value: MantineColorScheme) => {
    _setColorScheme(value);
    window.clearTimeout(timeoutRef);
    mantineColorSchemeStore.update((prev) => ({
      ...prev,
      timeout: window.setTimeout(() => {
        disableTransition();
      }, 10),
    }));
  };

  const clearColorScheme = () => {
    _clearColorScheme();
    mantineColorSchemeStore.update((prev) => ({ ...prev, clearStyles: disableTransition() }));
    window.clearTimeout(timeoutRef);

    mantineColorSchemeStore.update((prev) => ({
      ...prev,
      timeout: window.setTimeout(() => {
        prev.clearStyles?.();
      }, 10),
    }));
  };

  return {
    colorScheme: _colorScheme,
    setColorScheme,
    clearColorScheme,
  };
}
