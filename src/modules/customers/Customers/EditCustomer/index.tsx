import React, {useState} from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Alert from '@mui/material/Alert';
import {AlertTitle} from '@mui/material';
import Button from '@mui/material/Button';
import AppDialog from '@crema/core/AppDialog';
import {useEffect} from 'react';
import CustomerForm from '../CustomerForm';
import {getCustomerInfoById, editCustomer} from '../../../../models/customers';
import {Customers} from '../../../../types/models/dashboards/Customers';

interface EditCustomerProps {
  customer: Customers;
  isEditCustomerOpen: boolean;
  onOpenEditCustomer?: () => void;
  onCloseEditCustomer: () => void;
  selectedDate?: string | null;
  pid: number;
  isCustomerInfoOpen: boolean;
  isAddCustomerOpen: boolean;
}

const EditCustomer: React.FC<EditCustomerProps> = ({
  isEditCustomerOpen,
  onCloseEditCustomer,
  isCustomerInfoOpen,
}) => {
  const [customerData, setCustomerData] = useState({
    id: 0,
    cardId: 0,
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    age: 0,
    birthday: '',
    gender: '',
    avatar: '',
    // point: 0,
  });
  const [refreshData, setRefreshData] = useState(false);
  const pid = 1;
  useEffect(() => {
    async function fetchCustomerInfo() {
      try {
        const customer = await getCustomerInfoById(pid);
        if (customer) {
          setCustomerData(customer);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomerInfo();
  }, [refreshData]);

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isEditCustomerOpen}
      onClose={() => onCloseEditCustomer()}
      title={'Edit Customer'}
    >
      <CustomerForm
        refreshData={refreshData}
        setRefreshData={setRefreshData}
        onClose={onCloseEditCustomer}
        isEditCustomerOpen={isEditCustomerOpen}
        isCustomerInfoOpen={false}
        isAddCustomerOpen={false}
        customer={{
          id: pid,
          cardId: customerData[0]?.cardId,
          phoneNumber: customerData[0]?.phoneNumber,
          firstName: customerData[0]?.firstName,
          lastName: customerData[0]?.lastName,
          email: customerData[0]?.email,
          address: customerData[0]?.address,
          age: customerData[0]?.age,
          birthday: customerData[0]?.birthday,
          gender: customerData[0]?.gender,
        }}
      />
    </AppDialog>
  );
};

export default EditCustomer;
