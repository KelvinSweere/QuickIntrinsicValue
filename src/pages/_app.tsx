import Layout from '@/components/layout/layout';
import store from '@/redux/store';
import '@/styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Provider } from 'react-redux';

const genericTheme = extendTheme({
  fonts: {
    text: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2806858064287732"
      />
      <ChakraProvider theme={genericTheme}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
