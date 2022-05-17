import React, {useState} from 'react';
import AppDialog from '../../../../@crema/core/AppDialog';
import {useEffect} from 'react';
import CustomerForm from '../CustomerForm';
import {getCustomerInfoById} from '../../../../models/customers';
import {Customers} from '../../../../types/models/dashboards/Customers';

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
}) => {
  const [customerData, setCustomerData] = useState({
    cardId: 0,
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    age: 1,
    birthday: '',
    gender: '',
    avatar: '',
    // point: 0,
  });
  const pid = 29;
  useEffect(() => {
    async function fetchCustomerInfo() {
      const customer = await getCustomerInfoById(pid);
      setCustomerData(customer);
    }
    console.log('customerData', customerData);
    fetchCustomerInfo();
  }, []);

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isCustomerInfoOpen}
      onClose={() => onCloseCustomerInfo()}
      title={'Customer Info'}
    >
      <CustomerForm
        onCloseEditCustomer={onCloseCustomerInfo}
        onClose={onCloseCustomerInfo}
        isCustomerInfoOpen={isCustomerInfoOpen}
        isEditCustomerOpen={false}
        isAddCustomerOpen={false}
        customer={{
          cardId: customerData[0]?.cardId,
          phoneNumber: customerData[0]?.phoneNumber,
          firstName: customerData[0]?.firstName,
          lastName: customerData[0]?.lastName,
          email: customerData[0]?.email,
          address: customerData[0]?.address,
          age: customerData[0]?.age,
          birthday: customerData[0]?.birthday,
          gender: customerData[0]?.gender,
          avatar: customerData[0]?.avatar,
        }}
      />
    </AppDialog>
  );
};

export default CustomerInfo;
