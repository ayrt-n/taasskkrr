import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmEmail } from '../services/accountService';

function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const routerNavigate = useNavigate();

  useEffect(() => {
    const confirmationToken = searchParams.get('confirmation_token');
    confirmEmail(confirmationToken).then((data) => {
      if (!data.error) {
        routerNavigate(
          '/login',
          { state: {
              type: 'success',
              message: 'Email confirmed!',
              body: 'Log in and get started!'
            }
          }
        );
      } else {
        routerNavigate(
          '/login',
          { state: {
              type: 'danger',
              message: 'Unable to confirm email:',
              details: data.error.details
            }
          }
        );
      }
    });
  }, [searchParams, routerNavigate]);

  return;
}

export default EmailConfirmation;
