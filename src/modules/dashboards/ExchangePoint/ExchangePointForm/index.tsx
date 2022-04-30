import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Box, Typography} from '@mui/material';
import AppCard from '@crema/core/AppCard';
import AppGridContainer from '@crema/core/AppGridContainer';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Customer} from 'types/models/dashboards/ExchangePoint';
import {createExchangePoint} from '../../../../models/exchange-point';
import {searchCustomers} from '../../../../models/customer';
import {fetchError, fetchStart, fetchSuccess, showMessage} from '../../../../redux/actions';

interface ExchangePointProps {
  customer: Customer;
}

const ExchangePointForm: React.FC<ExchangePointProps> = (props) => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({...props.customer});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [points, setPoints] = useState(0);
  const pointsInput = useRef<HTMLInputElement>(null);
  const stringUser = localStorage.getItem('user');
  const {userId} = JSON.parse(stringUser || '{userId: 0}');

  const handleSearchCustomer = async (event) => {

    if (event.key !== 'Enter' || event.target.value === '') return;
    dispatch(fetchStart());
    setCustomer({...props.customer});
    const [customer] = await searchCustomers({code: event.target.value});
    if (!!customer) {
      setCustomer(customer);
      pointsInput.current?.focus();
    } else {
      // dispatch(showMessage('show Message'));
      // It's not Showing the error
      // dispatch(fetchSuccess());
    }
  };

  const _createExchangePoint = async () => {
    const addedExchangePoint = {
      customerId: customer.id,
      userId,
      points: points,
    };
    setShowSuccessAlert(true);
    await createExchangePoint(addedExchangePoint);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const handleClickExchangePoint = (event) => {
    if (event.key !== 'Enter' || event.target.value === '') return;
    _createExchangePoint();
  };

  return (
    <AppCard className='card-hover'>
      <AppGridContainer>
        {showSuccessAlert && (
          <Grid item xs={12} md={12} lg={12}>
            <Alert variant='filled' severity='success'>
              Tích điểm cho khách hàng thành công.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='customer_code'
              autoFocus
              label='Mã khách hàng'
              value={customer.code}
              onChange={(event) =>
                setCustomer({...customer, code: event.target.value})
              }
              onKeyDown={handleSearchCustomer}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='firstname'
              label='Tên'
              variant='filled'
              value={customer.firstName}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='lastname'
              label='Họ và đệm'
              variant='filled'
              value={customer.lastName}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='phonenumber'
              label='Số điện thoại'
              variant='filled'
              value={customer.phoneNumber}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='email'
              label='Email'
              variant='filled'
              value={customer.email}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='address'
              label='Địa chỉ'
              variant='filled'
              value={customer.address}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='points'
              label='Điểm tích'
              value={points}
              onChange={(event) => setPoints(Number(event.target.value))}
              onKeyDown={handleClickExchangePoint}
              inputRef={pointsInput}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container spacing={2} alignItems='flex-end'>
            <Grid item xs={8} md={8} lg={8}></Grid>
            <Grid item xs={2} md={2} lg={2}>
              <Button variant='outlined' color='error'>
                Clear this Form
              </Button>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <Button
                variant='contained'
                color='success'
                onClick={_createExchangePoint}
              >
                Exchange
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
};

export default ExchangePointForm;
