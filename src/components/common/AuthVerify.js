import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import parseJwt from '../../services/parseJwt';
import { getCurrentUser } from '../../services/authService';

function AuthVerify({ logOut }) {
  let location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();

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
