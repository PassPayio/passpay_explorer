import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useOurContext } from '@/context/walletContext';
import { useRouter } from 'next/router';
import { useTranslation } from '../utils/common';
import { searchHash } from '@/pages/common/worker';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

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
    const { userDetails } = useOurContext(()=>{});
    const router = useRouter();
    let { locale } = router;
    const {t} = useTranslation('common');
    const [loading, setLoading] = useState(false);

    const handleSearchSubmit = async(event: any) => {
        event.preventDefault();
        const searchtext = (document.getElementById('searchbox_mobile') as HTMLInputElement).value;
        console.log('xxxx', searchtext)

        if(!searchtext||searchtext.trim() === "") {
            return;
        }

        setLoading(true);

        const result = await searchHash(searchtext);

        setLoading(false);
        if(result===null) {
            toast('No search result.');
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
        <div className="flex flex-col lg:hidden bg-white h-[100vh] pt-6 justify-between">
            <ul className="menu w-full rounded-box">
                <div className={`flex w-full h-[40px] flex-row px-[5%] mb-[20px]`}>
                    <form className="flex flex-row w-full" onSubmit={handleSearchSubmit}>
                        <input 
                            id = "searchbox_mobile"
                            type={"text"}
                            className="block h-full w-full border 
                            border-gray-200 bg-white py-[4px] px-[10px] text-[16px] text-[#1d67cd]
                            shadow-sm placeholder:text-slate-400 placeholder:text-center hover:ring-2
                            focus:border-sky-500 focus:outline-none focus:-ring-2 focus:ring-blue-300"
                            placeholder={t('Search for Blocks, Txs, Address')}
                            disabled = {loading}
                        />
                        <button className="flex h-full w-[50px] items-center justify-center border bg-[#1d67cd] 
                                        text-white font-bold text-[22px] border-blue-700
                                        hover:bg-blue-800">
                            <AiOutlineSearch />
                        </button>
                    </form>
                </div>
                <MyLi
                    onClick={()=>{Params.onToggleNav()}}
                >
                    <a className='h-[60px] w-full items-center justify-start text-center flex'
                        href={'/'}
                    >
                        {t('home')}
                    </a>
                </MyLi>
                <MyLi
                    onClick={()=>{Params.onToggleNav()}}
                >
                    <a className='h-[60px] w-full items-center justify-start text-center flex'
                        href={'/block'}
                    >
                        {'Txs'}
                    </a>
                </MyLi>
            </ul>
            <div className='mx-[5%] mb-[5%]'>
            
            </div>
        </div>
    )
}