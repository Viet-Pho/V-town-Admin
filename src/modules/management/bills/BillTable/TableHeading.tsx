import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align='left'>Billing Object</TableCell>
      <TableCell align='left'>Order Id</TableCell>
      <TableCell align='left'>Customer</TableCell>
      <TableCell align='left'>Staff</TableCell>
      <TableCell align='left'>Total Price</TableCell>
      <TableCell align='left'>Status</TableCell>
      <TableCell align='left'>Note</TableCell>
      <TableCell align='right'>Action</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
