// import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useTranslation from 'next-translate/useTranslation';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import SectionContainer from '@/components/SectionContainer';
import Header from '@/components/Header';
import { title } from 'process';

type ISingleProps = {
  meta: ReactNode;
  title: string;
  hidetitle?: boolean;
  description: string;
  hidedescription?: boolean;
  children: ReactNode;
  loading?: boolean;
};

const SinglePage = (props: ISingleProps) => {
  // const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <SectionContainer>
      {props.meta}
      <div className="flex min-h-[700px] h-[100vh] flex-col lg:flex-row justify-start bg-[#4F4F4F]">
        <div className="lg:flex flex-col min-w-[400px] w-fit max-w-[40%] px-[50px] hidden">
          <div className='w-full pt-[88px]'>
            <button onClick={()=>{router.push("/");}} property={"button"}>
              <Image 
                  alt={'logo'}
                  src={`${router.basePath}/assets/images/logo_white.png`} 
                  width={186}
                  height={43}
              />
            </button>
          </div>
          <div className='flex flex-col w-full pt-[40px]'>
            <h1 className={`${props.hidetitle? 'hidden lg:block' :''} font-bold text-[72px] text-white leading-tight`}>
              {props.title}
            </h1>
            <div className={`${props.hidedescription?'hidden lg:block' : ''} text-[24px] text-white pt-[40px]`}>
              {props.description}
            </div>
          </div>
        </div>
        <div className='bg-white min-h-[700px] h-[100vh] w-full lg:rounded-tl-2xl lg:rounded-bl-2xl'>
          <div className="flex flex-col w-full px-[10%] lg:hidden bg-white pt-4">
            <div className='flex w-full pt-[10px] items-end justify-end'>
              <button onClick={()=>{router.push("/");}} property={"button"}>
                <Image 
                    alt={'logo'}
                    src={`${router.basePath}/assets/images/logo.webp`} 
                    width={108}
                    height={25}
                />
              </button>
            </div>
            <div className='flex flex-col w-full pt-[10px]'>
              <h1 className={`${props.hidetitle? 'hidden lg:block' :''} font-bold text-[48px] text-black leading-tight`}>
                {props.title}
              </h1>
              <div className={`${props.hidedescription? 'hidden lg:block' :''} text-[16px] text-black pt-[10px]`}>
                {props.description}
              </div>
            </div>
          </div>
          <div className="relative bg-white lg:rounded-tl-2xl lg:rounded-bl-2xl w-full pt-[20px] lg:pt-[88px] flex flex-col items-center">
            {props.children}
            <div className={`${props.loading? 'visible': 'invisible'} absolute z-50 top-0
              w-full h-screen flex flex-col items-center justify-center bg-black/20`}>
              <div className="mx-10 flex h-[200px] w-[300px] flex-col items-center justify-center rounded-3xl bg-black/20 px-4">
                  <div className="loading-spinner "></div>
                  <span className="pt-[20px] text-[24px] text-white">
                      Loading...
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export { SinglePage };
