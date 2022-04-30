import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {onGetExchangePointData} from '../../../redux/actions';
import AppInfoView from '@crema/core/AppInfoView';
import {Grid} from '@mui/material';
import AppGridContainer from '@crema/core/AppGridContainer';
import AppAnimate from '@crema/core/AppAnimate';
import AppComponentCard from '@crema/core/AppComponentCard';
import ExchangePointForm from './ExchangePointForm';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ExchangePointFormSource from '!raw-loader!./ExchangePointForm';
import {AppState} from '../../../redux/store';

const ExchangePoint = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(onGetExchangePointData());
  }, [dispatch]);

  //   const {ecommerceData} = useSelector<AppState, AppState['dashboard']>(
  //     ({dashboard}) => dashboard,
  //   );

  return (
    <>
      <ExchangePointForm
        customer={{
          id: 1,
          code: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
        }}
      />

      {/* <AppComponentCard
        title='Đổi điểm'
        component={ExchangePointForm}
        noScrollbar
        source={ExchangePointFormSource}
        description='TextField is composed of smaller components ( FormControl, Input, FilledInput, InputLabel, OutlinedInput, and FormHelperText ) that you can leverage directly to significantly customize your form inputs.'
    /> */}
    </>
  );
};

export default ExchangePoint;
