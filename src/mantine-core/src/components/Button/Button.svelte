<script lang="ts" context="module">
  import type {
    BoxProps,
    MantineColor,
    MantineGradient,
    MantineRadius,
    MantineSize,
    PolymorphicFactory,
    StylesApiProps,
  } from '../../core';
  import type { LoaderProps } from '../Loader';
  import type { ButtonGroup } from './ButtonGroup/ButtonGroup';

  export type ButtonStylesNames = 'root' | 'inner' | 'loader' | 'section' | 'label';
  export type ButtonVariant =
    | 'filled'
    | 'light'
    | 'outline'
    | 'transparent'
    | 'white'
    | 'subtle'
    | 'default'
    | 'gradient';

  export type ButtonCssVariables = {
    root:
      | '--button-justify'
      | '--button-height'
      | '--button-padding-x'
      | '--button-fz'
      | '--button-radius'
      | '--button-bg'
      | '--button-hover'
      | '--button-color'
      | '--button-bd';
  };

  type ButtonSize = MantineSize | `compact-${MantineSize}` | (string & {});

  export interface ButtonProps extends BoxProps, StylesApiProps<ButtonFactory> {
    'data-disabled'?: boolean;

    /** Controls button `height`, `font-size` and horizontal `padding`, `'sm'` by default */
    size?: ButtonSize;

    /** Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default */
    color?: MantineColor;

    /** Sets `justify-content` of `inner` element, can be used to change distribution of sections and label, `'center'` by default */
    justify?: React.CSSProperties['justifyContent'];

    /** Content displayed on the left side of the button label */
    // leftSection?: React.ReactNode;

    /** Content displayed on the right side of the button label */
    // rightSection?: React.ReactNode;

    /** Determines whether button should take 100% width of its parent container, `false` by default */
    fullWidth?: boolean;

    /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
    radius?: MantineRadius | (string & {}) | number;

    /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
    gradient?: MantineGradient;

    /** Indicates disabled state */
    disabled?: boolean;

    /** Button content */
    children?: React.ReactNode;

    /** Determines whether the `Loader` component should be displayed over the button */
    loading?: boolean;

    /** Props added to the `Loader` component (only visible when `loading` prop is set) */
    loaderProps?: LoaderProps;
  }

  export type ButtonFactory = PolymorphicFactory<{
    props: ButtonProps;
    defaultRef: HTMLButtonElement;
    defaultComponent: 'button';
    stylesNames: ButtonStylesNames;
    vars: ButtonCssVariables;
    staticComponents: {
      Group: typeof ButtonGroup;
    };
  }>;
</script>

<script lang="ts">
  import UnstyledButton from '../UnstyledButton/UnstyledButton.svelte';

  export let size: ButtonSize = 'sm';
  export let variant: ButtonVariant = 'filled';
  export let loading = false;
</script>

<button class="root">
  <span class="inner">
    {#if $$slots.leftSection}
      <span class="section left">
        <slot name="leftSection" />
      </span>
    {/if}

    {#if loading}
      <span>
        <!-- TODO: Loader component -->
      </span>
    {/if}

    <span class="label" class:loading>
      <slot />
    </span>

    {#if $$slots.rightSection}
      <span class="section right">
        <slot name="rightSection" />
      </span>
    {/if}
  </span>
</button>

<style lang="scss">
  .root {
    --button-height-xs: rem(30px);
    --button-height-sm: rem(36px);
    --button-height-md: rem(42px);
    --button-height-lg: rem(50px);
    --button-height-xl: rem(60px);

    --button-height-compact-xs: rem(22px);
    --button-height-compact-sm: rem(26px);
    --button-height-compact-md: rem(30px);
    --button-height-compact-lg: rem(34px);
    --button-height-compact-xl: rem(40px);

    --button-padding-x-xs: rem(14px);
    --button-padding-x-sm: rem(18px);
    --button-padding-x-md: rem(22px);
    --button-padding-x-lg: rem(26px);
    --button-padding-x-xl: rem(32px);

    --button-padding-x-compact-xs: rem(7px);
    --button-padding-x-compact-sm: rem(8px);
    --button-padding-x-compact-md: rem(10px);
    --button-padding-x-compact-lg: rem(12px);
    --button-padding-x-compact-xl: rem(14px);

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

    user-select: none;
    font-weight: 600;
    position: relative;
    line-height: 1;
    text-align: center;

    width: var(--_button-width, auto);
    cursor: var(--_button-cursor, pointer);
    display: var(--_button-display, inline-block);
    border-radius: var(--button-radius);
    font-size: var(--button-fz);
    background: var(--_button-bg, var(--button-bg));
    border: var(--_button-bd, var(--button-bd));
    color: var(--_button-color, var(--button-color));
    height: var(--button-height);
    padding-left: var(--_button-padding-left, var(--button-padding-x));
    padding-right: var(--_button-padding-right, var(--button-padding-x));

    &[data-block] {
      --_button-display: block;
      --_button-width: 100%;
    }

    &[data-with-left-section] {
      --_button-padding-left: calc(var(--button-padding-x) / 1.5);

      @mixin rtl {
        --_button-padding-left: var(--button-padding-x);
        --_button-padding-right: calc(var(--button-padding-x) / 1.5);
      }
    }

    &[data-with-right-section] {
      --_button-padding-right: calc(var(--button-padding-x) / 1.5);

      @mixin rtl {
        --_button-padding-right: var(--button-padding-x);
        --_button-padding-left: calc(var(--button-padding-x) / 1.5);
      }
    }

    &:disabled:not([data-loading]),
    &[data-disabled]:not([data-loading]) {
      --_button-cursor: not-allowed;
      --_button-bg: var(--_disabled-bg);
      --_button-color: var(--_disabled-color);
      transform: none;
    }

    &[data-loading] {
      --_button-cursor: not-allowed;

      transform: none;

      &::before {
        content: '';
        position: absolute;
        inset: rem(-1px);
        border-radius: var(--button-radius);
        background-color: var(--_button-loading-overlay-bg);
      }
    }

    @mixin hover {
      &:not([data-loading]):not(:disabled):not([data-disabled]) {
        --_button-bg: var(--button-hover);
      }
    }

    @mixin light {
      --_disabled-color: var(--mantine-color-gray-5);
      --_disabled-bg: var(--mantine-color-gray-1);
      --_button-loading-overlay-bg: rgba(255, 255, 255, 0.35);
    }

    @mixin dark {
      --_disabled-color: var(--mantine-color-dark-3);
      --_disabled-bg: var(--mantine-color-dark-6);
      --_button-loading-overlay-bg: rgba(0, 0, 0, 0.35);
    }
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: var(--button-justify, center);
    height: 100%;
    overflow: visible;
  }

  .label {
    white-space: nowrap;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    opacity: var(--_button-label-opacity, 1);

    &.loading {
      --_button-label-opacity: 0.2;
    }
  }

  .section {
    display: flex;
    align-items: center;
    margin-right: var(--_button-section-margin-right);
    margin-left: var(--_button-section-margin-left);

    &.left {
      --_button-section-margin-right: var(--mantine-spacing-xs);

      @mixin rtl {
        --_button-section-margin-right: 0;
        --_button-section-margin-left: var(--mantine-spacing-xs);
      }
    }

    &.right {
      --_button-section-margin-left: var(--mantine-spacing-xs);

      @mixin rtl {
        --_button-section-margin-left: 0;
        --_button-section-margin-right: var(--mantine-spacing-xs);
      }
    }
  }

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
