import React, {useState} from 'react';
import AppDialog from '../../../@crema/core/AppDialog';
import {useEffect} from 'react';
import CustomerForm from '../CustomerForm';
// import {getCustomerInfoById} from '../../../../models/customers';
import {Customers} from '../../../types/models/dashboards/Customers';

interface EditCustomerProps {
  customer: Customers;
  isEditCustomerOpen: boolean;
  onOpenEditCustomer?: () => void;
  onCloseEditCustomer: () => void;
  selectedDate?: string | null;
  isCustomerInfoOpen: boolean;
  isAddCustomerOpen: boolean;
}

const EditCustomer: React.FC<EditCustomerProps> = (props) => {
  const {isEditCustomerOpen, onCloseEditCustomer, customer} = props;

  const [customerData, setCustomerData] = useState({...customer});

  const [refreshData, setRefreshData] = useState(false);
  // useEffect(() => {
  //   async function fetchCustomerInfo() {
  //     try {
  //       const customer = await getCustomerInfoById(pid);
  //       if (customer) {
  //         setCustomerData(customer);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchCustomerInfo();
  // }, [refreshData]);

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isEditCustomerOpen}
      onClose={() => onCloseEditCustomer()}
      title={'Edit Customer'}
    >
      <CustomerForm
        isAddCustomerPageOpen={false}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
        onClose={onCloseEditCustomer}
        isEditCustomerOpen={isEditCustomerOpen}
        onCloseEditCustomer={onCloseEditCustomer}
        isCustomerInfoOpen={false}
        isAddCustomerOpen={false}
        customer={{
          id: customerData?.id,
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

export default EditCustomer;
