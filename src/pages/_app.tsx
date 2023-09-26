import '../styles/globals.css';
import 'swiper/css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import WalletProvider from '@/context/walletContext';
// import { ThemeProvider } from '@emotion/react';
import {ThemeProvider, useTheme} from 'next-themes';
const MyApp = ({ Component, pageProps, router }: AppProps) => {
    const [ready, setReady] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    useEffect(() => {
      setReady(true);
    }, []);

    return (
      <>
        {ready? (
          <ThemeProvider attribute = "class">
            <WalletProvider>
              <Component key={router.route} {...pageProps} />
            </WalletProvider>
          </ThemeProvider>
          )
       : null }
      </>
    );
};

export default MyApp;