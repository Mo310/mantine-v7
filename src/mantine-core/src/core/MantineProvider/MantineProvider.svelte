<!-- https://github.com/mantinedev/mantine-v7/tree/master/src/mantine-core/src/core/MantineProvider -->

<script lang="ts" context="module">
  import type { MantineColorScheme, MantineTheme, MantineThemeOverride } from './theme.types';
  import type { MantineColorSchemeManager } from './color-scheme-managers';
  import type { CSSVariablesResolver } from './MantineCssVariables';
  import type { ConvertCSSVariablesInput } from './convert-css-variables';

  export interface MantineProviderProps {
    /** Theme override object */
    theme?: MantineThemeOverride;

    /** Used to retrieve/set color scheme value in external storage, by default uses `window.localStorage` */
    colorSchemeManager?: MantineColorSchemeManager;

    /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage, `auto` by default */
    defaultColorScheme?: MantineColorScheme;

    /** CSS selector to which CSS variables should be added, `:root` by default */
    cssVariablesSelector?: string;

    /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`, `true` by default */
    withCssVariables?: boolean;

    /** Function to resolve root element to set `data-mantine-color-scheme` attribute, must return undefined on server, `() => document.documentElement` by default */
    getRootElement?(): HTMLElement | undefined;

    /** A prefix for components static classes (for example {selector}-Text-root), `mantine` by default */
    classNamesPrefix?: string;

    /** Function to generate nonce attribute added to all generated `<style />` tags */
    getStyleNonce?(): string;

    /** Function to generate CSS variables based on theme object */
    cssVariablesResolver?: CSSVariablesResolver;
  }

  export interface MantineContextValue {
    colorScheme: MantineColorScheme;
    setColorScheme(colorScheme: MantineColorScheme): void;
    clearColorScheme(): void;
    colorSchemeManager: MantineColorSchemeManager;
    getRootElement(): HTMLElement | undefined;
    // classNamesPrefix: string;
    getStyleNonce?(): string | undefined;
    cssVariablesResolver?(theme: MantineTheme): ConvertCSSVariablesInput;
  }
</script>

<script lang="ts">
      import './styles/css-reset.scss';
  import './styles/default-css-variables.scss';
  import './styles/global-styles.scss';

  import { localStorageColorSchemeManager } from './color-scheme-managers';
  import {type  Writable, writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let theme: MantineThemeOverride = {};
  export let colorSchemeManager: MantineColorSchemeManager = localStorageColorSchemeManager();
  export let defaultColorScheme: MantineColorScheme = 'auto';
//   export let cssVariablesSelector = ':root'; //TODO: add this ?
//   export let withCssVariables = true; //TODO:  add this ?
  export let getRootElement = () => document.documentElement;
  //   export let classNamesPrefix: string  = "mantine" //TODO: dont think this works in svelte
  export let getStyleNonce: (() => string) | undefined = undefined;
  export let cssVariablesResolver: CSSVariablesResolver | undefined = undefined;

  /**
   * useProviderColorScheme
   * https://github.com/mantinedev/mantine-v7/blob/master/src/mantine-core/src/core/MantineProvider/use-mantine-color-scheme/use-provider-color-scheme.ts
   */ 

  let colorScheme = colorSchemeManager.get(defaultColorScheme);

  function setColorSchemeAttribute(colorScheme: MantineColorScheme) {
    const computedColorScheme =
      colorScheme !== 'auto'
        ? colorScheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    getRootElement()?.setAttribute('data-mantine-color-scheme', computedColorScheme);
  }

  const listener = (event: Event & {matches: boolean; media: string; currentTarget: EventTarget & Window }) => {
    if (colorScheme === 'auto') {
      setColorSchemeAttribute(event.matches ? 'dark' : 'light');
    }
  };

  const setColorScheme = (scheme: MantineColorScheme) => {
    colorScheme = scheme;
    colorSchemeManager.set(scheme);
    setColorSchemeAttribute(scheme);
  };

  const clearColorScheme = () => {
    colorScheme = defaultColorScheme;
    colorSchemeManager.clear();
    setColorSchemeAttribute(defaultColorScheme);
  };

  if (theme.respectReducedMotion  )  {
    getRootElement()?.setAttribute('data-reduced-motion', 'true');
  }

  const contextStore = writable<MantineContextValue>({
    colorSchemeManager,
    colorScheme,
    setColorScheme,
    clearColorScheme,
    getRootElement,
    // classNamesPrefix,
    getStyleNonce,
    cssVariablesResolver,
  });

  setContext<Writable<MantineContextValue>>('mantine-provider', contextStore);
</script>

<svelte:window on:change={listener} />
<slot />
