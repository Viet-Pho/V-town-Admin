import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BillForm from './BillForm';
import {useIntl} from 'react-intl';

export default function BillDialog(props) {
  // eslint-disable-next-line react/prop-types
  const {open, onClose, orderedItems, hourPriceItems, customer, room, orderId} = props;
  const {messages} = useIntl();

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={'paper'}
        maxWidth={'md'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          {messages['bill.dialogTitle'] as string}
        </DialogTitle>
        <DialogContent dividers={true}>
          <BillForm
            orderedItems={orderedItems}
            hourPriceItems={hourPriceItems}
            customer={customer}
            room={room}
            orderId={orderId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
