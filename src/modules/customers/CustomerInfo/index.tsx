import React, {useState} from 'react';
import AppDialog from '../../../@crema/core/AppDialog';
import {useEffect} from 'react';
import CustomerForm from '../CustomerForm';
// import {getCustomerInfoById} from '../../../../models/customers';
import {Customers} from '../../../types/models/dashboards/Customers';

interface CustomerInfoProps {
  customer: Customers;
  isCustomerInfoOpen: boolean;
  isEditCustomerOpen: boolean;
  onOpenCustomerInfo?: () => void;
  onCloseCustomerInfo: () => void;
  selectedDate?: string | null;
  pid: number;
  isAddCustomerOpen: boolean;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  isCustomerInfoOpen,
  onCloseCustomerInfo,
  customer,
}) => {
  const [customerData, setCustomerData] = useState({...customer});

  // useEffect(() => {
  //   async function fetchCustomerInfo() {
  //     const customer = await getCustomerInfoById(customerData.id);
  //     setCustomerData(customer);
  //   }
  //   fetchCustomerInfo();
  // }, []);

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isCustomerInfoOpen}
      onClose={() => onCloseCustomerInfo()}
      title={'Customer Info'}
    >
      <CustomerForm
        isAddCustomerPageOpen={false}
        onCloseEditCustomer={onCloseCustomerInfo}
        onClose={onCloseCustomerInfo}
        isCustomerInfoOpen={isCustomerInfoOpen}
        isEditCustomerOpen={false}
        isAddCustomerOpen={false}
        customer={{
          cardId: customerData?.cardId,
          phoneNumber: customerData?.phoneNumber,
          firstName: customerData?.firstName,
          lastName: customerData?.lastName,
          email: customerData?.email,
          address: customerData?.address,
          age: customerData?.age,
          birthday: customerData?.birthday,
          gender: customerData?.gender,
          avatar: customerData?.avatar,
        }}
      />
    </AppDialog>
  );
};

export default CustomerInfo;
