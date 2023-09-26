import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'firebase/auth';
import firebase_app from "../firebaseConfig";
import { getAuth, User } from 'firebase/auth';
import { removeUserDetailsCookie } from './userCookie';

const auth = getAuth(firebase_app);

import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from './userCookie';

export interface UserInfo {
    id: string|null,
    email: string|null,
    token: string|null,
}

export const mapUserData = async (user: User) => {
  try{
    const { uid, email } = user;
    const token = await user?.getIdToken(false);
    const userInfo:UserInfo = {
      id: uid,
      email,
      token
    }
    return userInfo;
  } catch (error) {
    return null;
  }
};

  
const useUser = () => {
  const [user, setUser] = useState<UserInfo|null>();
  const router = useRouter();

  const logout = async () => {
    setUser(null);
    return auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = auth
      .onIdTokenChanged(async userToken => {
        if (userToken) {
          const userData = await mapUserData(userToken);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          removeUserDetailsCookie();
          setUser(null);
        }
      });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);
    return () => {cancelAuthListener};
  }, []);

  return { user, logout };
};

export { useUser };