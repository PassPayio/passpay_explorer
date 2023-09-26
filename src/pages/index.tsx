import { NextPage } from "next";
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { PlanCard_Vip, PlanCard_Normal } from "@/components/Cards";
import { useRouter } from "next/router";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
import 'swiper/css';
import { AppstoreLink } from "@/components/ButtonComponents";
import { useTranslation } from "@/utils/common";
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { searchHash } from "./common/worker";

const Index: NextPage = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {locale} = router;
    const [searchtext, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const searchInputChangeHandler = (event: any) => {
        setSearchText(event.target.value);
    }

    const handleSearchSubmit = async(event: any) => {
        event.preventDefault();
        setLoading(true);
        const result = await searchHash(searchtext);
        setLoading(false);
        if(result===null) {
            alert("null");
            return;
        }
        if(result.type === 0) {
            router.push("/tx/"+searchtext);
        }
        if(result.type === 1) {
            router.push("/address/"+searchtext);
        }
    }

    return (
        <Main
            loading = {loading}
            meta={
               <Meta title={'PassPay'} description={'common:description'} />
          }
        >
            <div className="flex flex-col items-center justify-center w-full bg-[#ECF0F2] h-[calc(100vh-202px)]">
                <div className="flex flex-row w-full h-[60px]  max-w-[720px] px-2 bg-white itmes-center justify-center rounded-full">
                    <form action="#" onSubmit={handleSearchSubmit} className="w-full">
                        <div className="flex flex-row w-full h-full items-center justify-center px-4 gap-2">
                            <input 
                                type={"text"}
                                className="block w-full h-[40px]
                                border-gray-200 bg-white py-[4px] px-[10px] text-[16px] text-[#1d67cd]
                                shadow-sm placeholder:text-slate-400 placeholder:text-center hover:ring-2
                                focus:border-sky-500 focus:outline-none focus:-ring-2 focus:ring-blue-300 ml-2"
                                placeholder={t('Search for Blocks, Txs, Address')}
                                onChange = {searchInputChangeHandler}
                            />
                            <button className="flex h-[40px] w-[40px] items-center justify-center border bg-[#1d67cd] 
                                            text-white font-bold text-[22px] border-blue-700 rounded-full
                                            hover:bg-blue-800"
                                type="submit"
                            >
                                <AiOutlineSearch />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Main>
    )
}

export default Index;