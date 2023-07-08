<script lang="ts" context="module">
  import type { PolymorphicFactory, StylesApiProps } from '../../core';
  import type { BoxComponentProps } from '../../core/Box/Box.svelte';

  export type UnstyledButtonStylesNames = 'root';

  export interface UnstyledButtonProps
    extends Omit<BoxComponentProps, 'vars' | 'variant'>,
      StylesApiProps<UnstyledButtonFactory> {
    __staticSelector?: string;
  }

  export type UnstyledButtonFactory = PolymorphicFactory<{
    props: UnstyledButtonProps;
    stylesNames: UnstyledButtonStylesNames;
    defaultComponent: 'button';
    defaultRef: HTMLButtonElement;
  }>;
</script>

<script lang="ts">
  export let tag: keyof svelteHTML.IntrinsicElements = 'button';
  export let ref: HTMLElement | null = null;

  type $$Props = UnstyledButtonProps & { tag?: keyof svelteHTML.IntrinsicElements };
</script>

<svelte:element this={tag} class:root={true} bind:this={ref} {...$$restProps}>
  <slot />
</svelte:element>

<style lang="scss">
  .root {
    background-color: transparent;
    cursor: pointer;
    border: 0;
    padding: 0;
    appearance: none;
    font-size: var(--mantine-font-size-md);
    text-align: left;
    text-decoration: none;
    color: inherit;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
</style>
