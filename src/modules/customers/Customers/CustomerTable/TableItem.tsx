// @ts-nocheck

import React, {useState} from 'react';
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
import AppConfirmDialog from '@crema/core/AppConfirmDialog';
import {AiOutlineDeploymentUnit} from 'react-icons/ai';

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
  data: CustomersData;
  customer: CustomersData;
  isEditCustomerOpen: boolean;
  onCloseDeleteCustomer: () => void;
  onDeleteCustomerOpe?: () => void;
  onCloseEditCustomer: () => void;
  isCustomerInfoOpen: boolean;
  onCloseCustomerInfo: () => void;
  isAddCustomerOpen: boolean;
  pid: number;
}

const TableItem: React.FC<TableItemProps> = ({data, onCloseDeleteCustomer}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

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
  const pid = 21;
  const deleteCustomer = async () => {
    dispatch(fetchStart());
    try {
      const response: any = await deleteCustomerById(pid);
      dispatch(fetchSuccess());
      dispatch(showMessage(`${response.message}`));
      setDeleteDialogOpen(false);
    } catch (e) {
      dispatch(fetchError(`${e?.response?.data?.message}`));
      setDeleteDialogOpen(false);
    }
  };

  return (
    <TableRow key={data.name} className='item-hover'>
      <StyledTableCell component='th' scope='row'>
        <Box
          sx={{
            color: 'primary.main',
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
          }}
        >
          {data.name}
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{data.email}</StyledTableCell>
      <StyledTableCell align='left'>{data.lastItem}</StyledTableCell>
      <StyledTableCell align='left'>{data.lastOrder}</StyledTableCell>
      <StyledTableCell align='left'>
        <Box
          component='span'
          sx={{
            color: 'white',
            backgroundColor: '#388E3C',
            maxWidth: 55,
            mr: 2,
            px: 3,
            pt: 0.5,
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 10,
            fontSize: 12,
          }}
        >
          {data.rating} <StarRateIcon style={{fontSize: 16}} />
        </Box>
      </StyledTableCell>
      <StyledTableCell align='left'>{data.balance}</StyledTableCell>
      <StyledTableCell align='left'>{data.address}</StyledTableCell>
      <StyledTableCell align='left'>{data.joinDate}</StyledTableCell>
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
            <MenuItem
              style={{fontSize: 14}}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
        <EditCustomer
          isCustomerInfoOpen={isCustomerInfoOpen}
          isEditCustomerOpen={isEditCustomerOpen}
          onCloseEditCustomer={onCloseEditCustomer}
        />
        <CustomerInfo
          isEditCustomerOpen={isEditCustomerOpen}
          isCustomerInfoOpen={isCustomerInfoOpen}
          onCloseCustomerInfo={onCloseCustomerInfo}
        />
        <AppConfirmDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={deleteCustomer}
          title={'Are you sure you want to delete this customer?'}
          dialogTitle={'Delete Customer'}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
