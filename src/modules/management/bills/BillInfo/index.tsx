import React, {useState} from 'react';
import AppDialog from '@crema/core/AppDialog';
import BillForm from '../BillForm';
import {Bill} from 'types/models/dashboards/Bill';

interface BillInfoProps {
  bill: Bill;
  isBillInfoOpen: boolean;
  isEditBillOpen: boolean;
  onOpenBillInfo?: () => void;
  onCloseBillInfo: () => void;
  selectedDate?: string | null;
  pid: number;
  isAddBillOpen: boolean;
}

const BillInfo: React.FC<BillInfoProps> = ({
  isBillInfoOpen,
  onCloseBillInfo,
  bill,
}) => {
  const [billData, setBillData] = useState({...bill});

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
      open={isBillInfoOpen}
      onClose={() => onCloseBillInfo()}
      title={'Bill Info'}
    >
      <BillForm
        isAddBillPageOpen={false}
        onCloseEditBill={onCloseBillInfo}
        onClose={onCloseBillInfo}
        isBillInfoOpen={isBillInfoOpen}
        isEditBillOpen={false}
        isAddBillOpen={false}
        bill={billData}
        fetchBill={() => ({})}
      />
    </AppDialog>
  );
};

export default BillInfo;
