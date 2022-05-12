import React, {useState, useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Box, Typography} from '@mui/material';
import AppCard from '@crema/core/AppCard';
import AppGridContainer from '@crema/core/AppGridContainer';
import AppAnimate from '@crema/core/AppAnimate';
import AppInfoView from '@crema/core/AppInfoView';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Customer} from 'types/models/dashboards/ExchangePoint';
import {createExchangePoint} from '../../../../models/exchange-point';
import {searchCustomers} from '../../../../models/customer';
import Alert from '@mui/material/Alert';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../../redux/actions';
import {useIntl} from 'react-intl';

interface ExchangePointProps {
  customer: Customer;
}

const ExchangePointForm: React.FC<ExchangePointProps> = (props) => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({...props.customer});
  const [points, setPoints] = useState(0);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [successResult, setSuccessResult] = useState({totalPoints: 0});
  const [showCardDisabledAlert, setShowCardDisabledAlert] = useState(false);

  const cardNumberInput = useRef<HTMLInputElement>(null);
  const pointsInput = useRef<HTMLInputElement>(null);
  const stringUser = localStorage.getItem('user');
  const {userId} = JSON.parse(stringUser || '{userId: 0}');
  const {messages} = useIntl();

  const handleSearchCustomer = async (event) => {
    if (event.key !== 'Enter' || event.target.value === '') return;
    dispatch(fetchStart());
    setShowCardDisabledAlert(false);
    setCustomer({...props.customer});
    const {customers} = await searchCustomers({cardNumber: event.target.value});
    const [customer] = customers || [];

    if (!!customer) {
      console.log(555, customer);
      setCustomer(customer);
      pointsInput.current?.focus();
      setShowCardDisabledAlert(!!customer.cardDeleted);
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchError('Customer not Found'));
    }
  };

  const _createExchangePoint = async () => {
    dispatch(fetchStart());
    const addedExchangePoint = {
      customerId: customer.id,
      userId,
      points: points,
    };
    if (!customer.id) {
      return dispatch(fetchError('Form not allow being empty.'));
    }
    if (!points) {
      return dispatch(fetchError('Points not allow being 0.'));
    }

    try {
      const totalPoints = await createExchangePoint(addedExchangePoint);
      setSuccessResult(totalPoints);
      setOpenSuccessDialog(true);
      dispatch(showMessage('Exchange point success.'));
    } catch (error) {
      dispatch(
        fetchError(
          'Sommething went wrong with this customer. Please try again later.',
        ),
      );
    }
  };

  const _clearForm = () => {
    setCustomer({...props.customer});
    setPoints(0);
    cardNumberInput.current?.focus();
  };

  const handleClickExchangePoint = (event) => {
    if (event.key !== 'Enter' || event.target.value === '') return;
    _createExchangePoint();
  };

  return (
    <AppCard className='card-hover'>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AppGridContainer>
          {showCardDisabledAlert && (
            <Grid item xs={12} md={12} lg={12}>
              <Alert variant='filled' severity='error'>
                {messages['exchangepoint.cardDisabled']}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth sx={{m: 1}}>
              <TextField
                id='card_number'
                autoFocus
                label={messages['exchangepoint.cardNumber']}
                value={customer.cardNumber}
                onChange={(event) =>
                  setCustomer({...customer, cardNumber: event.target.value})
                }
                onKeyDown={handleSearchCustomer}
                inputRef={cardNumberInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth sx={{m: 1}}>
              <TextField
                id='firstname'
                label={messages['exchangepoint.firstName']}
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
                label={messages['exchangepoint.lastName']}
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
                label={messages['exchangepoint.phoneNumber']}
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
                label={messages['exchangepoint.email']}
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
                label={messages['exchangepoint.address']}
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
                id='total_point'
                label={messages['exchangepoint.totalPoint']}
                variant='filled'
                value={customer.totalPoints}
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
                label={messages['exchangepoint.exchangePoint']}
                value={points}
                onChange={(event) => setPoints(Number(event.target.value))}
                onKeyDown={handleClickExchangePoint}
                inputRef={pointsInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Button variant='outlined' color='error' onClick={_clearForm}>
                {messages['exchangepoint.clearForm']}
              </Button>
              <Button
                variant='contained'
                color='success'
                sx={{ml: 10}}
                onClick={_createExchangePoint}
                disabled={showCardDisabledAlert}
              >
                {messages['exchangepoint.exchange']}
              </Button>
            </Box>
          </Grid>
        </AppGridContainer>
      </AppAnimate>

      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        scroll={'paper'}
        maxWidth={'md'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          {messages['exchangepoint.successDialog.title']}
        </DialogTitle>
        <DialogContent dividers={true}>
          Total points after exchange: {successResult.totalPoints}
        </DialogContent>
      </Dialog>
      <AppInfoView />
    </AppCard>
  );
};

export default ExchangePointForm;
