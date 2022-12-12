import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import parseJwt from '../../services/parseJwt';
import AuthContext from '../../contexts/authentication/AuthContext';

function AuthVerify() {
  let location = useLocation();
  const { currentUser, logOut } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      const decodedJwt = parseJwt(currentUser.authorization);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut, currentUser]);

  return;
}

export default AuthVerify;
