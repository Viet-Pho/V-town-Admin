// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Hidden} from '@mui/material';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../redux/actions';
import {addNewCustomer} from '../../models/customers';
import CustomerForm from 'modules/customers/Customers/CustomerForm';

interface AddCustomerProps {
  oncloseEditCustomer: () => void;
  isAddCustomerOpen: boolean;
  onOpenAddCustomer?: () => void;
  onCloseAddCustomer: () => void;
  isCustomerInfoOpen: boolean;
  isEditCustomerOpen: boolean;
}
const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

const addCustomers: React.FC<AddCustomerProps> = (props) => {
  const {isAddCustomerOpen, onCloseAddCustomer} = props;

  const handleAddCustomer = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await addNewCustomer(customerData);
      if (response && validEmail) {
        if (refreshData !== null && setRefreshData !== null) {
          if (refreshData === true) {
            setRefreshData(false);
          }
          if (refreshData === false) {
            setRefreshData(true);
          }
        }
        dispatch(fetchSuccess());
        dispatch(
          showMessage(`Successfully Added Customer ${customerData.firstName}.`),
        );
      }
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
  return (
    <>
      <CustomerForm
        onClose={onCloseAddCustomer}
        isAddCustomerOpen={isAddCustomerOpen}
        isCustomerInfoOpen={false}
        isEditCustomerOpen={false}
        customer={{
          cardId: 0,
          phoneNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          age: 1,
          birthday: '',
          gender: 2,
          avatar: '',
          // point: 0,
        }}
      />
      <Box>
        <StyledDivider />
        <Button
          sx={{width: 1 / 7}}
          color='primary'
          variant='outlined'
          onClick={() => handleAddCustomer()}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default addCustomers;
