import axios from "axios";

const woker=()=>{
    <></>
}
export async function searchHash(hash: String) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const txUrl = apiUrl + "/v2/tx/"+hash;
    console.log(txUrl);
    const txResult = await axios.get(txUrl)
        .then((data)=>{
            console.log('data=',data);
            return data.data;
        })
        .catch((err)=>{
            console.log('err=', err)
            return null
        });
    if(txResult !== null) {
        return {"type":0, "result": txResult};
    }

    const addrUrl = apiUrl + "/v2/address/"+hash+"?details=basic";
    const addrResult = await axios.get(addrUrl)
        .then((data)=>{
            console.log('data=',data);
            return data.data;
        })
        .catch((err)=>{
            console.log('err=', err)
            return null
        });
    if(addrResult !== null) {
        return {"type":1, "result": addrResult};
    }
    return null;
}

export function getTokensFromAddress(addrData: any) {
    let retData = new Map<string, Array<any>>();
    if(addrData?.tokens) {
        addrData.tokens.map((token: any)=>{
            if(retData.has(token.type)) {
                retData.get(token.type)?.push(token);
            } else {
                let tokenArray = new Array<any>();
                tokenArray.push(token);
                retData.set(token.type, tokenArray);
            }
        });
        return retData;
    }
    return null;
}

export function getTokensTransfersFromTransaction(txData: any) {
    let retData = new Map<string, Array<any>>();
    if(txData?.tokenTransfers) {
        txData.tokenTransfers.map((txItem: any)=>{
            if(retData.has(txItem.type)) {
                retData.get(txItem.type)?.push(txItem);
            } else {
                let tokenArray = new Array<any>();
                tokenArray.push(txItem);
                retData.set(txItem.type, tokenArray);
            }
        });
        return retData;
    }
    return null;
}

export default woker;