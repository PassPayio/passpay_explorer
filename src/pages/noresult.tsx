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

const NoResult: NextPage = () => {
    const router = useRouter();
    const {t} = useTranslation('common');
    const {locale} = router;
    

    return (
        <Main
            loading = {false}
            meta={
               <Meta title={'PassPay'} description={'common:description'} />
          }
        >
            <div className="flex flex-col items-center justify-center w-full bg-[#ECF0F2] py-4">
                <div className="flex flex-col w-full min-w-[320px] max-w-[1200px] px-2 gap-4">
                    
                </div>
            </div>
        </Main>
    )
}

export default NoResult;