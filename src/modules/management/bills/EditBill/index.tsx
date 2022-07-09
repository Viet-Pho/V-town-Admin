import React, {useState} from 'react';
import AppDialog from '@crema/core/AppDialog';
import BillForm from '../BillForm';
import {Bill} from 'types/models/dashboards/Bill';

interface EditBillProps {
  bill: Bill;
  isEditBillOpen: boolean;
  onOpenEditBill?: () => void;
  onCloseEditBill: () => void;
  selectedDate?: string | null;
  isBillInfoOpen: boolean;
  fetchBill: () => void;
  isAddBillOpen: boolean;
}

const EditBill: React.FC<EditBillProps> = (props) => {
  const {isEditBillOpen, onCloseEditBill, bill, fetchBill} = props;

  const [billData, setBillData] = useState({...bill});

  const [refreshData, setRefreshData] = useState(false);
  // useEffect(() => {
  //   async function fetchCustomerInfo() {
  //     try {
  //       const customer = await getCustomerInfoById(pid);
  //       if (customer) {
  //         setBillData(customer);
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
      open={isEditBillOpen}
      onClose={() => onCloseEditBill()}
      title={'Edit Customer'}
    >
      <BillForm
        isAddBillPageOpen={false}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
        onClose={onCloseEditBill}
        isEditBillOpen={isEditBillOpen}
        onCloseEditBill={onCloseEditBill}
        isBillInfoOpen={false}
        isAddBillOpen={false}
        bill={billData}
        fetchBill={fetchBill}
      />
    </AppDialog>
  );
};

export default EditBill;
