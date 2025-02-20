import React from 'react';
import { StylesApiProps, factory, useProps, Factory } from '../../core';
import { ModalBaseOverlay, ModalBaseOverlayProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalOverlayStylesNames = 'overlay';

export interface ModalOverlayProps
  extends ModalBaseOverlayProps,
    StylesApiProps<ModalOverlayFactory> {}

export type ModalOverlayFactory = Factory<{
  props: ModalOverlayProps;
  ref: HTMLDivElement;
  stylesNames: ModalOverlayStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalOverlayProps> = {};

export const ModalOverlay = factory<ModalOverlayFactory>((_props, ref) => {
  const props = useProps('ModalOverlay', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;

  const ctx = useModalContext();

  return (
    <ModalBaseOverlay
      ref={ref}
      {...ctx.getStyles('overlay', { classNames, style, styles, className })}
      {...others}
    />
  );
});

ModalOverlay.classes = classes;
ModalOverlay.displayName = '@mantine/core/ModalOverlay';
