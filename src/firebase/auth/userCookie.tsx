import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  try{
    const cookie = cookies.get('auth');
    if (!cookie) {
      return;
    }
    return JSON.parse(cookie);
  } catch(err) {
    return null;
  }
};

export const setUserCookie = (user: any) => {
  cookies.set('auth', JSON.stringify(user), {
    expires: 1/24
  });
};

export const getUserDetailsFromCookie = () => {
  try{
    const cookie = cookies.get('userinfo');
    if (!cookie) {
      return null;
    }

    return JSON.parse(cookie);
  } catch(err) {
    return null;
  }
}

export const setUserDetailsCookie = (data: any) => {
  cookies.set('userinfo', JSON.stringify(data), {
    expires: 1/24
  }) 
}
export const removeUserCookie = () => cookies.remove('auth');
export const removeUserDetailsCookie = () => cookies.remove('userinfo');