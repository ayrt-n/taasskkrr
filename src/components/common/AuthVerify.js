import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import parseJwt from '../../services/parseJwt';
import AuthService from '../../services/AuthService';

function AuthVerify({ logOut }) {
  let location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      const decodedJwt = parseJwt(user.authorization);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);

  return;
}

export default AuthVerify;
