import React from 'react';
import AppConfirmDialog from '../../../../@crema/core/AppConfirmDialog';

interface AddNewCustomerProps {
  isConfirmCalculateTime: boolean;
  onConfirmCalculateTime: () => void;
  onCloseDialog: () => void;
}

const AddNewCustomer: React.FC<AddNewCustomerProps> = (props) => {
  const {isConfirmCalculateTime, onConfirmCalculateTime, onCloseDialog} = props;

  return (
    <AppConfirmDialog
      title="Are you sure you want to charge the hourly rate for the selected Room/Table?"
      open={isConfirmCalculateTime}
      onDeny={() => onCloseDialog()}
      onConfirm={() => onConfirmCalculateTime()}
      dialogTitle='CONFIRM NOTICE'
    />
  );
};

export default AddNewCustomer;
