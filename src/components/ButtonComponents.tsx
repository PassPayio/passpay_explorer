import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import {BsFillCreditCard2FrontFill} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Icon } from '@mui/material';
import { useTranslation } from '../utils/common';

const DefaultButton = ({ name, type, disabled, classname, clickhandler }: 
    {
      name: string, 
      type: any, 
      disabled: boolean, 
      classname: string, 
      clickhandler: any
    }
  ) => {
  return (
      <button
        name={name}
        type={type}
        disabled={disabled}
        className={`inline-flex w-fit items-center rounded-md bg-[#2D3648] ${classname}
                  text-center text-[16px] font-bold text-white break-keep
                  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-400 
                  disabled:bg-gray-500 `}
        onClick = {clickhandler}
      >   
        {name}
      </button>
  );
}

export const WhiteButton = ({ image, name, type, disabled, classname, clickhandler }: 
  {
    name: string, 
    image: string,
    type: any, 
    disabled: boolean, 
    classname: string, 
    clickhandler: any
  }
) => {
return (
    <button
      name={name}
      type={type}
      disabled={disabled}
      className={`inline-flex w-fit items-center rounded-xl bg-white ${classname}
                text-center text-[12px] text-black border border-1
                hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 
                disabled:bg-gray-500`}
      onClick = {clickhandler}
    > 
      <Image 
        alt='mark'
        src={image}
        className = "mx-2"
        width={25}
        height={25}
      />
      {name}
    </button>
);
}

export const HeaderButton = ({name, icon, selected, clickhandler}:
  {
    name: string, icon: any, selected: boolean, clickhandler: any,
  }) => {
  return (
    <button className="flex flex-col h-full pb-1" onClick={clickhandler}>
      <div>
        <div className={`flex flex-row ${selected ? 'text-[#2D3648]':'text-[#717D96]'} pb-2 gap-1 hover:text-cyan-600`}>
          <div className="flex items-center justify-center ">
            {icon}
          </div>
          <span className="font-bold text-[16px]">
            {name}
          </span>
        </div>
        <div>
          <div className={`min-h-[2px] bg-black w-full ${selected ? '' : 'invisible'} `}></div>
        </div>
      </div>
    </button>
  )
}

export const CreditButton = ({ name, type, disabled, classname, clickhandler }: 
  {
    name: string, 
    type: any, 
    disabled: boolean, 
    classname: string, 
    clickhandler: any
  }
) => {
return (
    <button
      name={name}
      type={type}
      disabled={disabled}
      className={`inline-flex w-fit items-center rounded-md bg-[#1676FE] ${classname}
                text-center text-[20px] text-white 
                hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-cyan-400 
                disabled:bg-gray-500 `}
      onClick = {clickhandler}
    >   
      <BsFillCreditCard2FrontFill className='mr-4'/> {`   `}
      {name}
    </button>
  );
}

export const UCMenuButton = ({ name, type, disabled, classname, clickhandler, checked, children }: 
  {
    name: string, 
    type: any, 
    disabled?: boolean, 
    classname?: string, 
    clickhandler?: any,
    checked?: any,
    children: ReactNode
  }
) => {
return (
    <button
      name={name}
      type={type}
      disabled={disabled!}
      className={`inline-flex w-fit items-center rounded-md bg-[#1676FE] ${classname!} ${checked?'bg-gray-200 text-[#1676FE]':'text-white'}
                text-center text-[16px]  
                hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 
                disabled:bg-gray-500 gap-4`}
      onClick = {clickhandler!}
    >   
      { children }
      {name}
    </button>
  );
}

export const BlueButton = ({ name, type, disabled, classname, clickhandler }: 
  {
    name: string, 
    type: any, 
    disabled?: boolean, 
    classname?: string, 
    clickhandler?: any
  }
) => {
return (
    <button
      name={name}
      type={type}
      disabled={disabled!}
      className={`inline-flex w-fit items-center rounded-md bg-[#1676FE] ${classname!}
                text-center text-[16px] text-white 
                hover:bg-blue-900 focus:outline-none  
                disabled:bg-gray-500 `}
      onClick = {clickhandler!}
    >   
      {name}
    </button>
  );
}

export const AppstoreLink = () => {
  const router = useRouter();
  const {t} = useTranslation('common');
  return (
    <>
      <div className="hidden lg:flex flex-col w-1/2 max-w-[800px] min-w-[600px] bg-white/80 border border-gray-300 py-4 items-center"
      >
        <h1 className="font-bold text-[56px] leading-tight text-[#2D3648] text-center pb-8">Your Gateway to Web3</h1>
        <div className="flex flex-col font-medium text-[24px] text-[#2D3648] justify-center items-center px-[5%] pb-12">
            <span className='text-center'>
              {t('app_store_des')}
            </span>
        </div>
        <Link
          href="https://apps.apple.com/jp/app/passpay/id1645009398"
          target="_blank"
          className='rounded-2xl hover:bg-red-600 px-[2px] py-[2px]'
        >
          <Image 
            width={280}
            height={100}
            src={`${router.basePath}/assets/images/appstore_logo.png`}
            alt="appstore"
          />
            
        </Link>
        {/* <DefaultButton name="Download Passpay Wallet" type={"button"} disabled={false} classname = "min-h-[56px] px-6 mr-2" clickhandler={null}/> */}
      </div>
      <Link
          href="https://apps.apple.com/jp/app/passpay/id1645009398"
          target="_blank"
          className='rounded-2xl hover:bg-red-600 px-[2px] py-[2px] lg:hidden'
        >
          <Image 
            width={280}
            height={100}
            src={`${router.basePath}/assets/images/appstore_logo.png`}
            alt="appstore"
          />
      </Link>
    </>
  )
}
export default DefaultButton;