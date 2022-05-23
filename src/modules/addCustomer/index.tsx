// @ts-nocheck
import React from 'react';
import CustomerForm from 'modules/customers/CustomerForm';

const addCustomers: React.FC<AddCustomerProps> = () => {
  const isAddCustomerPageOpen = true;
  return (
    <>
      <CustomerForm
        isAddCustomerPageOpen={isAddCustomerPageOpen}
        isCustomerInfoOpen={false}
        isEditCustomerOpen={false}
        customer={{
          cardId: '0',
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
    </>
  );
};

export default addCustomers;
