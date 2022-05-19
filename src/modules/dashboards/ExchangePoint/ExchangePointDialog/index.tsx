import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExchangePointForm from '../ExchangePointForm';
import {useIntl} from 'react-intl';

export default function ExchangePointDialog(props) {
  // eslint-disable-next-line react/prop-types
  const {open, onClose} = props;
  const {messages} = useIntl();

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
          {messages['sidebar.app.dashboard.exchangePoint'] as string}
        </DialogTitle>
        <DialogContent dividers={true}>
          <ExchangePointForm
            customer={{
              id: 1,
              cardNumber: '',
              phoneNumber: '',
              firstName: '',
              lastName: '',
              email: '',
              address: '',
              totalPoints: 0,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
