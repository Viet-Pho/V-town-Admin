import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import OrderActions from './OrderActions';
import StarRateIcon from '@mui/icons-material/StarRate';
import {styled} from '@mui/material/styles';
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
  customer: Customer;
}

const TableItem: React.FC<TableItemProps> = ({customer}) => {
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
      <StyledTableCell align='left'>{customer.cardNumber}</StyledTableCell>
      <StyledTableCell align='left'>{customer.phoneNumber}</StyledTableCell>
      <StyledTableCell align='left'>{customer.email}</StyledTableCell>
      <StyledTableCell align='left'>{customer.address}</StyledTableCell>
      <StyledTableCell align='right'>
        <OrderActions />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
