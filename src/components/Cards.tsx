import { useRouter } from "next/router";
import {AiFillCheckCircle} from "react-icons/ai";
import { UserDetails } from '../context/walletContext';
import { BlueButton } from "./ButtonComponents";
import { PlanSwiper } from "./UserCenterComponents";
import { useState } from 'react';
import { useTranslation } from "@/utils/common";
import { getTimeSpan } from '../lib/timespan';
export const PlanCard_Normal = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    return (
        <div className="flex flex-col w-full max-w-[640px] min-w-[240px] h-[480px] md:h-[720px] rounded-lg border-2 bg-[#1676FE] justify-center items-center">
            <div className="flex flex-col items-center justify-start w-full h-full px-[5%] gap-6 py-10">
                <h3 className="text-[24px] md:text-[42px] font-bold text-white py-[10px] md:py-[40px] leading-normal">{t('standard')}</h3>
                <div className="flex flex-row items-end justify-center h-[50px] md:h-[100px] leading-tight">
                    <span className="text-[28px] md:text-[56px] font-bold text-white pb-3 lg:pb-0">{`￥ 300 /`}</span>
                    <span className="text-[16px] md:text-[24px] font-bold text-white pb-3">{t('month')}</span>
                </div>
                <div className="text-[18px] md:text-[24px] pt-[20px] font-bold text-white flex flex-row gap-2 items-center">
                    <AiFillCheckCircle />
                    {t('plan_card_std_des1')}
                </div>
                <div className="text-[18px] md:text-[24px] font-bold text-white flex flex-row gap-1 md:gap-2 items-start">
                    <AiFillCheckCircle className="min-w-[22px] mt-1" />
                    {t('plan_card_std_des2')}
                </div>
            </div>
            <button
                name={'Subscribe_normal'}
                type={'button'}
                className={`inline-flex w-[70%] h-[70px] md:h-[104px]  items-center rounded-md bg-white
                        text-center text-[32px] font-bold text-blue-500 justify-center
                        hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-400 
                        disabled:bg-gray-500 mb-[60px]`}
            >   
                {t('subscribe')}
            </button>
        </div>
    );
}

export const PlanCard_Vip = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    return (
        <div className="flex flex-col w-full max-w-[640px]  min-w-[240px] h-[480px] md:h-[720px] rounded-lg border-2 bg-[#FF6384] justify-center items-center">
            <div className="flex flex-col items-center justify-start w-full h-full px-[5%] gap-4 md:gap-6 py-10">
                <h3 className="text-[24px] md:text-[42px] font-bold text-white py-[10px] md:py-[40px] leading-normal">{`VIP`}</h3>
                <div className="flex flex-row items-end justify-center h-[50px] md:h-[100px] leading-tight">
                    <span className="text-[28px] md:text-[56px] font-bold text-white pb-3 lg:pb-0">{`￥ 1200 /`}</span>
                    <span className="text-[16px] md:text-[24px] font-bold text-white pb-3">{t('month')}</span>
                </div>
                <div className="text-[18px] md:text-[24px] pt-[5px] md:pt-[20px] font-bold text-white flex flex-row gap-2 items-center">
                    <AiFillCheckCircle />
                    {t('plan_card_vip_des1')}
                </div>
                <div className="text-[18px] md:text-[24px] font-bold text-white flex flex-row gap-1 md:gap-2 items-start">
                    <AiFillCheckCircle className="min-w-[22px] mt-1" />
                    <span>{t('plan_card_vip_des2')}</span>
                </div>
            </div>
            <button
                name={'Subscribe_normal'}
                type={'button'}
                className={`inline-flex w-[70%] h-[70px] md:h-[104px]  items-center rounded-md bg-white
                        text-center text-[32px] font-bold text-red-500 justify-center
                        hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-400 
                        disabled:bg-gray-500 mb-[60px]`}
            >   
                {t('subscribe')}
            </button>
        </div>
    );
}

export const UCInfoCard = (
    {email, plan, availablePoint, expirePoint, expireDate } : 
    {
        email: string, 
        plan: string,
        availablePoint: string, 
        expirePoint: string, 
        expireDate: string,
    }
    ) => {
    const router = useRouter();
    return (
        <>
        <div className="hidden sm:flex flex-col w-full h-[360px] bg-white rounded-md shadow-lg">
            <div className="flex flex-row border-b h-[70px]">
                <div className="flex flex-col items-start justify-center pl-10">
                    <span className="text-[16px] font-medium text-black">{email?.split('@').at(0)}</span>
                    <span className="text-[14px] font-normal text-gray-400">{email}</span>
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col w-[50%] h-full items-end justify-center pr-8">
                    <div className="w-[180px] h-[180px] m-1 mr-2 relative flex justify-center items-center 
                        rounded-md bg-blue-500 text-[96px] text-white uppercase">
                        {email?.charAt(0)}
                    </div>
                </div>
                <div className="flex flex-col w-[50%] items-start justify-center pl-8">
                    <div className="flex flex-row gap-8">
                        <span className="font-normal text-[14px] text-black">{email}</span>
                        <div className={`${plan==='Standard'?'bg-[#F7CB47]':'bg-blue-600'}
                            font-bold text-[9px] text-white text-center rounded-md items-center justify-center flex px-4
                        `}>
                            {plan}
                        </div>
                    </div>
                    <div className="flex flex-row pt-8">
                        <div className="flex flex-col px-4">
                            <span className="text-center font-bold text-black text-[16px]">
                                {availablePoint}
                            </span>
                            <span className="text-center font-normal text-[#2C2C2C] text-[12px]">
                                {'Available (pt)'}
                            </span>
                        </div>
                        <div className="flex flex-col px-4 border-l">
                            <span className="text-center font-bold text-black text-[16px]">
                                {expirePoint}
                            </span>
                            <span className="text-center font-normal text-[#2C2C2C] text-[12px]">
                                {'expiring soon (pt)'}
                            </span>
                            <span className="text-center font-normal text-[#2C2C2C] text-[12px]">
                                {expireDate?.substring(0, 10)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="flex sm:hidden flex-col w-full max-w-[540px] min-w-[300px]">
            <div className="flex flex-row justify-between gap-8">
                <span className="font-normal text-[16px] text-black">{email}</span>
                <div className={`${plan==='Standard'?'bg-[#F7CB47]':'bg-blue-600'}
                    font-bold text-[9px] text-white text-center rounded-md items-center justify-center flex px-4
                `}>
                    {plan}
                </div>
            </div>
            <div className="flex w-full items-center justify-center bg-[#1676FE] rounded-xl shadow-lg mt-8">
                <div className="flex flex-row py-8">
                    <div className="flex flex-col px-6">
                        <span className="text-center font-bold text-white text-[32px]">
                            {availablePoint}
                        </span>
                        <span className="text-center font-normal text-white text-[12px]">
                            {'Available (pt)'}
                        </span>
                    </div>
                    <div className="flex flex-col px-6 border-l">
                        <span className="text-center font-bold text-white text-[32px]">
                            {expirePoint}
                        </span>
                        <span className="text-center font-normal text-white text-[12px]">
                            {'expiring soon (pt)'}
                        </span>
                        <span className="text-center font-normal text-white text-[12px]">
                            {expireDate?.substring(0, 10)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export const UCPlanCard = (
    
    {meinfo, plan, unsubscribeFinishCallback } : 
    {
        meinfo: UserDetails | null
        plan: string
        unsubscribeFinishCallback?: any
    }
    ) => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const [unsubscribeClicked, setUnsubscribeClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [unsubscribeProcess, setUnsubscribeProcess] = useState(false);

    const sleep = (delay: any) => new Promise((resolve) => setTimeout(resolve, delay))
    const ddd = async()=>{
        await sleep(1000);
    }
    const unsubscribeSureHandler = () => {
        setUnsubscribeProcess(true);
        setLoading(true);
        ddd().then(()=>{
            setLoading(false);
            unsubscribeFinishCallback?.();
        })
    }
    return (
        <div className="flex flex-col relative min-w-[300px] lg:min-w-[500px] max-w-[540px] w-full h-[420px] bg-white rounded-md shadow-lg">
            <div className="flex flex-row border-b h-[70px]">
                <div className="flex flex-col items-start justify-center pl-10">
                    <span className="text-[16px] font-medium text-black">{t('my_plan')}</span>
                    <span className="text-[14px] font-normal text-gray-400">{meinfo?.email}</span>
                </div>
                <div className={`${meinfo?.is_paying?'visible':'invisible'} w-full h-full items-center justify-end flex pr-10`}>
                    <BlueButton 
                        name={t('unsubscribe')}
                        type={"button"}
                        classname={"h-[30px] px-4 font-medium"}
                        clickhandler={()=>{setUnsubscribeClicked(true)}}
                    />
                </div>
            </div>
            <div className="flex flex-row w-full h-full px-[3%] py-[3%] mt-1">
                <PlanSwiper meinfo={meinfo!} plan={plan}/>
            </div>
            <div className={`${unsubscribeClicked?'flex': 'hidden'} absolute w-full h-full flex flex-col rounded-md z-40 bg-black/90 items-center justify-between`}>
                {!unsubscribeProcess?(
                <>
                <div className="flex flex-col w-fit pt-16 px-[5%]">
                    <span className="text-white text-[24px] border-b border-gray-200 px-4 pb-2">
                        {t('unsubscribe_des1')}
                    </span>
                    <span className="text-white/90 text-[16px] px-4 pt-2">
                        {t('unsubscribe_des2')}
                    </span>
                </div>
                <div className="flex flex-row w-full justify-center gap-2 px-12 mb-10">
                    <button
                        name={'cancel'}
                        type={'button'}
                        className={`inline-flex w-[70%] h-[40px] items-center rounded-md bg-yellow-500
                                text-center text-[18px] font-normal text-white justify-center
                                hover:bg-yellow-900 focus:outline-none 
                                disabled:bg-gray-500 mb-[30px]`}
                        onClick={()=>{setUnsubscribeClicked(false);}}
                    >   
                        {t('cancel')}
                    </button>
                    <button
                        name={'ok'}
                        type={'button'}
                        className={`inline-flex w-[70%] h-[40px] items-center rounded-md bg-red-400
                                text-center text-[18px] font-normal text-white justify-center
                                hover:bg-red-900 focus:outline-none 
                                disabled:bg-gray-500 mb-[30px]`}
                        onClick={unsubscribeSureHandler}
                    >   
                        {t('sure')}
                    </button>
                </div>
                </>
                ):(<>
                {loading?(
                <>
                    <div className="flex flex-col items-center justify-center h-[420px]">
                        <div className="loading-spinner "></div>
                        <span className="pt-[20px] text-[24px] text-white">
                            Processing...
                        </span>
                    </div>
                </>):(
                <>
                    <div className="flex flex-col w-fit pt-16 px-[5%]">
                        <span className="text-white text-[24px] border-b border-gray-200 px-4 pb-2">
                            {t('unsubscribe_des1')}
                        </span>
                        <span className="text-white/90 text-[16px] px-4 pt-2">
                            {t('unsubscribe_des2')}
                        </span>
                    </div>
                    <div className="flex flex-row w-full justify-center gap-2 px-12 mb-10">
                        <button
                            name={'ok'}
                            type={'button'}
                            className={`inline-flex w-[70%] h-[40px] items-center rounded-md bg-blue-400
                                    text-center text-[18px] font-normal text-white justify-center
                                    hover:bg-blue-900 focus:outline-none 
                                    disabled:bg-gray-500 mb-[30px]`}
                            onClick = {()=>{
                                setUnsubscribeClicked(false);
                                setUnsubscribeProcess(false);
                            }}
                        >   
                            {t('ok')}
                        </button>
                    </div>
                </>
                )}
                </>)}

            </div>
        </div>
    )
}

export const UCHistoryCard = (
    
    ) => {
    const router = useRouter();
    const {t} = useTranslation('common');
    return (
        <div className="flex flex-col min-h-[300px] min-w-[300px] lg:min-w-[500px] max-w-[540px] w-full h-[420px] bg-white rounded-md shadow-lg">
            <div className="flex flex-row border-b h-[70px]">
                <div className="flex flex-col items-start justify-center pl-10">
                    <span className="text-[16px] font-medium text-black">{t('payment_history')}</span>
                    <span className="text-[14px] font-normal text-gray-400">{t('payment_history_des')}</span>
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                
            </div>
            
        </div>
    )
}

export const TransactionCard = ({TxData}:{TxData:any}) => {
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
                {TxData.tokenTransfers?.map((data: any, index:number)=>{
                    return (
                        <div key={index} className="flex flex-col w-full">
                            <p>{`${data.type} Transfer`}</p>
                            <div className="flex flex-row w-full">
                                <a href={`/address/${data.from}`} className="min-w-[100px] w-[40%]">
                                    <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                        {data.from}
                                    </p>
                                </a>
                                <div className="flex w-[50px] h-[28px] justify-center items-center">
                                 <svg className="fill-current opacity-75 w-4 h-4 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                                </div>
                                <a href={`/address/${data.to}`} className="min-w-[100px] w-[40%]">
                                    <p className="text-[14px] text-blue-600 text-ellipsis overflow-hidden">
                                        {data.to}
                                    </p>
                                </a>
                                <div className="w-[20%] flex text-[12px] justify-end">
                                    {(data.value*1.0/Math.pow(10,Number(data.decimals))).toFixed(Number(data.decimals))} {data.symbol}
                                </div>
                            </div>
                        </div>
                    )
                })}
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

function syntaxHighlight(json: any) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
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