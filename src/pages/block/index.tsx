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
    blockData: any;
};

type TxPageData = {
    data: any;
    page: number;

}

const BlockPage: NextPage = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {locale} = router;
    const [searchtext, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [props, setProps] = useState<AppProps>();
    const [currentPage, setCurrentPage] = useState(1);
    const [txpageData, setTxPageData] = useState<TxPageData>();

    const fetchData = async() => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        let res = await fetch(apiUrl);
        if(!res.ok) {
            throw new Error('HTTP error! status: '+ res.status);
        }
        const apiData = await res.json();

        const latestBlock = apiData?.blockbook.bestHeight!;
        res = await fetch(`${apiUrl}/v2/block/${latestBlock}`);
        if(!res.ok) {
            throw new Error('HTTP error! status: '+ res.status);
        }
        const blockData = await res.json();
        
        setCurrentPage(blockData.page)
        const totalTxs = blockData.txs as [];
        setTxPageData({data:totalTxs.slice(blockData.page, blockData.page+10), page: blockData.page});
        // console.log('data=', blockData);

        setProps({blockData})
        setLoading(false);
    }

    const fetchPageData = async(page: number) => {
        const totalTxs = props?.blockData.txs as [];
        setTxPageData({data:totalTxs.slice((page-1)*10, (page-1)*10+10), page: page});
    }
    const changePageHandler = (numPage:number) => {
        fetchPageData(numPage).catch((e)=>{
            console.error('An error occurred while fetching the data: ', e)
            setProps(undefined);
        });
    }

    useEffect(()=>{
       fetchData().catch((e)=>{
            console.error('An error occurred while fetching the data: ', e)
            setProps(undefined);
        });
    }, [])
    
    const balance = (Number(props?.blockData?.balance!) / Math.pow(10,18)).toFixed(18);

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
                    {props.blockData.txs?
                        <>
                            {props.blockData.txCount?
                            <div className="flex flex-col w-full pt-6">
                                <div className="flex flex-row w-full justify-between">
                                    <span className="font-bold test-[22px] text-gray-600">Transactions</span>
                                    <TxPagination 
                                        TotalSize={Number(props.blockData.txCount)} 
                                        SizePerPage = {10}
                                        CurrentPage={Number(txpageData?.page)}
                                        changePageHandler={changePageHandler}
                                    /> 
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    {txpageData?.data?.map((txData: any, idx: number)=>{
                                        const transferData = getTokensTransfersFromTransaction(txData);
                                        return <TransactionCard key={idx} TxData={txData} TokenTransfers={transferData} />
                                    })}
                                </div>
                                <div className="flex flex-row w-full justify-end py-2">
                                    <TxPagination 
                                        TotalSize={Number(props.blockData.txCount)} 
                                        SizePerPage = {10}
                                        CurrentPage={Number(txpageData?.page)}
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

export default BlockPage;