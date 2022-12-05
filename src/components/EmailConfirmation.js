import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const routerNavigate = useNavigate();

  useEffect(() => {
    const confirmationToken = searchParams.get('confirmation_token');
    AuthService.confirmEmail(confirmationToken).then((data) => {
      if (!data.error) {
        // TODO ADD SOME SORT OF INDICATION OF SUCCESS
        routerNavigate('/login');
      } else {
        console.log(data);
      }
    });
  }, [searchParams, routerNavigate]);

  return;
}

export default EmailConfirmation;
