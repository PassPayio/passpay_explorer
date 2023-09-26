import firebase_app from '@/firebase/firebaseConfig';
import {DeviceUUID} from 'device-uuid';
import { getAuth } from 'firebase/auth';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

export const getConfig=(token: string)=>{
    return {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };
}

export const getAuthConfig = async() => {
  const auth = getAuth(firebase_app);
  return {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${await auth.currentUser?.getIdToken(false)}`,
    },
  };
}
export type DeviceInfo = {
  device_uuid: string;
  device_type: string;
}


export const getDeviceInfo = ():DeviceInfo => {
  try{
    let uuid = localStorage.getItem("uuid");
    if(!uuid) {
      uuid = uuidv4();
      localStorage.setItem("uuid", uuid!);
    }
    return {device_uuid:uuid!, device_type: "web"};
  } catch(error) {
    return {device_uuid:"", device_type:"Unknown"};
  }
}

export const getSoonExpirePoint = async (config: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/users/soon_expired_point`
    const result = await axios.get(url, config).then((response)=>{
      return response.data;
    }).catch((err)=>{
      return null;
    });
    return result;
  } catch(error) {
    return null;
  }
}

export const getMeInfo = async (config: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/me`
    const result = await axios.get(url, config).then((response)=>{
      return response.data.user;
    }).catch((err)=>{
      return null;
    });
    return result;
  } catch(error) {
    return null;
  }
}

export const getPlans = async() => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/plans`
    const result = await axios.get(url).then((response)=>{
      return response.data.plans;
    }).catch((err)=>{
      return null;
    });
    return result;
  } catch(error) {
    return null;
  }
}
export const getMePlan = async (config: any) => {
  try {
    const plans = await getPlans();
    if(!plans) return null;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/users/myplan`
    const plan_id = await axios.get(url, config).then((response)=>{
      return response.data?.plan?.plan_id;
    }).catch((err)=>{
      return null;
    });

    if(plans[0].id === plan_id) return 'Standard';
    if(plans[1].id === plan_id) return 'Vip';
    return null;
  } catch(error) {
    return null;
  }
}