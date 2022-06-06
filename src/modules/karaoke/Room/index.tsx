import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts} from '../../../shared/constants/AppEnums';
import {getCartItems} from '../../../redux/actions';

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
import {
  addItem,
  updateItem,
  deleteItem,
  getOrderedItems,
} from '../../../models/order';
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
import {MdOutlineFormatIndentDecrease} from 'react-icons/md';

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
  const {loading, renderRow} = props;

  const dispatch = useDispatch();
  const router = useRouter();

  // console.log('router', router.query);

  // const getRouterObject = withRouter(() => {
  //   return router;
  // });

  const {messages} = useIntl();

  const {theme} = useThemeContext();
  // const [page, setPage] = useState<number>(0);
  const [items, setItems] = useState([]);
  // const {viewType, filterData} = useSelector<AppState, AppState['ecommerce']>(
  //   ({ecommerce}) => ecommerce,
  // );
  const [menu, setMenu] = useState([]);

  const fetchItem = async () => {
    const menu = await fetchItems();
    setMenu(menu);
    const roomId = router.query.pid;
    // const orderedItems = await fetchOrderedItems();
    const orderedItems = await getOrderedItems(router.query.orderId, {roomId});
    console.log('menu', menu);
    console.log('orderedItems', orderedItems);
    let mergedSubjects = orderedItems.map((subject) => {
      let otherSubject = menu.find((element) => element.id === subject.id);
      return {...subject, ...otherSubject};
    });
    console.log('mergedSubjects', mergedSubjects);
    setItems(mergedSubjects);
  };
  const fetchOrderedItems = async () => {
    const roomId = router.query.pid;
    await getOrderedItems(router.query.orderId, {roomId});
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const onAddToBill = async (item) => {
    const itemId = item.id;
    console.log('Item Id:', itemId);
    console.log('Order Id:', router.query.orderId);
    const addNewItem = await addItem(router.query.orderId, {itemId});
    await fetchOrderedItems();
    console.log('addNewItem', addNewItem);
  };

  let sum = 0;

  items.forEach((element) => {
    sum += element.price;
  });

  console.log('sum', sum);

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
        <Grid sx={{}} item xs={12} md={6}>
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
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <AddIcon
                          className='pointer'
                          // onClick={onIncrease(data.quantitty)}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          width={60}
                        >
                          <TextField
                            value={data?.quantity}
                            // onChange={() => handleChangeQuantity(data)}
                          ></TextField>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <RemoveIcon
                          className='pointer'
                          // onClick={onDecrease(data.quantitty)}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        style={{fontWeight: Fonts.MEDIUM}}
                      >
                        {data?.quantity ? (
                          <>${data.price * data?.quantity}</>
                        ) : (
                          <>${data.price}</>
                        )}
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='row'>
                        <CancelIcon
                        // onClick={() => onRemoveItem(data)}
                        />
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
                  Change Table
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  // onClick={() => {
                  //   router.push('/ecommerce/checkout');
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
                  <Box>${sum}</Box>
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
                  <Box>${sum}</Box>
                </Box>
              </Box>
            </AppAnimate>
          </AppCard>
        </Grid>
        <Grid item xs={12} md={6}>
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
                    xs: 3,
                    sm: 5,
                    xl: 5,
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
      </AppGridContainer>
    </>
  );
};

export default Rooms;
