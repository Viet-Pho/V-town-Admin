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
import {searchCustomers, getCustomerDetail} from '../../../../models/customer';
import Alert from '@mui/material/Alert';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../../redux/actions';
import {useIntl} from 'react-intl';
import {useAuthUser} from '../../../../@crema/utility/AuthHooks';

import {alpha, Select} from '@mui/material';

import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';

interface ExchangePointProps {
  customer: Customer;
  initPoint: Number
}
const HeaderWrapper = styled('div')(({theme}) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
});
const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

const AvatarViewWrapper = styled('div')(({theme}) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
  };
});

const ExchangePointForm: React.FC<ExchangePointProps> = (props) => {
  const dispatch = useDispatch();
  
  const [customer, setCustomer] = useState({...props.customer});
  const [points, setPoints] = useState(props?.initPoint || 0);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [successResult, setSuccessResult] = useState({totalPoints: 0});
  const [showCardDisabledAlert, setShowCardDisabledAlert] = useState(false);

  const cardIdInput = useRef<HTMLInputElement>(null);
  const pointsInput = useRef<HTMLInputElement>(null);
  const {
    user: {id: userId},
  } = useAuthUser();

  useEffect(() => {    
    if (customer.id) {
      getDetailCustomer();
    }
  }, [customer.id]);

  const getDetailCustomer = async () => {
    const customerInfo = await getCustomerDetail(customer.id)
    setCustomer(customerInfo);
    pointsInput.current?.focus();
  }

  const {messages} = useIntl();

  const handleSearchCustomer = async (event) => {
    if (event.key !== 'Enter' || event.target.value === '') return;
    dispatch(fetchStart());
    setShowCardDisabledAlert(false);
    setCustomer({...props.customer});
    const {customers} = await searchCustomers({cardId: event.target.value});
    const [customer] = customers || [];

    if (!!customer) {
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
    cardIdInput.current?.focus();
  };

  const handleClickExchangePoint = (event) => {
    if (event.key !== 'Enter' || event.target.value === '') return;
    _createExchangePoint();
  };

  return (
    <AppCard className='card-hover'>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <HeaderWrapper>
          <label htmlFor='icon-button-file'>
            <AvatarViewWrapper>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                }}
                src={customer.avatar}
                alt='user Image'
              />
            </AvatarViewWrapper>
          </label>
        </HeaderWrapper>
        <StyledDivider />
        <AppGridContainer>
          <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth sx={{m: 1}}>
              <TextField
                id='card_number'
                autoFocus
                label={messages['exchangepoint.cardId'] as string}
                value={customer.cardId}
                onChange={(event) =>
                  setCustomer({...customer, cardId: event.target.value})
                }
                onKeyDown={handleSearchCustomer}
                inputRef={cardIdInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth sx={{m: 1}}>
              <TextField
                id='firstname'
                label={messages['exchangepoint.firstName'] as string}
                // label={messages['exchangepoint.firstName'] as string}
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
                label={messages['exchangepoint.lastName'] as string}
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
                label={messages['exchangepoint.phoneNumber'] as string}
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
                label={messages['exchangepoint.email'] as string}
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
                label={messages['exchangepoint.address'] as string}
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
                label={messages['exchangepoint.totalPoint'] as string}
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
                label={messages['exchangepoint.exchangePoint'] as string}
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
                {messages['exchangepoint.clearForm'] as string}
              </Button>
              <Button
                variant='contained'
                color='success'
                sx={{ml: 10}}
                onClick={_createExchangePoint}
                disabled={showCardDisabledAlert}
              >
                {messages['exchangepoint.exchange'] as string}
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
          {messages['exchangepoint.successDialog.title'] as string}
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
