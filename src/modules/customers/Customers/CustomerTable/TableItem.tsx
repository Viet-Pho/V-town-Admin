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
  isEditCustomerOpen: boolean;
  onCloseEditCustomer: () => void;
  isCustomerInfoOpen: boolean;
  onCloseCustomerInfo: () => void;
  customer: any;
  isAddCustomerOpen: boolean;
  pid: number;
}

const TableItem: React.FC<TableItemProps> = ({data}) => {
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
            <MenuItem style={{fontSize: 14}} onClick={handleClose}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
        <EditCustomer
          isEditCustomerOpen={isEditCustomerOpen}
          onCloseEditCustomer={onCloseEditCustomer}
        />
        <CustomerInfo
          isCustomerInfoOpen={isCustomerInfoOpen}
          onCloseCustomerInfo={onCloseCustomerInfo}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
