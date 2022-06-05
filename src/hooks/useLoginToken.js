import { useState } from 'react';

export default function useLoginToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const clearToken = () => {
    sessionStorage.removeItem('token');
  };

  return {
    setToken: saveToken,
    logOut: clearToken,
    token,
  };
}
