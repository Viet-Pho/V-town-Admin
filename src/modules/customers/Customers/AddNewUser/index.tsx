import React, {useState} from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Button from '@mui/material/Button';
import AppDialog from '@crema/core/AppDialog';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import CustomerForm from '../CustomerForm';

interface AddNewCustomerProps {
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

const AddNewUser: React.FC<AddNewCustomerProps> = (props) => {
  const {isAddCustomerOpen, onCloseAddCustomer} = props;
  return (
    <AppDialog
      dividers
      maxWidth='md'
      // maxHeight='xl'
      open={isAddCustomerOpen}
      onClose={() => onCloseAddCustomer()}
      title={'Add New User'}
    >
      <CustomerForm
        onClose={onCloseAddCustomer}
        isAddCustomerOpen={isAddCustomerOpen}
        isCustomerInfoOpen={false}
        isEditCustomerOpen={false}
        customer={{
          cardId: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          age: '',
          birthday: '',
          gender: '',
          // point: 0,
        }}
      />
    </AppDialog>
  );
};

export default AddNewUser;
