import '../styles/globals.css';
import 'swiper/css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import WalletProvider from '@/context/walletContext';
// import { ThemeProvider } from '@emotion/react';
import {ThemeProvider, useTheme} from 'next-themes';
import Script from 'next/script';

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
              <>
                <Script id="Adsense-id" data-ad-client="ca-pub-3207293807232248"
                  async strategy="afterInteractive"
                  onError={ (e) => { console.error('Script failed to load', e) }}
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                  crossOrigin="anonymous"
                />
                <Component key={router.route} {...pageProps} />
              </>
            </WalletProvider>
          </ThemeProvider>
          )
       : null }
      </>
    );
};

export default MyApp;