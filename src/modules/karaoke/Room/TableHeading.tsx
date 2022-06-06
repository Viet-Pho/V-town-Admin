import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeader from '@crema/core/AppTable/TableHeader';

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align='center'>Product</TableCell>
      <TableCell align='center'>Unit Price</TableCell>
      <TableCell />
      <TableCell align='center'>QTY</TableCell>
      <TableCell />
      <TableCell align='center'>Total</TableCell>
      <TableCell />
    </TableHeader>
  );
};

export default TableHeading;
