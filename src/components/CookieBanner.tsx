import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DefaultButton from './ButtonComponents';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const variants = {
    hidden: { opacity: 0, x: 0, y: 120 },
    enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, y: 0},
  };

  useEffect(() => {
    const hasAcceptedCookies = Cookies.get('acceptedCookies');
    setShowBanner(!hasAcceptedCookies);
  }, []);

  const acceptCookies = () => {
    Cookies.set('acceptedCookies', 'true', { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <motion.main className="cookie-banner fixed bottom-0 w-full bg-white h-[120px] py-4 px-[5%] flex flex-row z-50 border-t"
          initial={`hidden`}
          animate={`enter`}
          exit={`exit`}
          variants={variants}
          transition={{ type: 'linear' }}
    >
      <div className='flex flex-row w-full'>
        <p>PassPayではCookieを使用します。詳しくは</p>
        <Link
          className='text-blue-500' 
          href={'https://pp.passpay.io/'} 
          target={'_blank'}
        >
          こちら
        </Link>
        <p>をご覧ください。</p>
      </div>
      <div className='w-full flex justify-end h-fit'>
        <DefaultButton clickhandler={acceptCookies} name="閉じる" disabled={false} type={"button"} classname="px-4 py-2"/>
      </div>
    </motion.main>
  );
};

export default CookieBanner;