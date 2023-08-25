import Layout from '@/components/layout/layout';
import store from '@/redux/store';
import '@/styles/globals.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
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
