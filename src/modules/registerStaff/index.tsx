import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AppLogo from '@crema/core/AppLayout/components/AppLogo';
import RegisterForm from './components/registerForm';
import AuthWrapper from 'modules/auth/AuthWrapper';

const RegisterStaff = () => {
  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{mb: {xs: 6, xl: 8}}}>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ml: 2}} variant='h1'>
            REGISTER STAFF
          </Typography>
        </Box>
      </Box>
      <Box style={{textAlign: 'center'}}>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterStaff;
