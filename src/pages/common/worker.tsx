import axios from "axios";

export async function searchHash(hash: String) {
    const apiUrl = "https://ethbook.guarda.co/api";
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

    const addrUrl = apiUrl + "/v2/address/"+hash;
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
    return txResult;
}