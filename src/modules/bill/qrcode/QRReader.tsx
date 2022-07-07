import React, {useRef, useState} from 'react';
import ViewFinder from './QRViewFinder';
import {QrReader} from 'react-qr-reader';
import Button from '@mui/material/Button';
import {searchCustomers} from 'models/customers';

const QRReader = (props) => {
  const {closeScanQRCode, setPoint, style} = props;
  const qrCodeRef = useRef<HTMLDivElement>(null!);
  const [requestable, setRequestable] = useState(true);

  const closeScan = () => {
    navigator['getUserMedia'](
      {audio: false, video: true},
      (stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        closeScanQRCode();
      },
      (error) => {
        console.log('getUserMedia() error', error);
      },
    );
  };

  const styleContainerQR = {
    minWidth: '400px',
    width: '80%',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    ...style,
  };
  const getExchangeablePointsUser = async (cardId) => {
    const {customers} = await searchCustomers({cardId});
    const [customer] = customers;
    const {totalPoints, id} = customer;
    setPoint({totalPoints, id});
    closeScanQRCode();
  };

  return (
    <div style={styleContainerQR}>
      <QrReader
        scanDelay={200}
        onResult={async (result: any) => {
          if (result) {
            const {cardId} = JSON.parse(result);
            if (cardId && requestable) {
              setRequestable(false);
              await getExchangeablePointsUser(cardId);
            }
          }
        }}
        constraints={{facingMode: 'environment'}}
        ViewFinder={ViewFinder}
      />
      <Button
        onClick={closeScan}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1001,
          backgroundColor: '#333',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default QRReader;
