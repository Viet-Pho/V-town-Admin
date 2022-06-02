import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from '../../TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';
import {CartItems} from 'types/models/ecommerce/EcommerceApp';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import {useDispatch} from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {removeCartItem, updateCartItem} from '../../../../../redux/actions';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {styled} from '@mui/material/styles';

import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import TextField from '@mui/material/TextField';
import {Item} from '../../../../../types/models/Items';

// interface CartTableProps {
//   data: Item;
//   list: Item;
// }

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
interface CartTableProps {
  cartItems: CartItems[];
}

const CartTable: React.FC<CartTableProps> = ({cartItems}) => {
  console.log('cartItems', cartItems);

  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {cartItems.map((data) => (
            <TableRow key={data.id} className='item-hover'>
              <StyledTableCell>
                <Box display='flex'>
                  <Avatar sx={{mr: 3.5}} src={data.image} />
                  <Box>
                    <Box fontSize={14} fontWeight={Fonts.MEDIUM}>
                      {data.title}
                    </Box>
                    <Box color='text.secondary' fontSize={14}>
                      Brand: {data.brand}
                    </Box>
                  </Box>
                </Box>
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{fontWeight: Fonts.MEDIUM}}
              >
                ${+data.mrp - +data.discount}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {/* <AddIcon className='pointer' onClick={onIncrement} /> */}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Box
                  // border={1}
                  // borderRadius={4}
                  display='flex'
                  // borderColor='text.secondary'
                  alignItems='center'
                  justifyContent='center'
                  width={60}
                >
                  {/* <Box component='span' px={3}> */}
                  <TextField>{data.count}</TextField>
                </Box>
              </StyledTableCell>
              <StyledTableCell align='center'>
                {/* <RemoveIcon className='pointer' onClick={onDecrement} /> */}
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{fontWeight: Fonts.MEDIUM}}
              >
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
  );
};

export default CartTable;
