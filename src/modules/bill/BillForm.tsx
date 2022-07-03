// @ts-nocheck
import {useIntl} from 'react-intl';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Fonts} from '../../shared/constants/AppEnums';
// import { renderToString } from 'react-dom/server'
import {PrintableBill} from './ToPrintBill';
import {TAX_RATE, EXCHANGE_POINT_RATE} from '../../shared/constants/Billing';
import {ImQrcode} from 'react-icons/im';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../redux/actions';
import {useRouter} from 'next/router';
import TableHeading from './TableHeading';
import {Item} from '../../types/models/Items';
import ItemHeader from './ItemsHeader';
// import {searchItems} from '../../../models/item';
import {fetchItems} from '../../models/items';
import {getOrderedItems} from '../../models/order';
import {createBill} from '../../models/bill';
// MUI

import {Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import {alpha, Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import ExchangePointDialog from '../dashboards/ExchangePoint/ExchangePointDialog';

// Crema

import AppInfoView from '../../@crema/core/AppInfoView';
import AppCard from '../../@crema/core/AppCard';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {AppGridContainer} from '../../@crema';
import AppAnimate from '../../@crema/core/AppAnimate';
import AppTableContainer from '@crema/core/AppTableContainer';
import QRReader from './qrcode/QRReader';
import ReactToPrint from 'react-to-print';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  padding: 5,
  '&:first-of-type': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(2)': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(3)': {
    // paddingLeft: 30,
  },
  '&:nth-of-type(4)': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(5)': {
    // paddingRight: 30,
  },
  '&:last-of-type': {
    // paddingLeft: 15,
    // paddingRight: 15,
  },
}));
const TableRowHover = styled(TableRow)(({theme}) => {
  return {
    '&:hover': {
      '& .conActionHoverRoot': {
        opacity: 1,
        visibility: 'visible',
        right: 0,
      },
      '& .conActionHoverHideRoot': {
        opacity: 0,
        visibility: 'hidden',
      },
    },
  };
});

const BillForm: React.FC<ItemGridProps> = (props) => {
  const {orderedItems, hourPriceItems, customer, room, orderId} = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const componentRef = useRef();

  const {messages} = useIntl();
  const [items, setItems] = useState(orderedItems || []);
  const [hourItems, setHourItems] = useState(hourPriceItems || []);

  const [openExchangeDialog, setOpenExchangeDialog] = React.useState(false);
  const sxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    fontWeight: Fonts.MEDIUM,
  };

  const getTax = () => {
    return round2Digits(total * TAX_RATE);
  };

  const round2Digits = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  };

  const createNewBill = async () => {
    dispatch(fetchStart());
    try {
      const newBill = {
        orderId,
        customerId: null,
        tax: getTax(),
        tip,
        totalPrice: calculateTotalPrice(),
        roomId: room.id,
        discountPoint,
      };
      await createBill(newBill);
      dispatch(fetchSuccess());
      dispatch(showMessage('Create bill successful.'));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const backToRoomsPage = () => {
    // router.push('/karaoke/rooms');
    window.location.href = '/karaoke/rooms';
  };

  const calculateTotalPrice = () => {
    const floatDiscountPoint = !!discountPoint ? parseFloat(discountPoint) : 0;
    const floatTip = !!tip ? parseFloat(tip) : 0;
    return round2Digits(
      total + getTax() - floatDiscountPoint + floatTip - discount,
    );
  };

  const calculateSumOrderedItems = () => {
    let sum = 0;
    [...orderedItems, ...hourPriceItems].forEach((element: any) => {
      return (sum += !element.isRoomBill
        ? element.price * element.quantity
        : element.totalPrice);
    });
    setTotal(round2Digits(sum));
  };

  const [total, setTotal] = useState(0);
  const [discountPoint, setDiscountPoint] = useState(0);
  const [tip, setTip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isScanQRCode, setScanQRCode] = useState(false);
  const [points, setPoint] = useState(-1);
  const [customerId, setCustomerId] = useState(null);

  const closeScanQRCode = () => {
    setScanQRCode(false);
  };

  const setExPoints = ({totalPoints, id}) => {
    setPoint(totalPoints);
    setCustomerId(id);
  };

  useEffect(() => {
    // fetchOrderedItems();
    setItems(orderedItems);
    setHourItems(hourPriceItems);
    calculateSumOrderedItems();
  }, [orderedItems, hourPriceItems]);

  return (
    <>
      <AppGridContainer width={800}>
        <Grid sx={12} item xs={12} md={12}>
          <AppCard contentStyle={{px: 0}}>
            <AppTableContainer>
              <Table stickyHeader className='table'>
                <TableHead>
                  <TableHeading />
                </TableHead>
                <TableBody>
                  {(items.length || hourItems.length) &&
                    [...items, ...hourItems].map((data: any) => (
                      <TableRowHover key={data?.itemId} className='item-hover'>
                        <StyledTableCell>
                          <Box display='flex'>
                            <Box>
                              {data?.name ? (
                                <Box fontSize={14} fontWeight={Fonts.MEDIUM}>
                                  {data?.name}
                                </Box>
                              ) : (
                                <Box></Box>
                              )}
                              <Box color='text.secondary' fontSize={14}>
                                {data.quantitive}
                              </Box>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                          style={{fontWeight: Fonts.MEDIUM}}
                        >
                          ${data.price}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <Box
                            sx={{
                              mw: 5,
                            }}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                          >
                            {data.quantity}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align='center'
                          style={{fontWeight: Fonts.MEDIUM}}
                        >
                          {data.isRoomBill ? (
                            data.totalPrice
                          ) : data?.quantity ? (
                            <>${data.price * data?.quantity}</>
                          ) : (
                            <>$0</>
                          )}
                        </StyledTableCell>
                      </TableRowHover>
                    ))}
                </TableBody>
              </Table>
            </AppTableContainer>
          </AppCard>
          <br></br>
          <AppCard
            contentStyle={{px: 0}}
            title={
              <Box fontSize={16} fontWeight={Fonts.BOLD}>
                {`${messages['bill.billSummary']}`}
              </Box>
            }
            footer={
              <Box
                sx={{
                  mt: 4,
                  width: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setOpenExchangeDialog(true)}
                  disabled={isScanQRCode || !customerId}
                >
                  Exchange Points
                </Button>
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant='contained'
                        disabled={isScanQRCode}
                        color='secondary'
                      >
                        Create bill and Print
                      </Button>
                    )}
                    onBeforeGetContent={createNewBill}
                    onAfterPrint={backToRoomsPage}
                    content={() => componentRef.current}
                  />
                  <div style={{display: 'none'}}>
                    <PrintableBill
                      style={{display: 'none'}}
                      ref={componentRef}
                      customer={customer}
                      orderedItems={orderedItems}
                      hourPriceItems={hourPriceItems}
                      room={room}
                      grandTotal={total}
                      tip={tip}
                      discountPoint={discountPoint}
                      discount={discount}
                      tax={getTax()}
                      finalTotal={calculateTotalPrice()}
                    />
                  </div>
                </div>
              </Box>
            }
          >
            <AppAnimate animation='transition.slideUpIn' delay={200}>
              <Box
                sx={{
                  p: 5,
                }}
              >
                <Box
                  sx={{
                    ...sxStyle,
                    mt: 2,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Grand Total: </Box>
                  <Box>${total}</Box>
                </Box>
                <Box
                  sx={{
                    ...sxStyle,
                    mb: 4,
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Discount: </Box>
                  <TextField
                    style={{minWidth: 80, maxWidth: 100}}
                    value={discount}
                    type='number'
                    onChange={(event) => setDiscount(event.target.value)}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    ...sxStyle,
                    mb: 4,
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Tip: </Box>
                  <TextField
                    style={{minWidth: 80, maxWidth: 100}}
                    value={tip}
                    type='number'
                    onChange={(event) => setTip(event.target.value)}
                  ></TextField>
                </Box>
                <Box
                  sx={{
                    ...sxStyle,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Estimated Tax: </Box>
                  <Box>${getTax()}</Box>
                </Box>
                <Box
                  sx={{
                    ...sxStyle,
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      ...sxStyle,
                      color: 'text.secondary',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{color: 'text.secondary', mr: 5}}>
                      Exchangeable points:
                    </Box>
                    <Box
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {points >= 0 ? (
                        points
                      ) : (
                        <>
                          <ImQrcode onClick={() => setScanQRCode(true)} />
                          <span style={{marginInline: 5}}>
                            Click icon to scan
                          </span>
                        </>
                      )}
                    </Box>
                  </Box>
                  <TextField
                    style={{width: 100}}
                    value={discountPoint}
                    disabled={points <= 0}
                    InputProps={{inputProps: {min: 0, max: points}}}
                    type='number'
                    onChange={(event) => setDiscountPoint(event.target.value)}
                  ></TextField>
                </Box>
                <Divider />
                <Box
                  sx={{
                    ...sxStyle,
                    my: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Billing Total: </Box>
                  <Box>${calculateTotalPrice()}</Box>
                </Box>
              </Box>
            </AppAnimate>
          </AppCard>
        </Grid>
        <ExchangePointDialog
          open={openExchangeDialog}
          onClose={() => setOpenExchangeDialog(false)}
          initPoint={calculateTotalPrice()}
          customerId={customerId}
        />
        <AppInfoView />
      </AppGridContainer>
      {isScanQRCode && (
        <QRReader closeScanQRCode={closeScanQRCode} setPoint={setExPoints} />
      )}
    </>
  );
};

export default BillForm;
