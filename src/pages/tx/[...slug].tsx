import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { useTranslation } from "@/utils/common";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import useEffect from 'react';
import { RawTransactionCard, TransactionCard } from "@/components/Cards";

interface IParams extends ParsedUrlQuery {
    slug: string;
}

type AppProps = {
    txData: any;
    txSpData: any;
  };

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const { slug } = context.params as IParams;
      const apiUrl = "https://ethbook.guarda.co/api";
      let res = await fetch(`${apiUrl}/v2/tx/${slug}`);
      const txData = await res.json();
      res = await fetch(`${apiUrl}/v2/tx-specific/${slug}`)
      const txSpData = await res.json();
      return { props: { txData, txSpData } };
    } catch (errorBlog) {
      return { notFound: true };
    }
};

const TransactionPage: NextPage<AppProps> = (props:AppProps) => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {locale} = router;
    const [searchtext, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const searchInputChangeHandler = (event: any) => {
        setSearchText(event.target.value);
    }
    console.log('data1=', props)
    return (
        <Main
            loading = {loading}
            meta={
               <Meta title={'PassPay'} description={'common:description'} />
          }
        >
            <div className="flex flex-col items-center justify-center w-full bg-[#ECF0F2] py-4">
                <div className="flex flex-col w-full min-w-[320px] max-w-[1200px] px-2 gap-4">
                    {props.txData.txid?
                        <>
                            <div className="flex flex-col w-full pb-12">
                                <h1 className="text-[32px] font-semibold pb-2">Transaction</h1>
                                <span className="text-[20px] break-all">{props.txData.txid}</span>
                            </div>
                            <TransactionCard TxData={props.txData}/>
                            <RawTransactionCard TxData={props.txSpData} />
                        </>
                    :(  <div>No Transaction Result</div>    )
                    }
                </div>
            </div>
        </Main>
    )
}

export default TransactionPage;