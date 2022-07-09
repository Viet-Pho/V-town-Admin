import FormControl from '@mui/material/FormControl';
import {alpha} from '@mui/material';
import AppInfoView from '@crema/core/AppInfoView';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import AppGridContainer from '@crema/core/AppGridContainer';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import AppCard from '@crema/core/AppCard';
import {Bill} from 'types/models/dashboards/Bill';
import {fetchError, fetchStart, fetchSuccess, showMessage} from 'redux/actions';
import {updateBill} from 'models/bill';
import {objectBillingOptions, statusOptions} from 'constants/bill';

interface BillProps {
  bill: Bill;
  onClose: () => void;
  onCloseEditBill: () => void;
  fetchBill: () => void;
  refreshData?: any;
  setRefreshData?: any;
  isBillInfoOpen: boolean;
  isEditBillOpen: boolean;
  isAddBillOpen: boolean;
  isAddBillPageOpen: boolean;
}

const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

const BillForm: React.FC<BillProps> = (props) => {
  const {
    bill,
    onClose,
    refreshData,
    setRefreshData,
    isBillInfoOpen,
    isAddBillOpen,
    isAddBillPageOpen,
    onCloseEditBill,
    isEditBillOpen,
    fetchBill,
    ...other
  } = props;
  const dispatch = useDispatch();
  const [billData, setBillData] = React.useState(bill);

  const editBill = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await updateBill(billData.id, billData);
      if (response) {
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
      }
      dispatch(fetchSuccess());
      dispatch(
        showMessage(`Successfully Edited Bill ${billData.id} Information.`),
      );
      fetchBill();
      onCloseEditBill();
    } catch (error: any) {
      if (refreshData !== null && setRefreshData !== null) {
        if (refreshData === true) {
          setRefreshData(false);
        }
        if (refreshData === false) {
          setRefreshData(true);
        }
      }
      dispatch(fetchError(`${error?.response?.data?.message}`));
    }
  };

  const [fieldError, setFieldError] = useState(true);

  const handleChangeBill = (e) => {
    setFieldError(false);
    setBillData((prevState) => {
      let tempObject = {};
      tempObject[e.target.name] = e.target.value;
      return {...prevState, ...tempObject};
    });
  };

  return (
    <AppCard className='card-hover'>
      <AppGridContainer spacing={5}>
        <Grid item xs={12} md={6}>
          <FormControl
            variant='outlined'
            sx={{
              width: '100%',
            }}
          ></FormControl>
        </Grid>
      </AppGridContainer>

      <AppGridContainer>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='order_id'
              label='Order Id'
              value={billData?.orderId}
              disabled
              required
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Grid item xs={3} md={4} lg={4}>
            <label style={{paddingLeft: 4}}>Billing Object:</label>
          </Grid>
          <Grid item xs={9} md={8} lg={8}>
            <RadioGroup
              // ref={radioGroupRef}
              aria-label='billingObject'
              name='billingObject'
              style={{display: 'flex', flexDirection: 'row'}}
              value={billData.billingObject}
              onChange={handleChangeBill}
            >
              {objectBillingOptions.map(({value, label}) => (
                <FormControlLabel
                  value={value}
                  key={value}
                  control={<Radio />}
                  label={label}
                  disabled={isBillInfoOpen}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='customer_id'
              label='Customer Id'
              value={billData?.customerId}
              disabled
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='customer_name'
              label='Customer Name'
              value={billData?.customerName}
              disabled
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='staff_id'
              label='Staff Id'
              value={billData?.staffId}
              disabled
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='staff_name'
              label='Staff Name'
              value={billData?.staffName}
              disabled
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!billData.serviceTip && !fieldError}
              id='tip'
              type='number'
              label='Tip'
              name='serviceTip'
              value={billData?.serviceTip}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
            />
            {!billData?.serviceTip && !fieldError ? (
              <FormHelperText error> Tip Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!billData.tax && !fieldError}
              id='tax'
              label='Tax'
              type='number'
              name='tax'
              value={billData?.tax}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
              required
            />
            {!billData?.tax && !fieldError ? (
              <FormHelperText error>Tax Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!billData?.discount && !fieldError}
              id='discount'
              type='number'
              label='Discount'
              name='discount'
              value={billData?.discount}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
            />
            {!billData?.discount && !fieldError ? (
              <FormHelperText error>Discount Can Not Be Blank</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!billData?.pointEarned && !fieldError}
              id='point-earned'
              type='number'
              label='Point Earned'
              name='pointEarned'
              value={billData?.pointEarned}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
            />
            {!billData?.pointEarned && !fieldError ? (
              <FormHelperText error>
                {' '}
                Point Earned Can Not Be Blank
              </FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              error={!billData?.pointUsed && !fieldError}
              id='point-used'
              type='number'
              name='pointUsed'
              label='Point Used'
              value={billData?.pointUsed}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
            />
            {!billData?.pointUsed && !fieldError ? (
              <FormHelperText error>
                {' '}
                Point Used Can Not Be Blank
              </FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{display: 'flex', alignItems: 'center'}}
        >
          <Grid item xs={3} md={4} lg={4}>
            <label style={{paddingLeft: 4}}>Status:</label>
          </Grid>
          <Grid item xs={9} md={8} lg={8}>
            <RadioGroup
              // ref={radioGroupRef}
              aria-label='status'
              name='status'
              style={{display: 'flex', flexDirection: 'row'}}
              value={billData.status}
              onChange={handleChangeBill}
            >
              {statusOptions.map(({value, label}) => (
                <FormControlLabel
                  value={value}
                  key={value}
                  control={<Radio />}
                  label={label}
                  disabled={isBillInfoOpen}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl fullWidth sx={{m: 1}}>
            <TextField
              id='note'
              label='Note'
              name='note'
              value={billData?.note}
              onChange={handleChangeBill}
              disabled={isBillInfoOpen}
            />
          </FormControl>
        </Grid>
        {isEditBillOpen && (
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              textAlign: 'right',
            }}
          >
            <StyledDivider />
            <Button
              sx={{width: 1 / 7}}
              color='primary'
              variant='outlined'
              onClick={() => editBill()}
            >
              Save
            </Button>
          </Grid>
        )}
      </AppGridContainer>
      <AppInfoView />
    </AppCard>
  );
};

export default BillForm;
