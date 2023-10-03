import { useRouter } from "next/router";
import {AiFillCheckCircle} from "react-icons/ai";
import { UserDetails } from '../context/walletContext';
import { BlueButton } from "./ButtonComponents";
import { useEffect, useState } from 'react';
import { useTranslation } from "@/utils/common";
import { getTimeSpan } from '../lib/timespan';
import { getTokensFromAddress } from "@/pages/common/worker";

export const TokenTransferAccordian = ({TokenTransferData}: {TokenTransferData : Map<string, Array<any>>}) =>{
    if (!TokenTransferData) return (<></>);
    const keys = ["ERC20", "ERC721", "ERC1155"];
    return (
        <div className="w-full flex flex-col gap-2">
        {
            keys.map((key: string, index: number)=>{
                if(!TokenTransferData.has(key)) return <></>;
                const value = TokenTransferData.get(key);
                return (
                    <div id={`accordian${key}-${value?.length}-${value?.at(0)?.contract!}`} key={index}>
                        <div key={`a${index}`}
                            className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                            <h2 className="mb-0" id={`heading${key}-${value?.length}-${value?.at(0)?.contract!}`} key={`f${index}`}>
                            <button
                                key={`e${index}`}
                                className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target={`#collapse${key}-${value?.length}-${value?.at(0)?.contract!}`}
                                aria-expanded="false"
                                aria-controls={`collapse${key}-${value?.length}-${value?.at(0)?.contract!}`}>
                                <div className="flex flex-row gap-4" key={`d${index}`}>
                                    <span>{`${key} Transfers`}</span>
                                    <span className="text-blue-400">{value?.length}</span>
                                </div>
                                <span 
                                    key={`g${index}`}
                                    className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                            </h2>
                            <div
                                key={`b${index}`}
                                id={`collapse${key}-${value?.length}-${value?.at(0)?.contract!}`}
                                className="!visible hidden"
                                data-te-collapse-item
                                aria-labelledby={`heading${key}-${value?.length}-${value?.at(0)?.contract!}`}
                                data-te-parent={`#accordian${key}-${value?.length}-${value?.at(0)?.contract!}`}>
                                <div className="px-5 py-4" key={`q${index}`}>
                                {
                                    value?.map((tokenItem: any, idx: number) => {
                                        return (
                                            <div key={`${idx}${tokenItem.from}`} className="flex flex-col w-full border-b">
                                                <div className="flex flex-row w-full" key={`c${index}`}>
                                                    <a href={`/address/${tokenItem.from}`} className="min-w-[100px] w-[40%]">
                                                        <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                                            {tokenItem.from}
                                                        </p>
                                                    </a>
                                                    <div className="flex w-[50px] h-[28px] justify-center items-center">
                                                    <svg className="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                                    </div>
                                                    <a href={`/address/${tokenItem.to}`} className="min-w-[100px] w-[40%]">
                                                        <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                                            {tokenItem.to}
                                                        </p>
                                                    </a>
                                                    <div className="w-[20%] flex text-[12px] justify-end">
                                                        {
                                                            key==='ERC20'?`${(tokenItem.value*1.0/Math.pow(10,Number(tokenItem.decimals))).toFixed(Number(tokenItem.decimals))} ${tokenItem.symbol}`
                                                        :
                                                            `ID ${tokenItem.value} ${tokenItem.symbol}`
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        
        </div>
    );
}

export const TransactionCard = ({TxData, TokenTransfers}:{TxData:any, TokenTransfers:any}) => {
    useEffect(() => {
        const init = async () => {
          const { Collapse, initTE } = await import("tw-elements");
          initTE({ Collapse });
        };
        init();
    }, []);
    const bFailed = TxData.ethereumSpecific?.status === 0;
    return (
        <div className="flex flex-col w-full h-full bg-white px-[3%] py-4">
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row w-full gap-2">
                    <span className='text-[14px] break-keep'>{'Transaction Hash: '}</span>
                    <a href={`/tx/${TxData.txid}`} className={`text-[14px] ${bFailed?'text-red-600':'text-blue-600'} break-all`}>
                        {`${TxData.txid}`}
                    </a>
                </div>
                <div className="flex flex-row gap-2 text-[14px] w-[250px] flex-wrap justify-end">
                    <span>
                        {TxData.confirmations?'mined':'first seen'}
                    </span>
                    <span className="font-bold break-keep"> 
                        {getTimeSpan(Number(TxData.blockTime!))}
                    </span>
                </div>
            </div>
            <div className={`${bFailed?'flex':'hidden'} w-[50px] h-[20px] bg-red-500 text-white text-[12px] font-bold rounded-xl items-center justify-center`}>
                Failed
            </div>
            <div className="flex flex-row w-full py-4">
                {TxData.vin?.map(({n, addresses, isAddress}: any, idx: number)=>{
                    return (
                        <div className="flex flex-col min-w-[100px] w-[40%]"  key={idx}>
                            {addresses.map((addr: string, index:number)=>{
                                return (
                                    <a href={`${isAddress?'/address/'+addr:''}`} key={index}>
                                        <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                            {addr}
                                        </p>
                                    </a>
                                )
                            })}
                        </div>
                    );
                })}
                {TxData.vin?.map(({n, addresses, isAddress}: any, idx: number)=>{
                    return (
                        <div className="flex flex-col w-[50px] h-[28px] justify-center items-center"  key={idx}>
                           <svg className="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </div>
                    );
                })}
                {TxData.vout.map(({n, addresses, isAddress}: any, idx: number)=>{
                    {if(addresses)
                        {
                            return (
                                <div className="flex flex-col min-w-[100px] w-[40%]"  key={idx}>
                                    {addresses.map((addr: string, index:number)=>{
                                        return (
                                            <a href={`${isAddress?'/address/'+addr:''}`} key={index}>
                                                <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                                    {addr}
                                                </p>
                                            </a>
                                        )
                                    })}
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex flex-col min-w-[100px] w-[40%] text-[14px]">
                                    No outputs
                                </div>
                            )
                    }}
                })}
                <div className="w-[20%] flex text-[12px] justify-end">
                    {TxData.tokenTransfers?'':`${Number(TxData.vout[0]?.value!)===0?'0':(TxData.vout[0]?.value!*1.0/1000000000000000000).toFixed(18)} ETH`}
                </div>
            </div>
            <div className="flex flex-col w-full pb-2">
                <TokenTransferAccordian TokenTransferData={TokenTransfers} />
            </div>
            <div className="flex flex-row w-full pt-4">
                <div className="flex flex-row">
                    <p className="text-[14px]">Fee</p>
                    <p className="text-[14px] font-bold px-2">
                        {(TxData.fees/Math.pow(10, 18)).toFixed(18)} ETH
                    </p>
                    <p className="text-[14px] text-gray-600">
                        {`(${(TxData.ethereumSpecific.gasPrice/Math.pow(10,18)).toFixed(18)}) Gwei/gas`}
                    </p>
                </div>
            </div>
        </div>
    )
}


export const RawTransactionCard = ({TxData}: {TxData: any}) => {
    return (
        <div className="flex w-full bg-[#002b31] text-[14px] text-white px-4 py-4 leading-tight overflow-hidden truncate">
            <pre className="">
                { JSON.stringify(TxData, null, 2) }
            </pre>
        </div>
    )
}


export const ERC20_Accordion = ({TokenData}: {TokenData : Map<string, Array<any>>}) =>{
    if (!TokenData) return (<></>);
    if (!TokenData.has('ERC20')) return (<></>);
    const tokenArray = TokenData.get('ERC20');
    return (
        <div id="accordion_erc20">
            <div
                className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="headingOne">
                <button
                    className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                    type="button"
                    data-te-collapse-init
                    data-te-collapse-collapsed
                    data-te-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne">
                    <div className="flex flex-row gap-4">
                        <span>ERC20 Tokens</span>
                        <span className="text-blue-400">{tokenArray?.length}</span>
                    </div>
                    <span
                        className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
                </h2>
                <div
                id="collapseOne"
                className="!visible hidden"
                data-te-collapse-item
                aria-labelledby="headingOne"
                data-te-parent="#accordion_erc20">
                <div className="px-5 py-4">
                    <table className="text-[14px] w-full table-fixed">
                        <tbody>
                            <tr className="text-gray-600 h-[40px]">
                                <th className="w-[25%] text-start">Contract</th>
                                <th className="w-[30%]">Quantity</th>
                                <th className="w-[35%]">Value</th>
                                <th className="text-end">Transfers</th>
                            </tr>
                            {
                                tokenArray?.map((tokenItem: any, idx: number) => {
                                    return (
                                        <tr className="border-t h-[35px]" key={idx}>
                                            <td className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                <a href={`/address/${tokenItem?.contract}`} className="text-blue-500">
                                                    {tokenItem?.name?tokenItem.name:tokenItem?.contract}
                                                </a>
                                            </td>
                                            <td className="">{(Number(tokenItem?.balance)/Math.pow(10,Number(tokenItem?.decimals?tokenItem?.decimals:1)))}{' '}{tokenItem?.symbol}</td>
                                            <td className="text-center">{"-"}</td>
                                            <td className="text-end">{tokenItem?.transfers}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
}

export const ERC721_Accordion = ({TokenData}: {TokenData : Map<string, Array<any>>}) =>{
    if (!TokenData) return (<></>);
    if (!TokenData.has('ERC721')) return (<></>);
    const tokenArray = TokenData.get('ERC721');
    
    return (
        <div id="accordion_erc721">
            <div
                className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="heading721">
                <button
                    className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                    type="button"
                    data-te-collapse-init
                    data-te-collapse-collapsed
                    data-te-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo">
                    <div className="flex flex-row gap-4">
                        <span>ERC721 Tokens</span>
                        <span className="text-blue-400">{tokenArray?.length}</span>
                    </div>
                    <span
                        className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
                </h2>
                <div
                id="collapseTwo"
                className="!visible hidden"
                data-te-collapse-item
                aria-labelledby="heading721"
                data-te-parent="#accordion_erc721">
                <div className="px-5 py-4">
                    <table className="text-[14px] w-full table-fixed">
                        <tbody>
                            <tr className="text-gray-600 h-[40px]">
                                <th className="w-[25%] text-start">Contract</th>
                                <th className="w-[65%]">Tokens</th>
                                <th className="text-end">Transfers</th>
                            </tr>
                            {
                                tokenArray?.map((tokenItem: any, idx: number) => {
                                    return (
                                        <tr className="border-t h-[35px]" key={idx}>
                                            <td className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                <a href={`/address/${tokenItem?.contract}`} className="text-blue-500">
                                                    {tokenItem?.name?tokenItem.name:tokenItem?.contract}
                                                </a>
                                            </td>
                                            <td className="">

                                                {
                                                    tokenItem.ids?.map((tokenid: any, idx: number)=>{
                                                        return (
                                                            <span key={idx}>{idx>0?", ": ""}{tokenid}</span>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className="text-end">{tokenItem?.transfers}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
}

export const ERC1155_Accordion = ({TokenData}: {TokenData : Map<string, Array<any>>}) =>{
    if (!TokenData) return (<></>);
    if (!TokenData.has('ERC1155')) return (<></>);
    const tokenArray = TokenData.get('ERC1155');
    
    return (
        <div id="accordion_erc1155">
            <div
                className="border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                <h2 className="mb-0" id="heading1155">
                <button
                    className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                    type="button"
                    data-te-collapse-init
                    data-te-collapse-collapsed
                    data-te-target="#collapse1155"
                    aria-expanded="false"
                    aria-controls="collapse1155">
                    <div className="flex flex-row gap-4">
                        <span>ERC1155 Tokens</span>
                        <span className="text-blue-400">{tokenArray?.length}</span>
                    </div>
                    <span
                        className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
                </h2>
                <div
                    id="collapse1155"
                    className="!visible hidden"
                    data-te-collapse-item
                    aria-labelledby="heading1155"
                    data-te-parent="#accordion_erc1155">
                    <div className="px-5 py-4">
                        <table className="text-[14px] w-full table-fixed">
                            <tbody>
                                <tr className="text-gray-600 h-[40px]">
                                    <th className="w-[25%] text-start">Contract</th>
                                    <th className="w-[65%]">Tokens</th>
                                    <th className="text-end">Transfers</th>
                                </tr>
                                {
                                    tokenArray?.map((tokenItem: any, idx: number) => {
                                        return (
                                            <tr className="border-t h-[35px]" key={"111"+idx}>
                                                <td className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                    <a href={`/address/${tokenItem?.contract}`} className="text-blue-500">
                                                        {tokenItem?.name?tokenItem.name:tokenItem?.contract}
                                                    </a>
                                                </td>
                                                <td className="">

                                                    {
                                                        tokenItem.multiTokenValues?.map((tokenid: any, idx: number)=>{
                                                            return (
                                                                <span key={idx}>{idx>0?", ": ""}{tokenid.value}{' '}{tokenItem.symbol} {' of ID '}{tokenid.id}</span>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className="text-end">{tokenItem?.transfers}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const AddressCard = ({AddrData}: {AddrData: any}) => {
    useEffect(() => {
        const init = async () => {
          const { Collapse, initTE } = await import("tw-elements");
          initTE({ Collapse });
        };
        init();
    }, []);
    const tokenData = getTokensFromAddress(AddrData);
    return (
        <div className="flex flex-col w-full h-full py-2 gap-2">
            <div className="flex flex-col w-full px-[3%] bg-white py-2">
                <table className="text-[14px]">
                    <tbody>
                        <tr className="border-b h-[40px]">
                            <td className="w-[25%] font-bold text-[20px]">Confirmed</td>
                            <td></td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Balance</td>
                            <td>{`${(Number(AddrData.balance!)/Math.pow(10,18)).toFixed(18)} ETH`}</td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Transactions</td>
                            <td>{`${AddrData.txs!|0}`}</td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Non-contract Transactions</td>
                            <td>{`${AddrData.nonTokenTxs!|0}`}</td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Internal Transactions</td>
                            <td>{`${AddrData.internalTxs!|0}`}</td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Nonce</td>
                            <td>{`${AddrData.nonce!|0}`}</td>
                        </tr>
                        {
                            AddrData.contractInfo?
                                (<>
                                    {AddrData.contractInfo.type? 
                        <tr className="border-b h-[40px]">
                            <td>Contract type</td>
                            <td>{`${AddrData.contractInfo.type!}`}</td>
                        </tr>
                                    : <></>}    
                                    {AddrData.contractInfo.createdInBlock? 
                        <tr className="border-b h-[40px]">
                            <td>Created in Block</td>
                            <td>{`${AddrData.contractInfo.createdInBlock!}`}</td>
                        </tr>
                                    : <></>}
                                    {AddrData.contractInfo.destructedInBlock? 
                        <tr className="border-b h-[40px]">
                            <td>Destructed in Block</td>
                            <td>{`${AddrData.contractInfo.destructedInBlock!}`}</td>
                        </tr>
                                    : <></>}
                                </>
                                )
                            :   <></>
                        }
                    </tbody>
                </table>
            </div>
            
            {
            AddrData.unconfirmedTxs?
            <div className="flex flex-col w-full px-[3%] bg-white py-2">
                <table className="text-[14px]">
                    <tbody>
                        <tr className="border-b h-[40px]">
                            <td className="w-[25%] font-bold text-[20px]">Unconfirmed</td>
                            <td></td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>Unconfirmed Balance</td>
                            <td>{`${(Number(AddrData.unconfirmedBalance!)/Math.pow(10,18)).toFixed(18)} ETH`}</td>
                        </tr>
                        <tr className="border-b h-[40px]">
                            <td>No. Transactions</td>
                            <td>{`${AddrData.unconfirmedTxs!|0}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            <></>
            }

            <ERC20_Accordion TokenData={tokenData as any} />
            <ERC721_Accordion TokenData={tokenData as any} />
            <ERC1155_Accordion TokenData={tokenData as any} />
        </div>
    )
}