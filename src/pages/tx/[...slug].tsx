import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useTranslation } from "@/utils/common";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import {useEffect} from 'react';
import { RawTransactionCard, TransactionCard } from "@/components/Cards";
import { getTokensTransfersFromTransaction } from '../common/worker';

interface IParams extends ParsedUrlQuery {
    slug: string;
}

type AppProps = {
    txData: any;
    txSpData: any;
  };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     try {
//       const { slug } = context.params as IParams;
//       const apiUrl = "https://ethbook.guarda.co/api";
//       let res = await fetch(`${apiUrl}/v2/tx/${slug}`);
//       const txData = await res.json();
//       res = await fetch(`${apiUrl}/v2/tx-specific/${slug}`)
//       const txSpData = await res.json();
//       return { props: { txData, txSpData } };
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
    const [tokenTransferData, setTokenTransferData] = useState<Map<string, Array<any>>|null>();
    const [props, setProps] = useState<any>();
    
    const fetchData = async() => {
        setLoading(true);
        const slug  = router.query.slug;
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        let res = await fetch(`${apiUrl}/v2/tx/${slug}`);
        if(!res.ok) {
            throw new Error('HTTP error! status: '+ res.status);
        }
        const txData = await res.json();
        res = await fetch(`${apiUrl}/v2/tx-specific/${slug}`)
        if(!res.ok) {
            throw new Error('HTTP error! status: '+ res.status);
        }
        const txSpData = await res.json();
        const transferData = getTokensTransfersFromTransaction(txData);
        setTokenTransferData(transferData);
        setProps({txData: txData, txSpData: txSpData})
        setLoading(false);
    }

    useEffect(()=>{
        fetchData().catch((e)=>{
            console.error('An error occurred while fetching the data: ', e)
            setProps(null);
            setLoading(false);
        });
        
        // console.log(props.txData);
        // console.log(transferData);
    },[])

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
                    {props.txData.txid?
                        <>
                            <div className="flex flex-col w-full pb-12">
                                <h1 className="text-[32px] font-semibold pb-2">Transaction</h1>
                                <span className="text-[20px] break-all">{props.txData.txid}</span>
                            </div>
                            <TransactionCard TxData={props.txData} TokenTransfers = {tokenTransferData}/>
                            <RawTransactionCard TxData={props.txSpData} />
                        </>
                    :(  <div className="w-full text-center pt-12">No Transaction Result</div>    )
                    }
                </div>
            </div>
            :<div className="w-full text-center pt-12">No Transaction Result</div>  }
        </Main>
    )
}

export default TransactionPage;