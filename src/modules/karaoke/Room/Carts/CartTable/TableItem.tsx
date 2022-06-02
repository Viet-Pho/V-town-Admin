import React from 'react';
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
import {CartItems} from '../../../../../types/models/ecommerce/EcommerceApp';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import TextField from '@mui/material/TextField';
import {Item} from '../../../../../types/models/Items';

interface CartTableProps {
  data: Item;
  list: Item;
}

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

const TableItem: React.FC<CartTableProps> = ({data, list}) => {
  // const dispatch = useDispatch();

  // const onRemoveItem = (data: CartItems) => {
  //   dispatch(removeCartItem(data));
  // };

  // const onDecrement = () => {
  //   if (data.count > 0) {
  //     dispatch(updateCartItem({...data, count: data.count - 1}));
  //   } else {
  //     dispatch(removeCartItem(data));
  //   }
  // };
  // const onIncrement = () => {
  //   dispatch(updateCartItem({...data, count: data.count + 1}));
  // };
  // const {list, setList} = React.useState([]);

  return <></>;
};

export default TableItem;
