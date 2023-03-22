import React from 'react';
import { render, tests } from '@mantine/tests';
import { Highlight, HighlightProps, HighlightStylesNames } from './Highlight';

const defaultProps: HighlightProps = {
  children: 'test',
  highlight: 't',
};

describe('@mantine/core/Highlight', () => {
  tests.itSupportsSystemProps<HighlightProps, HighlightStylesNames>({
    component: Highlight,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/Highlight',
    stylesApiSelectors: ['root'],
  });

  it('highlights correct value', () => {
    const { container } = render(<Highlight highlight="he">Hello</Highlight>);
    expect(container.querySelector('mark')!.textContent).toBe('He');
  });
});
