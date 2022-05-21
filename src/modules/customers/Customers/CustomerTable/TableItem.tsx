// @ts-nocheck

import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import StarRateIcon from '@mui/icons-material/StarRate';
import {styled} from '@mui/material/styles';
import {CustomersData} from '../../../../types/models/ecommerce/EcommerceApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditCustomer from '../EditCustomer';
import CustomerInfo from '../CustomerInfo';
import {deleteCustomerById} from 'models/customers';
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import {Customer} from '../../../../types/models/dashboards/ExchangePoint';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

interface TableItemProps {
  data: Customer;
  customer: Customer;
  isEditCustomerOpen: boolean;
  onCloseEditCustomer: () => void;
  isCustomerInfoOpen: boolean;
  onCloseCustomerInfo: () => void;
  isAddCustomerOpen: boolean;
  pid: number;
}

const TableItem: React.FC<TableItemProps> = ({customer}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isEditCustomerOpen, setEditCustomerOpen] = React.useState(false);

  const onOpenEditCustomer = () => {
    setEditCustomerOpen(true);
  };
  const onCloseEditCustomer = () => {
    setEditCustomerOpen(false);
  };

  const [isCustomerInfoOpen, setCustomerInfoOpen] = React.useState(false);

  const onOpenCustomerInfo = () => {
    setCustomerInfoOpen(true);
  };
  const onCloseCustomerInfo = () => {
    setCustomerInfoOpen(false);
  };

  const deleteCustomer = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await deleteCustomerById(customer.id);
      dispatch(fetchSuccess());
      dispatch(showMessage(`${response.message}`));
    } catch (e) {
      console.log(e);
      dispatch(fetchError(`${e?.response?.data?.message}`));
    }
  };

  return (
    <TableRow key={customer.id} className='item-hover'>
      <StyledTableCell component='th' scope='row'>
        <Box
          sx={{
            color: 'primary.main',
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
          }}
        >
          {`${customer.firstName} ${customer.lastName}`}
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{customer.cardId}</StyledTableCell>
      <StyledTableCell align='left'>{customer.phoneNumber}</StyledTableCell>
      <StyledTableCell align='left'>{customer.email}</StyledTableCell>
      <StyledTableCell align='left'>{customer.address}</StyledTableCell>
      <StyledTableCell align='right'>
        <Box>
          <IconButton
            aria-controls='alpha-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='alpha-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem style={{fontSize: 14}} onClick={onOpenCustomerInfo}>
              View Customer
            </MenuItem>
            <MenuItem style={{fontSize: 14}} onClick={onOpenEditCustomer}>
              Edit
            </MenuItem>
            <MenuItem style={{fontSize: 14}} onClick={deleteCustomer}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
        <EditCustomer
          isCustomerInfoOpen={isCustomerInfoOpen}
          isEditCustomerOpen={isEditCustomerOpen}
          onCloseEditCustomer={onCloseEditCustomer}
          customer={customer}
        />
        <CustomerInfo
          isEditCustomerOpen={isEditCustomerOpen}
          isCustomerInfoOpen={isCustomerInfoOpen}
          onCloseCustomerInfo={onCloseCustomerInfo}
          customer={customer}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
