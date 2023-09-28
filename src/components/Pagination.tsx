import React, { useEffect } from "react";
// import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; // import css
import { useState } from 'react';
import dynamic from 'next/dynamic';

export const TxPagination = ({CurrentPage, TotalSize, SizePerPage,  changePageHandler}:{CurrentPage:number, TotalSize: number,SizePerPage: number, changePageHandler: any}) => {
    const Pagination = dynamic(()=>import('react-pagination-js'), {ssr: false})
    return (
        <div>
            <Pagination
                currentPage={CurrentPage}
                totalSize={TotalSize}
                sizePerPage={SizePerPage}
                changeCurrentPage={changePageHandler}
                theme="bootstrap"
            /> 
        </div>
    )
}

