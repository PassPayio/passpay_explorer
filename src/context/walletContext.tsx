import { createContext, useState, useEffect, useContext } from 'react';
import cookies from 'js-cookie';
import { getUserDetailsFromCookie, setUserDetailsCookie } from '../firebase/auth/userCookie';

export interface UserDetails {
    availablePoint: 0;
    email: string;
    is_paying: boolean;
    provider: string;
    idToken: string;
}
interface WalletContextProps {
    userDetails: UserDetails;
    setUserDetails: (userDetails: UserDetails) => void;
    loadUserDetails: ()=>void;
}

const WalletContext = createContext<WalletContextProps | null> (null);

export interface WalletProviderProps {
    children: React.ReactNode;
}

const WalletProvider = ({children}: WalletProviderProps)=>{
    const [userDetails, setUserDetail] = useState<UserDetails>();

    const loadDataFromCookie = () => {
        const userDetails = getUserDetailsFromCookie();
        setUserDetail(userDetails);
    }

    const saveUserDetails = (userDetails: UserDetails)=>{
        console.log("wallet context save      ", userDetails)
        setUserDetail(userDetails);
        setUserDetailsCookie(userDetails);
    }

    useEffect(()=>{
        loadDataFromCookie();
    },[]);
    return (
        <WalletContext.Provider
            value={{
                userDetails: userDetails as any,
                setUserDetails:saveUserDetails,
                loadUserDetails: loadDataFromCookie,
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider;

export const useOurContext = (onLoad: any) => {
    const context = useContext(WalletContext);
    if (context === null) {
        throw new Error("can't find context");
    }
    onLoad?.(context);
    return context;
}