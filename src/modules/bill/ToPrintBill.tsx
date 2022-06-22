//@ts-nocheck
import React from 'react';
import {styled} from '@mui/material/styles';
import {BILLING_INFO, TAX_RATE} from '../../shared/constants/Billing';
import {useAuthUser} from '../../@crema/utility/AuthHooks';
import {format} from 'date-fns';
import {round2Digits} from '../../../src/util/number';

const StyledDiv = styled('div')(({theme}) => ({
  width: '315px',
  fontSize: '12px',
  'table,td': {
    width: '100%',
    border: 'solid 2px black',
    textAlign: 'center',
    borderCollapse: 'collapse',
  },
  'tr.light td': {
    border: 'dashed 1px black',
  },
  td: {
    padding: '0.5em',
  },
  '[colspan="4"][rowspan="2"]': {
    height: '6em',
  },
  '.info': {
    textAlign: 'center',
    margin: '0 5px',
    '.shopname': {
      marginTop: '20px',
    },
    '.datestafftable': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  '.itemtitle': {
    marginTop: '20px',
    textAlign: 'center',
  },
  '.summary': {
    margin: '0 5px',
  },
  '.summary .item': {
    display: 'flex',
    justifyContent: 'space-between',
    '.value.-total': {
      fontSize: '20px',
      fontWeight: '700',
    },
  },
  '.footer': {
    textAlign: 'center',
    marginTop: '40px',
  },
}));

export const PrintableBill = React.forwardRef((props, ref) => {
  const {
    orderedItems,
    room,
    hourPriceItems,
    grandTotal,
    tip,
    discountPoint,
    tax,
    finalTotal,
  } = props;
  const {user: staff} = useAuthUser();

  return (
    <StyledDiv ref={ref}>
      <div className='info'>
        <h1 className='shopname'>{BILLING_INFO.shopName}</h1>
        <p>{BILLING_INFO.address}</p>
        <p>Phone number: {BILLING_INFO.phoneNumber}</p>
        <h1>Bill</h1>
        <p>Billing number: {}</p>
        <p className='datestafftable'>
          <span>Date: {format(new Date(), 'yyyy-MM-dd')}</span>
          <span>Staff: {staff.username}</span>
        </p>
        <p className='datestafftable'>Room/Table: {room.name}</p>
      </div>
      <table>
        <tr>
          <td>Time</td>
          <td>
            Price
            <br />
            (per hour)
          </td>
          <td>No of hours</td>
          <td>Total Price</td>
        </tr>
        {hourPriceItems.map((hourPrice) => {
          return (
            <tr>
              <td>{hourPrice.name}</td>
              <td>{hourPrice.price}</td>
              <td>{hourPrice.quantity}</td>
              <td>{round2Digits(hourPrice.totalPrice)}</td>
            </tr>
          );
        })}
        {/* <tr className='light'>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr> */}
      </table>
      <h1 className='itemtitle'>Items info</h1>
      <hr />
      <table>
        <tr>
          <td>Item</td>
          <td>Quantity</td>
          <td>Price</td>
          <td>Quantitive</td>
          <td>Total</td>
        </tr>
        {orderedItems.map((item) => {
          return (
            <tr className='light'>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantitive}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          );
        })}
        {/* <tr>
          <td colSpan='4'>Total</td>
          <td></td>
        </tr> */}
      </table>
      <div className='summary'>
        <div className='item'>
          <span className='label'>Grand total:</span>
          <span className='value'>${grandTotal}</span>
        </div>
        <div className='item'>
          <span className='label'>Discount:</span>
          <span className='value'>$0</span>
        </div>
        <div className='item'>
          <span className='label'>Tip:</span>
          <span className='value'>${tip}</span>
        </div>
        <div className='item'>
          <span className='label'>Tax({TAX_RATE * 100}%):</span>
          <span className='value'>${tax}</span>
        </div>
        <div className='item'>
          <span className='label'>Exchanged points:</span>
          <span className='value'>-{discountPoint}</span>
        </div>
        <div className='item'>
          <span className='label'>Total:</span>
          <span className='value -total'>${finalTotal}</span>
        </div>
      </div>
      <div className='footer'>Thank you for using our service!</div>
    </StyledDiv>
  );
});
