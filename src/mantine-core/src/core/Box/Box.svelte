<script lang="ts" context="module">
  import type { CssVarsProp, MantineStyleProp } from './Box.types';
  import type { MantineStyleProps } from './style-props';

  export type Mod = Record<string, any> | string;
  export type BoxMod = Mod | Mod[] | BoxMod[];

  export interface BoxProps extends MantineStyleProps {
    /** Class added to root element, if applicable */
    class?: string;

    /** Inline style added to root component element, can subscribe to theme defined on MantineProvider */
    style?: MantineStyleProp;

    /** CSS variables defined on root component element */
    __vars?: CssVarsProp;
  }

  export type ElementProps<
    ElementType extends React.ElementType,
    PropsToOmit extends string = never
  > = Omit<React.ComponentPropsWithoutRef<ElementType>, 'style' | PropsToOmit>;

  export interface BoxComponentProps extends BoxProps {
    /** Variant passed from parent component, sets `data-variant` */
    variant?: string;

    /** Size passed from parent component, sets `data-size` if value is not number like */
    size?: string | number;

    /** Element modifiers transformed into `data-` attributes, for example, `{ 'data-size': 'xl' }`, falsy values are removed */
    mod?: BoxMod;
  }
</script>

<script lang="ts">
  export let tag: keyof svelteHTML.IntrinsicElements = 'div';
  export let ref: HTMLElement | null = null;
</script>

<svelte:element this={tag} bind:this={ref}>
  <slot />
</svelte:element>

<style lang="scss"></style>
