// @ts-nocheck

import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

interface BillTableProps {
  bills: any[];
  fetchBill: () => void;
}

const BillTable: React.FC<BillTableProps> = (props) => {
  const {bills, fetchBill} = props;

  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {!!bills &&
            !!bills.length &&
            bills.map((bill) => (
              <TableItem bill={bill} fetchBill={fetchBill} key={bill.id} />
            ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default BillTable;
