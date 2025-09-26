'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import type { PropsWithChildren } from 'react';
import { system } from '@/lib/theme';

export function Provider(props: PropsWithChildren<object>) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
