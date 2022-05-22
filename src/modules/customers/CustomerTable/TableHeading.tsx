import React from 'react';
import {TableCell} from '@mui/material';
import TableHeader from '@crema/core/AppTable/TableHeader';

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align='left'>Fullname</TableCell>
      <TableCell align='left'>Card Number</TableCell>
      <TableCell align='left'>Phone Number</TableCell>
      <TableCell align='left'>Email</TableCell>
      <TableCell align='left'>Address</TableCell>
      <TableCell align='right'>Action</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
