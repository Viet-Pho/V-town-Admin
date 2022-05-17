import React, {useState} from 'react';
import AppDialog from '../../../../@crema/core/AppDialog';
import CustomerForm from '../CustomerForm';

interface AddNewCustomerProps {
  oncloseEditCustomer: () => void;
  isAddCustomerOpen: boolean;
  onOpenAddCustomer?: () => void;
  onCloseAddCustomer: () => void;
  isCustomerInfoOpen: boolean;
  isEditCustomerOpen: boolean;
}

const AddNewCustomer: React.FC<AddNewCustomerProps> = (props) => {
  const {isAddCustomerOpen, onCloseAddCustomer, oncloseEditCustomer} = props;

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isAddCustomerOpen}
      onClose={() => onCloseAddCustomer()}
      title={'Add New User'}
    >
      <CustomerForm
        onCloseEditCustomer={oncloseEditCustomer}
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
    </AppDialog>
  );
};

export default AddNewCustomer;
