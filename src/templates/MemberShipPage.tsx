import Footer from "@/components/Footer";
import SectionContainer from "@/components/SectionContainer";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Image from "next/image";
import { UCMenuButton } from "@/components/ButtonComponents";
import {IoHomeOutline, IoGridOutline} from 'react-icons/io5'
import { useTranslation } from '../utils/common';
type IMembershipProps = {
    meta: ReactNode;
    children: ReactNode;
};

const MemberShipPage = (props: IMembershipProps) => {
    const router = useRouter();
    const {t} = useTranslation('common');
    return (
        <SectionContainer>
            {props.meta}
            <div className="flex h-full flex-col justify-between bg-white overflow-x-hidden">
                <div className="flex flex-row w-full h-full">
                    <div className="hidden lg:flex flex-col min-w-[300px] w-[300px] border-r border-gray-300">
                        <div className='flex flex-col w-full pt-[50px] pl-[24px]'>
                            <button onClick={()=>{router.push("/");}} property={"button"}>
                                <Image 
                                    alt={'logo'}
                                    src={`${router.basePath}/assets/images/logo.webp`} 
                                    width={171}
                                    height={39}
                                />
                            </button>
                            <span className="text-[12px] font-normal text-gray-300 pt-2">
                                {'Business & Consulting'}
                            </span>
                        </div>
                        <div className="text-gray-400 font-bold text-[14px] px-[24px] pt-12">
                            {t('main_menu')}
                        </div>
                        <div className="flex flex-col w-full px-[24px] pt-4 gap-2">
                            <UCMenuButton type={"button"} name={t('home')} classname={"w-full h-[56px] font-bold justify-start px-[7%]"} checked>
                                <IoHomeOutline className="text-[24px]"/>
                            </UCMenuButton>
                            <UCMenuButton type={"button"} name={t('overview')} classname={"w-full h-[56px] font-bold justify-start px-[7%]"}>
                                <IoGridOutline className="text-[24px]"/>
                            </UCMenuButton>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </SectionContainer>
    );
}

export { MemberShipPage };
  