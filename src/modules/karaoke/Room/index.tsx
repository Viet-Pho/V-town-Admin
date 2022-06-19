// @ts-nocheck
import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Fonts} from '../../../shared/constants/AppEnums';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../redux/actions';
import {useRouter} from 'next/router';
import TableHeading from './TableHeading';
import {Item} from '../../../types/models/Items';
import ItemHeader from './ItemsHeader';
// import {searchItems} from '../../../../models/item';
import {fetchItems} from '../../../models/items';
import {getRoom} from '../../../models/room';
import {
  addItem,
  updateItem,
  deleteItem,
  getOrderedItems,
  calculateBillRoom,
} from '../../../models/order';
// MUI

import {Grid} from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';
import {alpha, Box} from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// Crema

import AppInfoView from '../../../@crema/core/AppInfoView';
import AppCard from '../../../@crema/core/AppCard';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {AppGridContainer} from '../../../@crema';
import AppAnimate from '../../../@crema/core/AppAnimate';
import AppTableContainer from '@crema/core/AppTableContainer';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';

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

interface ItemGridProps {
  items: Item[];
  loading: boolean;
  renderRow: () => JSX.Element;
  data: Item;
}

const Rooms: React.FC<ItemGridProps> = (props) => {
  const {loading, renderRow} = props;

  const dispatch = useDispatch();
  const router = useRouter();

  // console.log('router', router.query);

  const {messages} = useIntl();

  const {theme} = useThemeContext();

  const [items, setItems] = useState([]);

  const [menu, setMenu] = useState([]);
  const roomId = router.query.pid;
  const [room, setRoom] = useState({});

  const styleRoomPrice = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '5px',
    fontWeight: 300,
    fontSize: '12px',
  };

  const fetchItem = async () => {
    dispatch(fetchStart());
    try {
      const menu = await fetchItems();
      setMenu(menu);

      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const fetchOrderedItems = async () => {
    dispatch(fetchStart());
    try {
      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);
      let sum = 0;

      items.forEach((element: any) => {
        return (sum += element.price);
      });
      setTotal(sum);
      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const fetchRoomInfo = async () => {
    dispatch(fetchStart());
    try {
      const room = await getRoom(roomId);
      setRoom(room);
      dispatch(fetchSuccess());
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchItem();
    fetchOrderedItems();
    fetchRoomInfo();
  }, []);

  const onAddToBill = async (item) => {
    dispatch(fetchStart());
    try {
      const itemId = item.id;

      const addNewItem = await addItem(router.query.orderId, {itemId});

      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);
      dispatch(fetchSuccess());
      dispatch(showMessage(`Success`));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const checkPoint = async (data) => {
    const quantity = event?.target?.value;
    const orderItemId = data.orderItemId;

    dispatch(fetchStart());
    try {
      await updateItem(router.query.orderId, {orderItemId, quantity});
      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);

      dispatch(fetchSuccess());
      dispatch(showMessage(`Success`));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };
  const onRemoveItem = async (data) => {
    const orderItemId = data.orderItemId;
    const name = data.name;
    dispatch(fetchStart());
    try {
      await deleteItem(orderItemId);
      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);

      dispatch(fetchSuccess());
      dispatch(showMessage(`Success`));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const onIncrease = async (data) => {
    const itemId = data.itemId;
    const quantity = data.quantity;
    dispatch(fetchStart());
    try {
      await addItem(router.query.orderId, {itemId, quantity});
      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);
      dispatch(fetchSuccess());
      dispatch(showMessage(`Success`));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const onDecrease = async (data) => {
    const quantity = event?.target?.value;
    const orderItemId = data.orderItemId;
    const onMinus = true;

    dispatch(fetchStart());
    try {
      await updateItem(router.query.orderId, {orderItemId, quantity, onMinus});
      const orderedItems = await getOrderedItems(router.query.orderId, {
        roomId,
      });
      setItems(orderedItems);

      dispatch(fetchSuccess());
      dispatch(showMessage(`Success`));
    } catch (e: any) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  const onCalculateRoomTime = async () => {
    const timeZone = -new Date().getTimezoneOffset() / 60;
    const result = await calculateBillRoom(router.query.orderId, {
      roomId,
      timeZone,
    });
    if (result) {
      console.log(room);
      const {usingTime, roomPrice, startTime, endTime} = result;
      setItems([
        ...items,
        {
          name: room.name,
          quantitive: `${startTime
            .substring(0, 16)
            .split('T')
            .join(' ')} -> ${endTime.substring(0, 16).split('T').join(' ')}`,
          totalPrice: roomPrice,
          price: room.weekdayPrice,
          quantity: usingTime.toFixed(2),
          isRoomBill: true,
        },
      ]);
    }
  };

  return (
    <>
      <Box
        component='h2'
        sx={{
          color: 'text.primary',
          fontWeight: Fonts.BOLD,
          mb: 6,
          fontSize: 16,
        }}
      >
        <IntlMessages id='sidebar.ecommerce.cart' />
        <Button
          variant='contained'
          color='secondary'
          style={{marginLeft: '20px'}}
          onClick={() => {
            onCalculateRoomTime();
          }}
        >
          Calculate Room Time
        </Button>
      </Box>
      <AppGridContainer>
        <Grid sx={{}} item xs={12} md={5}>
          <AppCard contentStyle={{px: 0}}>
            <AppTableContainer>
              <Table stickyHeader className='table'>
                <TableHead>
                  <TableHeading />
                </TableHead>
                <TableBody>
                  {items.map((data: any) => (
                    <TableRowHover key={data?.id} className='item-hover'>
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
                        align={data.isRoomBill ? 'left' : 'center'}
                        style={{fontWeight: Fonts.MEDIUM}}
                      >
                        {data.isRoomBill ? (
                          <>
                            <p style={styleRoomPrice}>
                              <span>weekday price: </span>
                              <span>${room.weekdayPrice}</span>
                            </p>
                            <p style={styleRoomPrice}>
                              <span>weekend price: </span>
                              <span>${room.weekendPrice}</span>
                            </p>
                            <p style={styleRoomPrice}>
                              <span>extra price: </span>
                              <span>${room.extraTimeCharge}</span>
                            </p>
                          </>
                        ) : (
                          `$ ${data.price}`
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {!data.isRoomBill && (
                          <AddIcon
                            className='pointer'
                            onClick={() => onIncrease(data)}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Box
                          sx={{
                            mw: 5,
                          }}
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          // width={}
                        >
                          <TextField
                            disabled={data?.isRoomBill}
                            style={{minWidth: 80, maxWidth: 100}}
                            value={data?.quantity}
                            onChange={() => checkPoint(data)}
                          ></TextField>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {!data.isRoomBill && (
                          <RemoveIcon
                            className='pointer'
                            onClick={() => onDecrease(data)}
                          />
                        )}
                      </StyledTableCell>
                      {/* <StyledTableCell align='center'></StyledTableCell> */}
                      {data.isRoomBill ? (
                        <StyledTableCell
                          align='center'
                          style={{fontWeight: Fonts.MEDIUM}}
                        >
                          {data.totalPrice}
                        </StyledTableCell>
                      ) : (
                        <>
                          <StyledTableCell
                            align='center'
                            style={{fontWeight: Fonts.MEDIUM}}
                          >
                            {data?.quantity ? (
                              <>${data.price * data?.quantity}</>
                            ) : (
                              <>$0</>
                            )}
                          </StyledTableCell>
                          <StyledTableCell component='th' scope='row'>
                            <CancelIcon onClick={() => onRemoveItem(data)} />
                          </StyledTableCell>
                        </>
                      )}
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
                {`${messages['ecommerce.orderSummary']}`}
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
                  // onClick={() => {
                  // }}
                >
                  Change Table
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  // onClick={() => {
                  // }}
                >
                  Pay
                </Button>
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                    mt: 2,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Grand Total: </Box>
                  <Box>${total}</Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Discount: </Box>
                  {/* <Box>$4</Box> */}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Tip: </Box>
                  {/* <Box>$4</Box> */}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                    mb: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Estimated Tax: </Box>
                  {/* <Box>$1</Box> */}
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                    my: 4,
                  }}
                >
                  <Box sx={{color: 'text.secondary'}}>Order Total: </Box>
                  <Box>${total}</Box>
                </Box>
              </Box>
            </AppAnimate>
          </AppCard>
        </Grid>
        <Grid item xs={12} md={7}>
          <AppCard contentStyle={{px: 0}}>
            <AppsHeader>
              <ItemHeader
              // list={list}
              // viewType={viewType}
              // page={page}
              // totalItems={total}
              // onPageChange={onPageChange}
              // onSearch={searchItem}
              />
            </AppsHeader>
            <AppsContent
              style={{
                backgroundColor: alpha(theme.palette.background.default, 0.6),
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  flex: 1,
                  // display: 'flex',
                  py: 2,
                  px: 4,
                  height: 1,
                  '& > div': {
                    width: '100%',
                  },
                }}
              >
                <AppGrid
                  // delay={200}
                  responsive={{
                    xs: 4,
                    sm: 5,
                    xl: 6,
                  }}
                  data={menu}
                  renderRow={(item) => (
                    <Card
                      sx={{
                        // p: 1,
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      className='item-hover'
                      onClick={() => onAddToBill(item)}
                    >
                      <Card
                        sx={{
                          mb: 1,
                        }}
                      >
                        {item.wallpaper ? (
                          <img src={item.wallpaper} alt={item.name} />
                        ) : (
                          <></>
                        )}
                        {/* <img src={item.wallpaper} alt={item.name} /> */}
                        <Box
                          sx={{
                            mt: -3,
                          }}
                        ></Box>
                      </Card>
                      <Box
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          mr: 2,
                          ml: 2,
                          mb: 2,
                        }}
                      >
                        <Typography align='center'>{item.name}</Typography>
                      </Box>
                    </Card>
                  )}
                  ListEmptyComponent={<ListEmptyResult />}
                />
              </Box>
            </AppsContent>
          </AppCard>
        </Grid>
        <AppInfoView />
      </AppGridContainer>
    </>
  );
};

export default Rooms;
