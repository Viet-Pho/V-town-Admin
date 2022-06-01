import {FC, useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import {Box, Typography} from '@mui/material';

import {confirmEmailRequest} from 'models/confirm-email';
const VerifyEmail = () => {
  const currentLocation = window.location.href;
  const url = new URL(currentLocation);

  const token = url.searchParams.get('token');

  const requestBodyForVerify = {
    token: token,
  };
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorToken, setErrorToken] = useState(false);
  const [errorEmailAlreadyVerified, setEmailAlreadyVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      const response: any = await confirmEmailRequest(requestBodyForVerify);
      if (response) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setErrorToken(true);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        position: 'relative',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'center', mb: 6}}>
        <Box
          sx={{height: 98, '& > img': {height: '100%', width: 'auto'}}}
        ></Box>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {loading && (
          <div>
            <CircularProgress sx={{mb: 4}} />
            <Typography variant='h6'>Processing Your Data...</Typography>
          </div>
        )}

        {success && (
          <Typography variant='h6'>
            Account verified. You may close this page
          </Typography>
        )}

        {!success && (
          <>
            {errorToken && (
              <Typography variant='h6'>
                Your token is expired. You may want to close this tab
              </Typography>
            )}

            {errorEmailAlreadyVerified && (
              <Typography variant='h6'>
                Account is already verified. You may want to close this tab
              </Typography>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default VerifyEmail;
