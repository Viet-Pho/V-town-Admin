import React from 'react';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Fonts} from '../../../shared/constants/AppEnums';
import Link from 'next/link';
import {useJWTAuthActions} from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import {useIntl} from 'react-intl';

const SignupJwtAuth = () => {
  const {signUpUser} = useJWTAuthActions();
  const {messages} = useIntl();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(String(messages['validation.nameRequired'])),
    email: yup
      .string()
      .email(String(messages['validation.emailFormat']))
      .required(String(messages['validation.emailRequired'])),
    password: yup
      .string()
      .required(String(messages['validation.passwordRequired'])),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    phone_number: yup.string().required('Phone Number is required'),
    address: yup.string().required('Address is required'),
  });

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            first_name: '',
            last_name: '',
            age: '',
            phone_number: '',
            address: '',
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            console.log('data', data);
            setSubmitting(true);
            signUpUser({
              email: data.email,
              password: data.password,
              username: data.username,
              last_name: data.last_name,
              age: parseInt(data.age),
              phone_number: data.phone_number,
              address: data.address,
              first_name: data.first_name,
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label='First Name'
                  name='first_name'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label='Last Name'
                  name='last_name'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label='Age'
                  name='age'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label=' Address'
                  name='address'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label='Username'
                  name='username'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>
              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label='Phone Number'
                  name='phone_number'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 4, xl: 5}}}>
                <AppTextField
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  type='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    sx={{
                      ml: -3,
                    }}
                  />
                  <Box
                    component='span'
                    sx={{
                      mr: 2,
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    cursor: 'pointer',
                  }}
                >
                  <IntlMessages id='common.termConditions' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                  type='submit'
                >
                  <IntlMessages id='common.signup' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.alreadyHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link href='/signin'>
            <IntlMessages id='common.signIn' />
          </Link>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SignupJwtAuth;
