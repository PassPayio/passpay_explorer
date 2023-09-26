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
    addrData: any;
    txSpData: any;
  };

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const { slug } = context.params as IParams;
      const apiUrl = "https://ethbook.guarda.co/api";
      let res = await fetch(`${apiUrl}/v2/address/${slug}`);
      const addrData = await res.json();
      return { props: { addrData } };
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
                    {props.addrData.address?
                        <>
                            <div className="flex flex-col w-full pb-12">
                                <h1 className="text-[32px] font-semibold pb-2">
                                    {`${props.addrData.contractInfo?('Contract '+props.addrData.contractInfo?.name!+ ' '+(props.addrData.contractInfo?.symbol?'('+props.addrData.contractInfo?.symbol+')':'')):'Address'}`}
                                </h1>
                                <span className="text-[20px] break-all">{props.addrData.address}</span>
                            </div>
                        </>
                    :(  <div>No Address Result</div>    )
                    }
                </div>
            </div>
        </Main>
    )
}

export default TransactionPage;