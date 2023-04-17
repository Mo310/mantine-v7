import type { ButtonFactory, ButtonGroupFactory } from '@mantine/core';
import type { StylesApiData } from '../types';

export const ButtonStylesApi: StylesApiData<ButtonFactory> = {
  selectors: {
    root: 'Root element',
    loader: 'Loader component, displayed only when loading prop is set',
    inner: 'Contains all other elements, child of root',
    section: 'Left and right sections of the button',
    label: 'Button children',
  },

  vars: {
    root: {
      '--button-bg': 'Controls background',
      '--button-bd': 'Control border',
      '--button-hover': 'Controls background when hovered',
      '--button-color': 'Control color',
      '--button-radius': 'Controls border-radius',
      '--button-height': 'Controls height of the button',
      '--button-padding-x': 'Controls horizontal padding of the button',
      '--button-fz': 'Controls font-size of the button',
    },
  },

  modifiers: [
    { modifier: 'data-disabled', selector: 'root', condition: 'disabled prop is set' },
    { modifier: 'data-loading', selector: ['root', 'label'], condition: 'loading prop is set' },
    { modifier: 'data-block', selector: 'root', condition: 'fullWidth prop is set' },
    { modifier: 'data-with-left-section', selector: 'root', value: 'leftSection is set' },
    { modifier: 'data-with-right-section', selector: 'root', value: 'rightSection is set' },
    { modifier: 'data-position', selector: 'section', value: 'Section position: left or right' },
  ],
};

export const ButtonGroupStylesApi: StylesApiData<ButtonGroupFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--button-border-width':
        'Controls border width of child Button components that are placed beside one another',
    },
  },

  modifiers: [
    { modifier: 'data-orientation', selector: 'root', value: 'Value of orientation prop' },
  ],
};
