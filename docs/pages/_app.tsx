import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/ds/styles.css';
import '@mantine/demos/styles.css';

import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, DirectionProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MdxProvider } from '@/components/MdxProvider';
import { HotKeysHandler } from '@/components/HotKeysHandler';
import { Search } from '@/components/Search';
import { FontsStyle } from '@/fonts';
import { theme } from '../theme';
import '../styles/variables.css';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <FontsStyle />
      <DirectionProvider initialDirection="ltr" detectDirection={false}>
        <MantineProvider theme={theme}>
          <Search />
          <Notifications />
          <MdxProvider>
            <HotKeysHandler />
            <Component {...pageProps} />
          </MdxProvider>
        </MantineProvider>
      </DirectionProvider>
    </>
  );
}
