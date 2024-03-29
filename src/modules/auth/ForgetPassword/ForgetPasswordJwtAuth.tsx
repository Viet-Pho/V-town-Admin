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
import {forgotPasswordRequest} from 'models/forgot-password';
import {useDispatch} from 'react-redux';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';

const ForgetPasswordJwtAuth = () => {
  const {messages} = useIntl();

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages['validation.emailFormat']))
      .required(String(messages['validation.emailRequired'])),
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
            <IntlMessages id='common.forgetPassword' />
          </Typography>

          <Typography
            sx={{
              pt: 3,
              fontSize: 15,
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
              <Button
                onClick={() => {
                  router.push('/signin');
                }}
              >
                <IntlMessages id='common.login' />
              </Button>
            </Box>
          </Typography>
        </Box>

        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                dispatch(fetchStart());
                //reset password api goes here
                try {
                  const response: any = await forgotPasswordRequest(data);
                  console.log('response', response);
                  if (response) {
                    dispatch(fetchSuccess());
                    dispatch(
                      showMessage(
                        'An Email has been sent  to  your mailbox! Please check it for your password reset link',
                      ),
                    );
                    setSubmitting(false);
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
                      placeholder='Email'
                      name='email'
                      label={<IntlMessages id='common.emailAddress' />}
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
                      <IntlMessages id='common.sendNewPassword' />
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

export default ForgetPasswordJwtAuth;
