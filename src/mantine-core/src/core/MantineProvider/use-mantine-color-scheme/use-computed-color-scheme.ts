import { useColorScheme, UseMediaQueryOptions } from '@mantine/hooks';

import { useMantineColorScheme } from './react-use-mantine-color-scheme';

export function useComputedColorScheme(
  defaultValue: 'light' | 'dark',
  options: UseMediaQueryOptions = { getInitialValueInEffect: true }
) {
  const osColorScheme = useColorScheme(defaultValue, options);
  const { colorScheme } = useMantineColorScheme();
  return colorScheme === 'auto' ? osColorScheme : colorScheme;
}
