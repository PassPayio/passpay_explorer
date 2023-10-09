import { useRouter } from "next/router";
import Image from "next/image";
import DefaultButton, { HeaderButton } from './ButtonComponents';
import { HiHome } from "react-icons/hi";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { RiExchangeFill } from "react-icons/ri";
import { TbDiamondFilled } from "react-icons/tb";
import { useState, useEffect } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { MobileNav } from "./MobileNav";
import { Menu, MenuItem } from '@mui/material';
import { useOurContext } from "@/context/walletContext";
import { LanguageSelectDropDown, NetworkSelectDropDown } from "./DropDown";
import { useTranslation } from '../utils/common';
import { searchHash } from "@/pages/common/worker";
import { toast } from 'react-toastify';

const Header = () => {
    const router = useRouter();
    let { locale, locales } = router;
    const {t} = useTranslation('common');
    const [userDetails, setUserDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const MallOpen = Boolean(anchorEl);
    const [navShow, setNavShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showsearchbox, setShowSearchBox] = useState(false);
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

    const handleMallClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        document.body.style.overflow = 'auto';
    };

    const handleMallMenuClose = (target: string) => {
        setAnchorEl(null);
    
        if (target === 'exchange') {
          router.push('/exchange');
        }
        if (target === 'buy') {
          router.push('/extrapoint');
        }
    };
    
    const handleSearchSubmit = async(event: any) => {
        event.preventDefault();
        const searchtext = (document.getElementById('searchbox') as HTMLInputElement).value;
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
    useEffect(()=>{
        setShowSearchBox(router.route !== '/')
    },[router]);
    return (
        <div className="flex flex-col h-fit">
            <div className="flex flex-row items-center h-[98px] bg-white drop-shadow-xl justify-between px-[5%]">
                <div className="flex flex-row pb-[10px] min-w-[120px] w-full max-w-[170px] justify-start">
                    <Image
                        src={`${router.basePath}/assets/images/explorer_logo.png`} width={170} height={40}
                        alt={'logo'}
                    />
                </div> 
                <div className="flex w-[100px] pr-4 mr-4">
                    <NetworkSelectDropDown onChangeHandler={()=>{}} checkedValue={`${Number(process.env.NEXT_PUBLIC_EXPLORER_TYPE) === 1?'ethereum':'polygon'}`}/>
                </div>

                    <div className="hidden lg:flex justify-end w-full items-end">
                        <div className="flex flex-row min-w-[200px] justify-start gap-[10%]">
                            <HeaderButton name={t('home')} icon={<HiHome />} selected = {router.asPath==="/" || router.asPath==="/"} clickhandler={()=>{router.push('/')}}/>
                            <HeaderButton name={t('Txs')} icon={<MdPlaylistAddCheckCircle />} selected = {router.asPath==='/block/'} clickhandler={()=>{router.push('/block')}}/>
                        </div>
                        <div className={`${showsearchbox?'flex':'hidden' } w-full h-[40px] flex-row`}>
                            <form className="flex flex-row w-full" onSubmit={handleSearchSubmit}>
                                <input 
                                    id = "searchbox"
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
                    </div>
                <div className="lg:hidden flex justify-end w-full items-end">
                    <button className="flex border-[#F5F5F7] border-2 rounded-[50%] w-[44px] h-[44px] items-center justify-center 
                            text-[24px] text-[#8E92BC] hover:text-[#7E82AC] hover:bg-gray-200"
                        onClick={onToggleNav}        
                    >
                        <IoReorderThreeOutline className={`${navShow?'hidden':'auto'}`}/>
                        <AiOutlineClose className={`${!navShow?'hidden':'auto'}`}/>
                    </button>
                </div>
            </div>
            <div  className={`${navShow ? 'translate-x-0' : 'translate-x-full'} border-t-2 duration-300 ease-in-out 
                fixed left-0 top-[98px] w-full h-screen lg:hidden`}>
                <MobileNav onToggleNav={onToggleNav}/>
            </div>
        </div>
    );
  };
  
  export default Header;
  