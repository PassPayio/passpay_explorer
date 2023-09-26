// import { Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useTranslation from 'next-translate/useTranslation';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
// import HomeChangeLanguageComponent from '@/components/home_language';
// import HomeOutlinkComponent from '@/components/home_outlink';
// import MobileNav from '@/components/MobileNav';
import SectionContainer from '@/components/SectionContainer';
import Header from '@/components/Header';
import CookieBanner from '@/components/CookieBanner';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  loading: boolean;
};

const Main = (props: IMainProps) => {
  // const { t } = useTranslation('common');
  const router = useRouter();
  const { asPath } = useRouter();

  const [scrollY, setScrollY] = useState(0);
  const [bShowHeader, setShowHeader] = useState(true);

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  const onScroll = useCallback(() => {
    console.log("xxx")
    if (scrollY > window.scrollY) {
      setShowHeader(true);
    } else if (scrollY < window.scrollY) {
      setShowHeader(false);
    }
    setScrollY(window.scrollY);
  }, [scrollY]);

  useEffect(() => {
    // add eventlistener to window
    console.log("xxxx")
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    console.log("yyy")

    };
  }, [onScroll]);

  return (
    <SectionContainer>
      {props.meta}
      <div className="flex h-screen flex-col justify-between bg-white overflow-x-hidden">
        <header
          className={`fixed top-0 left-0 z-10 w-full duration-500
        ${bShowHeader ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <Header/>
        </header>
        <motion.main
          initial={`hidden`}
          animate={`enter`}
          exit={`exit`}
          variants={variants}
          transition={{ type: 'linear' }}
          className="content mb-auto text-xl mt-[98px] relative"
        >
          {props.children}
          <div className={`${props.loading? 'visible': 'invisible'} absolute z-50 top-0
              w-full h-[calc(100vh-202px)] flex flex-col items-center justify-center bg-black/20`}>
              <div className="mx-10 flex h-[200px] w-[300px] flex-col items-center justify-center rounded-3xl bg-black/20 px-4">
                  <div className="loading-spinner "></div>
                  <span className="pt-[20px] text-[24px] text-white">
                      Processing...
                  </span>
              </div>
            </div>
        </motion.main>
        <Footer />
        <CookieBanner />
      </div>
    </SectionContainer>
  );
};

export { Main };
