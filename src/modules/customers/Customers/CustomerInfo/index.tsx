import React, {useState} from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Button from '@mui/material/Button';
import AppDialog from '@crema/core/AppDialog';
import Divider from '@mui/material/Divider';
import {styled} from '@mui/material/styles';
import {useEffect} from 'react';
import CustomerForm from '../CustomerForm';
import {getCustomerInfoById} from '../../../../models/customers';
import {Customers} from '../../../../types/models/dashboards/Customers';
import avatars from 'pages/mui/data-display/avatars';

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

const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

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
    age: 0,
    birthday: '',
    gender: '',
    // point: 0,
  });
  const pid = 1;
  useEffect(() => {
    async function fetchCustomerInfo() {
      const customer = await getCustomerInfoById(pid);
      setCustomerData(customer);
    }
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
      <StyledDivider />
    </AppDialog>
  );
};

export default CustomerInfo;
