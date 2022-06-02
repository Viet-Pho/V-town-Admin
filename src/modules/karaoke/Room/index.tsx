import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CartTable from './Carts/CartTable';
import {Fonts} from '../../../shared/constants/AppEnums';
import {getCartItems} from '../../../redux/actions';
import OrderSummary from './Carts/OrderSummary';
import {AppState} from '../../../redux/store';
import {useRouter} from 'next/router';
import TableHeading from './TableHeading';
import {CartItems} from 'types/models/ecommerce/EcommerceApp';
import {Item} from '../../../types/models/Items';
import {removeCartItem, updateCartItem} from '../../../redux/actions';
import ItemHeader from './ItemsHeader';
import {setFilters} from '../../../redux/actions';
// import {searchItems} from '../../../../models/item';
import {fetchItems} from '../../../models/items';
// MUI

import {Grid} from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import {styled} from '@mui/material/styles';
import {alpha, Box, Hidden} from '@mui/material';
import Card from '@mui/material/Card';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// Crema
import AppCard from '../../../@crema/core/AppCard';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {AppGridContainer} from '../../../@crema';
import AppAnimate from '../../../@crema/core/AppAnimate';
import AppTableContainer from '@crema/core/AppTableContainer';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import {useThemeContext} from '@crema/utility/AppContextProvider/ThemeContextProvider';
import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 10,
  '&:first-of-type': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(2)': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(3)': {
    paddingLeft: 30,
  },
  '&:nth-of-type(4)': {
    // paddingLeft: 20,
  },
  '&:nth-of-type(5)': {
    paddingRight: 30,
  },
  '&:last-of-type': {
    paddingLeft: 15,
    paddingRight: 15,
  },
}));

interface ItemGridProps {
  items: Item[];
  loading: boolean;
  renderRow: () => JSX.Element;
  data: Item;
}

const Rooms: React.FC<ItemGridProps> = (props) => {
  const {data} = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const {cartItems} = useSelector<AppState, AppState['ecommerce']>(
    ({ecommerce}) => ecommerce,
  );

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, [dispatch]);
  const {messages} = useIntl();

  const {theme} = useThemeContext();
  const [page, setPage] = useState<number>(0);

  // const {viewType, filterData} = useSelector<AppState, AppState['ecommerce']>(
  //   ({ecommerce}) => ecommerce,
  // );
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    const item = await fetchItems();
    setItem(item);
  };
  useEffect(() => {
    fetchItem();
  }, []);

  // console.log('item', item);

  const [items, setItems] = useState([]);
  const onAddToBill = (item) => {
    setItems((prevState) => {
      return [...prevState, item] as any;
    });
  };

  console.log('items', items);

  // const list = item,
  //   total = item?.length;
  // const {loading} = useSelector<AppState, AppState['common']>(
  //   ({common}) => common,
  // );

  const onRemoveItem = (data: CartItems) => {
    data;
  };

  const onDecrement = () => {
    if (data?.count > 0) {
      ({...data, count: data.count - 1});
    } else {
      data;
    }
  };
  const onIncrement = () => {
    ({...data, count: data.count + 1});
  };

  // const onPageChange = (value: number) => {
  //   setPage(value);
  // };

  // const searchItem = (title: string) => {
  //   dispatch(setFilters({...filterData, title}));
  // };

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
                    <TableRow key={data?.id} className='item-hover'>
                      <StyledTableCell>
                        <Box display='flex'>
                          {data?.wallpaper ? (
                            <Avatar sx={{mr: 3.5}} src={data?.wallpaper} />
                          ) : (
                            <></>
                          )}

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
                        {/* ${+data.mrp - +data.discount} */}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <AddIcon
                          className='pointer'
                          // onClick={onIncrement}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          width={60}
                        >
                          <TextField>{data?.count}</TextField>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <RemoveIcon className='pointer' onClick={onDecrement} />
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        style={{fontWeight: Fonts.MEDIUM}}
                      >
                        {data.price ? (
                          <>${data.price * data?.count}</>
                        ) : (
                          <>${data.price}</>
                        )}

                        {/* ${(+data.mrp - +data.discount) * +data.count} */}
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='row'>
                        {/* <CancelIcon onClick={() => onRemoveItem(data)} /> */}
                      </StyledTableCell>
                    </TableRow>
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
                  //   router.push('/ecommerce/products');
                  // }}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  // onClick={() => {
                  //   router.push('/ecommerce/checkout');
                  // }}
                >
                  Checkout
                </Button>
              </Box>
            }
          >
            <OrderSummary cartItems={cartItems} />
          </AppCard>
        </Grid>
        <Grid item xs={12} md={7}>
          <AppCard contentStyle={{px: 0}}>
            <AppsHeader>
              <ItemHeader
              // list={list}
              // viewType={viewType}
              // page={page}
              // // totalItems={total}
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
                    xs: 3,
                    sm: 5,
                    xl: 5,
                  }}
                  data={item}
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
                        <img src={item.wallpaper} alt={item.name} />
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
      </AppGridContainer>
    </>
  );
};

export default Rooms;
