import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useTranslation } from "@/utils/common";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import {useEffect} from 'react';
import { AddressCard, RawTransactionCard, TransactionCard } from "@/components/Cards";
import { TxPagination } from "@/components/Pagination";
import { getTokensTransfersFromTransaction } from "../common/worker";
import {
    Collapse,
    initTE,
  } from "tw-elements";
interface IParams extends ParsedUrlQuery {
    slug: string;
}

type AppProps = {
    addrData: any;
    txSpData: any;
  };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//       const { slug } = context.params as IParams;
//       const apiUrl = "https://ethbook.guarda.co/api";
//       let res = await fetch(`${apiUrl}/v2/address/${slug}?page=1&pageSize=10&secondary=jpy&details=txs`);
//       const addrData = await res.json();
//       return { props: { addrData } };
//     } catch (errorBlog) {
//       return { notFound: true };
//     }
// };

const TransactionPage: NextPage = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {locale} = router;
    const [searchtext, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [props, setProps] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const searchInputChangeHandler = (event: any) => {
        setSearchText(event.target.value);
    }
    
    const fetchData = async(page: number) => {
        setLoading(true);
        const slug  = router.query.slug;
        const apiUrl = "https://ethbook.guarda.co/api";
        let res = await fetch(`${apiUrl}/v2/address/${slug}?page=${page}&pageSize=10&secondary=jpy&details=txs`);
        if(!res.ok) {
            throw new Error('HTTP error! status: '+ res.status);
        }
        const addrData = await res.json();
        setCurrentPage(addrData.page)
        console.log('data=', addrData)
        setProps({addrData: addrData})
        setLoading(false);
    }

    const changePageHandler = (numPage:number) => {
        fetchData(numPage).catch((e)=>{
            console.error('An error occurred while fetching the data: ', e)
            setProps(null);
        });
    }

    useEffect(()=>{
        fetchData(currentPage).catch((e)=>{
            console.error('An error occurred while fetching the data: ', e)
            setProps(null);
        });
    }, [])
    
    const balance = (Number(props?.addrData?.balance!) / Math.pow(10,18)).toFixed(18);

    return (
        <Main
            loading = {loading}
            meta={
               <Meta title={'PassPay'} description={'common:description'} />
          }
        >
            {props?
            <div className="flex flex-col items-center justify-center w-full bg-[#ECF0F2] py-4">
                <div className="flex flex-col w-full min-w-[320px] max-w-[1200px] px-2 gap-4">
                    {props.addrData.address?
                        <>
                            <div className="flex flex-col w-full pb-12">
                                <h1 className="text-[32px] font-semibold pb-2">
                                    {`${props.addrData.contractInfo?('Contract '+props.addrData.contractInfo?.name!+ ' '+(props.addrData.contractInfo?.symbol?'('+props.addrData.contractInfo?.symbol+')':'')):'Address'}`}
                                </h1>
                                <span className="text-[20px] break-all">{props.addrData.address}</span>
                                <div className="flex flex-row w-full justify-between flex-wrap">
                                    <p className="text-[22px] font-medium">{`${balance} ETH`}</p>
                                    {
                                        props.addrData.secondaryValue?
                                        <p className="text-[22px] font-medium">{`${props.addrData.secondaryValue} JPY`}</p>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            <AddressCard AddrData={props.addrData} />
                            {props.addrData.totalPages?
                            <div className="flex flex-col w-full pt-6">
                                <div className="flex flex-row w-full justify-between">
                                    <span className="font-bold test-[22px] text-gray-600">Transactions</span>
                                    <TxPagination 
                                        TotalSize={Number(props.addrData.txs)} 
                                        SizePerPage = {10}
                                        CurrentPage={Number(props.addrData.page)}
                                        changePageHandler={changePageHandler}
                                    /> 
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    {props.addrData.transactions?.map((txData: any, idx: number)=>{
                                        const transferData = getTokensTransfersFromTransaction(txData);
                                        return <TransactionCard key={idx} TxData={txData} TokenTransfers={transferData} />
                                    })}
                                </div>
                                <div className="flex flex-row w-full justify-end py-2">
                                    <TxPagination 
                                        TotalSize={Number(props.addrData.txs)} 
                                        SizePerPage = {10}
                                        CurrentPage={Number(props.addrData.page)}
                                        changePageHandler={changePageHandler}
                                    /> 
                                </div>
                            </div>
                            : <></>
                            }  
                        </>
                    :(  <div>No Address Result</div>    )
                    }
                </div>
            </div>
            :<></>
            }
        </Main>
    )
}

export default TransactionPage;