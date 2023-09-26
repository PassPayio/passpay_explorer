import firebase_app from "../firebaseConfig";
import { AuthCredential, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import axios from "axios";
import { getConfig } from "@/lib/utils";
import { getDeviceInfo } from '../../lib/utils';

const auth = getAuth(firebase_app);
const providerGoogle = new GoogleAuthProvider();
const providerApple = new OAuthProvider('apple.com');

export enum AUTH_TYPE {
    google,
    apple
}
export const signUpWithGoogleOrApple = async(authType: AUTH_TYPE) => {
    let provider;
    if(authType === AUTH_TYPE.apple) {
        provider = providerApple;
    } else {
        provider = providerGoogle;
    }
    const credential = await signInWithPopup(auth, provider).then((result)=>{
        let credential;
        if (authType === AUTH_TYPE.google) {
            credential = GoogleAuthProvider.credentialFromResult(result)
        } else if(authType === AUTH_TYPE.apple) {
            credential = OAuthProvider.credentialFromResult(result);
        }
        return credential;
    }).catch((error)=>{
        return null;
    });
    if (!credential) return null;
    
    const signupUrl = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/auth/sign_up`;
    const idToken = await auth.currentUser?.getIdToken(false)!;
    const config = getConfig(idToken);
    const devInfo = getDeviceInfo();
    return await axios
        .post(signupUrl, devInfo, config)
        .then((response)=>{
            const result = response.data.data;
            result['idToken'] = idToken;
            return {success: true, data: result};
        })
        .catch((error)=>{
            console.log("api error=", error.response);
            return {success: false, data: error.response};
        })

}

export const signInWithGoogleOrApple = async(authType: AUTH_TYPE) => {
    let provider;
    if(authType === AUTH_TYPE.apple) {
        provider = providerApple;
    } else {
        provider = providerGoogle;
    }

    const credential = await signInWithPopup(auth, provider).then((result)=>{
        let credential;
        if (authType === AUTH_TYPE.google) {
            credential = GoogleAuthProvider.credentialFromResult(result)
        } else if(authType === AUTH_TYPE.apple) {
            credential = OAuthProvider.credentialFromResult(result);
        }
        return credential;
    }).catch((error)=>{
        return null;
    });
    if (!credential) return null;
    
    const signupUrl = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/auth/sign_in`;
    const idToken = await auth.currentUser?.getIdToken(false)!;
    const config = getConfig(idToken);
    const devInfo = getDeviceInfo();
    return await axios
        .post(signupUrl, devInfo, config)
        .then((response)=>{
            const result = response.data.data;
            result['idToken'] = idToken;
            return {success: true, data: result};
        })
        .catch((error)=>{
            console.log("api error=", error.response);
            return {success: false, data: error.response};
        })

}