import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/firebase/auth/useUser';
import { useOurContext } from '@/context/walletContext';
import { useRouter } from 'next/router';
import { useTranslation } from '../utils/common';
interface MyLiProps  {
    children: ReactNode
    onClick?: any
}

export const MyLi = (props: MyLiProps) => {
    return (
        <li className='flex font-medium text-[18px] min-h-[60px] itmes-center justify-start px-[5%]
            hover:bg-gray-200
            '
            onClick={()=>{props.onClick()}}
            >
            {props.children}
        </li>
    )
}

export const MobileNav = (Params: {onToggleNav: any}) => {
    const { user, logout } = useUser();
    const { userDetails } = useOurContext(()=>{});
    const router = useRouter();
    let { locale } = router;
    const {t} = useTranslation('common');
    return (
        <div className="flex flex-col lg:hidden bg-white h-[100vh] pt-6 justify-between">
            <ul className="menu w-full rounded-box">
                <MyLi
                    onClick={()=>{Params.onToggleNav()}}
                >
                    <a className='h-[60px] w-full items-center justify-start text-center flex'
                        href={'/'}
                    >
                        {t('home')}
                    </a>
                </MyLi>
            {(userDetails!==null && user!==null) ? (
                <MyLi onClick={()=>{Params.onToggleNav()}}>
                    <a className='h-[60px] w-full items-center justify-start text-center flex'
                        href={'/usercenter'}
                    >
                        {t('my_membership')}
                    </a>
                </MyLi> ) : (
                    <></>
            )}
                <MyLi onClick={()=>{Params.onToggleNav()}}>
                    <a className='h-[60px] w-full items-center justify-start text-center flex'
                        href={'/plan'}
                    >
                        {t('purchaseplan')}
                    </a>
                </MyLi>
            {(userDetails!==null && user!==null) ? (
                <li className='flex font-medium text-[18px] min-h-[60px] itmes-center justify-start '>
                    <details className='w-full'>
                        <summary className='flex items-center w-full h-[60px] justify-between hover:bg-gray-200 px-[5%]'>{t('exchange')}
                            <button className=''></button>
                            <svg className="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </summary>
                        <ul className='h-full menu px-4'>
                            <MyLi onClick={()=>{Params.onToggleNav()}}>
                                <a className='h-[60px] items-center w-full justify-start text-center flex font-normal'
                                    href={'/extrapoint'}
                                >
                                    {t('buy_point')}
                                </a>
                            </MyLi>
                            <MyLi onClick={()=>{Params.onToggleNav()}}>
                                <a className='h-[60px]  items-center w-full justify-start text-center flex font-normal'
                                    href={'/exchange'}
                                >
                                    {t('exchange_jpyw')}
                                </a>
                            </MyLi>
                        </ul>
                    </details>
                </li> ) : (
                <></>
            )}
                <li className='flex font-medium text-[18px] min-h-[60px] itmes-center justify-start'>
                    <details className='w-full'>
                    <summary className='flex items-center w-full h-[60px] justify-between hover:bg-gray-200 px-[5%]'>Language
                        <button></button>
                        <svg className="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                    </summary>
                        <ul className='h-full menu px-4'>
                            <MyLi onClick={()=>{Params.onToggleNav();  locale='ja'; router.push(router.asPath, router.asPath, {locale} );}}><a className='h-[60px] w-full items-center justify-start text-center flex font-normal'>JA</a></MyLi>
                            <MyLi onClick={()=>{Params.onToggleNav();  locale='en'; router.push(router.asPath, router.asPath,  {locale});}}><a className='h-[60px] w-full items-center justify-start text-center flex font-normal'>EN</a></MyLi>
                        </ul>
                    </details>
                </li>
            </ul>
            <div className='mx-[5%] mb-[5%]'>
            {(userDetails!==null && user!==null) ? (
                <button
                    type={"button"}
                    className={`inline-flex w-full items-center rounded-2xl bg-[#1676FE] h-[54px]
                            text-center text-[18px] font-bold text-white 
                            hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400 
                            disabled:bg-gray-500 justify-center mb-[150px]`}
                    onClick={()=>{logout(); router.push('/')}}
                >   
                    {t('logout')}
                </button> 
            ) : (
                <button
                    type={"button"}
                    className={`inline-flex w-full items-center rounded-2xl bg-[#1676FE] h-[54px]
                            text-center text-[18px] font-bold text-white 
                            hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400 
                            disabled:bg-gray-500 justify-center mb-[150px]`}
                    onClick={()=>{router.push('/auth/login')}}
                >   
                    {t('login')}
                </button> 
            )}
            </div>
        </div>
    )
}