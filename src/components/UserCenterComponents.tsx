import { useOurContext } from '@/context/walletContext';
import { useUser } from '@/firebase/auth/useUser';
import {FaChevronDown} from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { UserDetails } from '../context/walletContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useTranslation } from '../utils/common';

export const UserBar = () => {
    const router = useRouter();
    const {user} = useUser();
    const { userDetails } = useOurContext(()=>{});
    const [navShow, setNavShow] = useState(false);
    const onToggleNav = () => {
        setNavShow((status) => {
          if (status) {
            document.body.style.overflow = 'auto';
          } else {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
          }
          return !status;
        });
      };
    return (
        <>
        {(userDetails===null || user===null) ?
            (<></>)
            :
            (
                <>
                <div className="hidden lg:flex flex-row w-full h-[100px] min-h-[100px] bg-white items-center justify-end">
                    <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center 
                        rounded-full bg-blue-500 text-xl text-white uppercase">
                        {userDetails?.email?.charAt(0)}
                    </div>
                    <span className='text-[16px] font-medium'>{userDetails?.email}</span>
                    <button className='w-[24px] h-[24px] mx-[20px]'>
                        <FaChevronDown className='text-[20px]'/>
                    </button>
                </div>
                <div className="lg:hidden flex flex-row w-full h-[100px] min-h-[100px] bg-white items-center justify-between px-[5%]">
                    <div className="lg:hidden flex">
                        <button className="flex border-[#F5F5F7] border-2 rounded-[50%] w-[44px] h-[44px] items-center justify-center 
                                text-[24px] text-[#8E92BC] hover:text-[#7E82AC] hover:bg-gray-200"
                            onClick={onToggleNav}        
                        >
                            <IoReorderThreeOutline className={`${navShow?'hidden':'auto'}`}/>
                            <AiOutlineClose className={`${!navShow?'hidden':'auto'}`}/>
                        </button>
                    </div>
                    <div className="flex pb-[10px]">
                        <Image
                            src={`${router.basePath}/assets/images/logo.webp`} width={170} height={40}
                            alt={'logo'}
                            onClick={()=>{router.push('/')}}
                            className="cursor-pointer"
                        />
                    </div> 
                </div>
                </>
            )
        }
        </>
    )
}

const PlanCard_Normal = ({meinfo, plan}:{
    meinfo: UserDetails,
    plan: string,
}) => {
    const {t} = useTranslation('common');
    return (
        <div className={`flex flex-col w-[240px] max-w-[240px] min-w-[220px] h-full rounded-lg border-2 justify-center items-center
            ${meinfo?.is_paying && plan==='Standard'?'bg-[#1676FE]/80':'bg-white'}
        `}>
            <div className={`flex flex-col items-center justify-start w-full h-full px-[5%] gap-2 pt-[30px] 
            ${meinfo?.is_paying && plan==='Standard'?'text-white':'text-black'}`}>
                <h3 className="text-[16px] font-bold  pb-[4px] leading-normal">{t('standard')}</h3>
                <ul className="list-inside list-disc text-[12px] font-medium leading-6">
                    <li>{`${t('monthly_price')}: ￥300`}</li>
                    <li>{`${t('plan_row_name2')}: 100PT`}</li>
                    <li>{`${t('plan_row_name3')}: Polygon, BSC`}</li>
                    <li>{t('plan_row_name4')}</li>
                    <li>{t('plan_row_name6')} </li>
                    <span className='pl-5'>(Polygon, BSC) (100 times)</span>
                    <li>{t('plan_row_name7')}</li>
                </ul>
            </div>
            {meinfo?.is_paying?(
            <>
            <div
                 className={`${plan==='Standard'?'inline-flex':'hidden'} w-[70%] h-[44px] items-center rounded-md bg-white
                        text-center text-[16px] font-bold text-blue-500 justify-center mb-[30px]`}
            >   
                {t('current_plan')}
            </div>
            <div
                 className={`${plan!=='Standard'?'inline-flex':'hidden'} w-[70%] h-[44px] items-center rounded-md bg-gray-300
                        text-center text-[16px] font-bold text-white justify-center mb-[30px]`}
            >   
                {t('change_plan')}
            </div>
            </>
            ):(
            <button
                name={'Subscribe_normal'}
                type={'button'}
                className={`inline-flex w-[70%] h-[44px] items-center rounded-md bg-[#1676FE]/80
                        text-center text-[16px] font-bold text-white justify-center
                        hover:bg-gray-900 focus:outline-none 
                        disabled:bg-gray-500 mb-[30px]`}
            >   
                {t('subscribe')}
            </button>
            )}
            
        </div>
    );
}

const PlanCard_Vip = ({meinfo, plan}:{
    meinfo: UserDetails,
    plan: string,
}) => {
    const {t} = useTranslation('common');
    return (
        <div className={`flex flex-col w-[240px] max-w-[240px] min-w-[220px] h-full rounded-lg border-2 justify-center items-center
            ${meinfo?.is_paying && plan==='Vip'?'bg-[#1676FE]/80':'bg-white'}
        `}>
            <div className={`flex flex-col items-center justify-start w-full h-full px-[5%] gap-2 pt-[30px] 
            ${meinfo?.is_paying && plan==='Vip'?'text-white':'text-black'}`}>
                <h3 className="text-[16px] font-bold  pb-[4px] leading-normal">{`VIP`}</h3>
                <ul className="list-inside list-disc text-[12px] font-medium leading-6">
                    <li>{`${t('monthly_price')}: ￥1200`}</li>
                    <li>{`${t('plan_row_name2')}: 600PT`}</li>
                    <li>{`${t('plan_row_name3')}: All Chain`}</li>
                    <li>{t('plan_row_name4')}</li>
                    <li>{t('plan_row_name6')} </li>
                    <span className='pl-5'>(Polygon, BSC) (100 times)</span>
                    <li>{t('plan_row_name7')} </li>
                </ul>
            </div>
            {meinfo?.is_paying?(
            <>
            <div
                 className={`${plan==='Vip'?'inline-flex':'hidden'} w-[70%] h-[44px] items-center rounded-md bg-white
                        text-center text-[16px] font-bold text-blue-500 justify-center mb-[30px]`}
            >   
                {t('current_plan')}
            </div>
            <div
                 className={`${plan!=='Vip'?'inline-flex':'hidden'} w-[70%] h-[44px] items-center rounded-md bg-gray-300
                        text-center text-[16px] font-bold text-white justify-center mb-[30px]`}
            >   
                {t('change_plan')}
            </div>
            </>
            ):(
            <button
                name={'Subscribe_vip'}
                type={'button'}
                className={`inline-flex w-[70%] h-[44px] items-center rounded-md bg-[#1676FE]/80
                        text-center text-[16px] font-bold text-white justify-center
                        hover:bg-gray-900 focus:outline-none 
                        disabled:bg-gray-500 mb-[30px]`}
            >   
                {t('subscribe')}
            </button>
            )}
            
        </div>
    );
}

export const PlanSwiper = ({meinfo, plan}:{
    meinfo: UserDetails,
    plan: string,
}) => {
    return (
        <div className='flex w-full h-full items-center justify-center'>
            <Swiper
                watchSlidesProgress={true}
                spaceBetween={0}
                slidesPerView={2}
                className="mySwiper w-full h-full"
            >
                <SwiperSlide className="flex justify-center items-center min-w-[245px] w-full">
                    <PlanCard_Normal meinfo={meinfo} plan={plan} />
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center min-w-[245px] w-full">
                    <PlanCard_Vip meinfo={meinfo} plan={plan} />
                </SwiperSlide> 
                <SwiperSlide className="flex justify-center items-center w-[5px]">
                </SwiperSlide> 
            </Swiper>
        </div>
    );
}