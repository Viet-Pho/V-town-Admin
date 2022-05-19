import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';
import {Customer} from '../../../../types/models/dashboards/ExchangePoint';

interface CustomerTableProps {
  customers: any[];
}

const CustomerTable: React.FC<CustomerTableProps> = (props) => {
  const {customers} = props;

  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableItem customer={customer} key={customer.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CustomerTable;
