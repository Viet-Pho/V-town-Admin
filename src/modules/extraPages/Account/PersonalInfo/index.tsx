import React, {useState} from 'react';
import {useAuthUser} from '@crema/utility/AuthHooks';
import {Formik} from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import {Box, Button, Typography} from '@mui/material';
import {saveProfile} from '../../../../redux/actions/Profile';
import {useDispatch} from 'react-redux';
import AppInfoView from '../../../../@crema/core/AppInfoView';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {sendVerifyEmail} from 'models/send-verify-email';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  const {user} = useAuthUser();
  const dispatch = useDispatch();

  console.log('User Data', user);
  const [submitting, setSubmitting] = useState(false);

  const handleSendVerifyEmail = async () => {
    const requestBody = {
      email: user?.email,
    };

    setSubmitting(true);
    dispatch(fetchStart());
    //reset password api goes here
    try {
      const response: any = await sendVerifyEmail(requestBody);
      console.log('response', response);
      if (response) {
        dispatch(fetchSuccess());
        dispatch(
          showMessage(
            'An Email has been sent  to  your mailbox! Please check it for your email confirmation link',
          ),
        );
        setSubmitting(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.message.includes('ER_DUP_ENTRY')) {
        dispatch(
          fetchError(`A token has already been  sent  to this account `),
        );
        setSubmitting(false);
      } else {
        dispatch(fetchError(`Error: ${error?.response?.data?.message}`));
        setSubmitting(false);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      {user?.confirmed === 0 ? (
        <Box sx={{mb: 2}} style={{textAlign: 'right'}}>
          <Typography>
            Warning: Account is not verified. Please Verify Account for great
            features
          </Typography>
          <Button disabled={submitting} onClick={() => handleSendVerifyEmail()}>
            Verify Email
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          photoURL: user.photoURL
            ? user.photoURL
            : '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          console.log('data: ', data);
          dispatch(saveProfile());
          setSubmitting(false);
        }}
      >
        {({values, setFieldValue}) => {
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>

      <AppInfoView />
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
