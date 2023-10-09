import { useState } from 'react';
import React, { useRef, useEffect } from "react";
import { useRouter } from 'next/router';

export interface MenuItem {
    name: string,
    value: string,
}

function useOutsideAlerter(ref: any, handler: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
        //   alert("You clicked outside of me!");
        handler(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

export const DropDownButton = (Props: {Items: MenuItem[], onChangeHandler: any, checkedValue: string }) => {
    const wrapperRef = useRef(null);
    const [menushow, setMenuShow] = useState(false);

    useOutsideAlerter(wrapperRef, setMenuShow);

    const [selectedValue, setSelected] = useState("300 PT");
    return (
        <div className='flex flex-col w-full relative' ref={wrapperRef}>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                className="text-[#1676FE] text-[24px] bg-[#F8F8F8] hover:bg-gray-300 focus:ring-2 focus:outline-none 
                        focus:ring-gray-300 
                        font-medium text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-200 h-[60px]
                        flex-row justify-between" 
                type="button"
                onClick={()=>{setMenuShow(!menushow)}}
            >
                <span className='text-[24px] font-normal'>{selectedValue}</span>
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" 
                className={`${menushow?'':'hidden'} z-10 top-[62px] absolute w-full bg-[#F8F8F8] divide-y divide-gray-100 shadow dark:bg-gray-700`}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {Props.Items.map((item)=>(
                    <li key={item.name}
                        className="flex h-[44px] border-t-2 border-dotted items-center"
                        onClick={()=>{
                            setSelected(item.name);
                            setMenuShow(false);
                            Props.onChangeHandler(item.value);
                        }}
                    >
                        <p 
                            className="block px-4 py-2 hover:bg-gray-100 text-[24px] text-gray-400 w-full">
                                {item.name}
                        </p>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export const NetworkSelectDropDown = (Props: {onChangeHandler: any, checkedValue: string }) => {
    const wrapperRef = useRef(null);
    const [menushow, setMenuShow] = useState(false);
    const menuItems = [
        "polygon", "ethereum"
    ]

    useOutsideAlerter(wrapperRef, setMenuShow);

    const [selectedValue, setSelected] = useState("polygon");
    return (
        <div className='flex flex-col w-full relative' ref={wrapperRef}>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                className="text-white text-[20px] bg-[#1d67cd] hover:bg-blue-900 border-b border-blue-500
                        font-medium text-sm px-2 py-2.5 text-center inline-flex items-center h-[40px]
                        flex-row justify-between" 
                type="button"
                onClick={()=>{setMenuShow(!menushow)}}
            >
                <div className='w-full flex justify-center'>
                    {selectedValue==='polygon'?(
                        <svg className='w-[30px] h-[30px]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"
                                viewBox="0 0 38.4 33.5">
                        <g>
                            <path d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3
                                c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7
                                c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
                                c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1
                                L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
                                c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
                        </g>
                        </svg>
                    ):(
                        <svg className='w-[30px] h-[30px]' fill="#ffffff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z"/>
                        </svg>
                    )}
                    
                </div>
                <svg className='w-[30px] h-[30px]' viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    transform={`${menushow ? 'matrix(1, 0, 0, -1, 0, 0)' : ''}`}
                >
                    <g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M4,7 L9,13 L14,7 L4,7 L4,7 Z" id="path" fill="#aaaaaa">
                        </path>
                    </g>
                </svg>
            </button>
            <div id="dropdown" 
                className={`${menushow?'':'hidden'} z-10 top-[40px] absolute w-full bg-[#1d67cd]`}
            >
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                    className="text-white text-[20px] bg-[#1d67cd] hover:bg-blue-900 w-full
                            font-medium text-sm px-5 py-2.5 text-center inline-flex items-center h-[40px]
                            flex-row justify-between" 
                    type="button"
                    onClick={()=>{
                        setSelected(selectedValue==='polygon'?'ethereum':'polygon');
                        setMenuShow(false);
                        Props.onChangeHandler(selectedValue==='polygon'?'ethereum':'polygon');
                    }}
                >
                    <div className='w-full flex justify-center'>
                        {selectedValue!=='polygon'?(
                            <svg className='w-[30px] h-[30px]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"
                                    viewBox="0 0 38.4 33.5">
                            <g>
                                <path d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3
                                    c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7
                                    c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
                                    c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1
                                    L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
                                    c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
                            </g>
                            </svg>
                        ):(
                            <svg className='w-[30px] h-[30px]' fill="#ffffff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z"/>
                            </svg>
                        )}
                        
                    </div>
                    <div className='w-[40px]'></div>
                </button>
            </div>
        </div>
    )
}

export const LanguageSelectDropDown = (Props: {checkedValue: string }) => {
    const wrapperRef = useRef(null);
    const [menushow, setMenuShow] = useState(false);

    const router = useRouter();
    const { locales } = router;
    let { locale } = router;

    useOutsideAlerter(wrapperRef, setMenuShow);

    const onChangeHandler = (selectedLocale: string)=>{
        locale = selectedLocale;
        router.push(router.asPath, router.asPath, { locale });
    }

    const [selectedValue, setSelected] = useState(Props.checkedValue as any);
    return (
        <div className='flex flex-col w-[48px] relative' ref={wrapperRef}>
            <button 
                className="text-white text-[20px] bg-[#2D3648] hover:bg-gray-900 border-b border-gray-500
                        font-medium text-sm px-5 text-center inline-flex items-center
                        flex-row justify-center min-h-[48px] rounded-md" 
                type="button"
                onClick={()=>{setMenuShow(!menushow)}}
            >
                <div className='w-full flex justify-center text-[16px]'>
                    {selectedValue==='en'?(
                        <div>EN</div>
                    ):(
                        <div>JA</div>
                    )}
                    
                </div>
                
            </button>
            <div id="dropdown" 
                className={`${menushow?'':'hidden'} z-10 top-[48px] absolute w-[48px]`}
            >
                <button
                    className="text-white text-[20px] bg-[#2D3648] hover:bg-gray-900 w-full
                            font-medium text-sm text-center inline-flex items-center
                            flex-row justify-center min-h-[48px] rounded-md" 
                    type="button"
                    onClick={()=>{
                        setSelected(selectedValue==='en'?'ja':'en');
                        setMenuShow(false);
                        onChangeHandler(selectedValue==='en'?'ja':'en');
                    }}
                >
                    <div className='w-full flex justify-center text-[16px]'>
                        {selectedValue!=='en'?(
                            <div>EN</div>
                        ):(
                            <div>JA</div>
                        )}
                        
                    </div>
                </button>
            </div>
        </div>
    )
}