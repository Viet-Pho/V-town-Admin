import React from 'react';
import Button from '@mui/material/Button';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Fonts} from '../../../shared/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';

import {useDispatch} from 'react-redux';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {resetPasswordRequest} from 'models/reset-password';

const ResetPasswordPage = () => {
  // Get Token from Params
  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);
  const token = urlObject.searchParams.get('token');

  console.log('Current  Token', token);

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    password: yup.string().required('Password is required').min(8).max(25),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const router = useRouter();
  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box sx={{mb: {xs: 8, xl: 10}}}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: {xs: 14, xl: 16},
            }}
          >
            Reset Password
          </Typography>
        </Box>

        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Formik
              validateOnChange={true}
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                dispatch(fetchStart());
                //reset password api goes here
                const requestBody = {
                  password: data?.password,
                  token: token,
                };

                try {
                  const response: any = await resetPasswordRequest(requestBody);
                  console.log('response', response);
                  if (response) {
                    dispatch(fetchSuccess());
                    dispatch(showMessage('Success'));
                    setSubmitting(false);
                    router.push('/signin');
                  }
                } catch (error: any) {
                  if (error?.response?.data?.message.includes('ER_DUP_ENTRY')) {
                    dispatch(
                      fetchError(
                        `A token has already been  sent  to this account `,
                      ),
                    );
                    setSubmitting(false);
                  } else {
                    dispatch(
                      fetchError(`Error: ${error?.response?.data?.message}`),
                    );
                    setSubmitting(false);
                  }
                }

                resetForm();
              }}
            >
              {({isSubmitting}) => (
                <Form style={{textAlign: 'left'}}>
                  <Box sx={{mb: {xs: 5, lg: 8}}}>
                    <AppTextField
                      type='password'
                      placeholder='New Password'
                      name='password'
                      label='New Password'
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                      variant='outlined'
                    />
                  </Box>
                  <Box sx={{mb: {xs: 5, lg: 8}}}>
                    <AppTextField
                      type='password'
                      placeholder='Confirm Password'
                      name='confirmPassword'
                      label='Confirm Password'
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                      variant='outlined'
                    />
                  </Box>

                  <div>
                    <Button
                      variant='contained'
                      color='primary'
                      disabled={isSubmitting}
                      sx={{
                        fontWeight: Fonts.REGULAR,
                        textTransform: 'capitalize',
                        fontSize: 16,
                        minWidth: 160,
                      }}
                      type='submit'
                    >
                      Confirm Reset Password
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>

          <AppInfoView />
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
