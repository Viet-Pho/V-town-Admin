import React, {useEffect, useState} from 'react';
import CustomerTable from './CustomerTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers} from '../../../redux/actions';
import {searchCustomers} from '../../../models/customer';
import {Button, Hidden} from '@mui/material';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '../../../@crema/core/AppInfoView';
import AppSearchBar from '../../../@crema/core/AppSearchBar';
import {AppState} from '../../../redux/store';

const Customers = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([
    {
      id: 13,
      code: '100001',
      phoneNumber: '123456',
      firstName: 'Hung',
      lastName: 'Nguyen',
      email: 'nqhptit@gmail.com',
      address: '64 Sec 82, Phu Do Street, Nam Tu Liem District, Hanoi City',
    },
  ]);
  const [customerCount, setCustomerCount] = useState(1);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState<string>('');

  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number,
  ) => {
    setPage(value);
  };

  const fetchCustomer = async () => {
    const {total, customers} = await searchCustomers({searchText: search});
    setCustomers(customers);
    setCustomerCount(total);
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSearchCustomer = (event) => {
    if (event.key !== 'Enter') return;
    fetchCustomer();
  };

  return (
    <>
      <AppsContainer
        title={messages['sidebar.ecommerce.customers'] as string}
        fullView
      >
        <AppsHeader>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 1,
            }}
          >
            <AppSearchBar
              iconPosition='right'
              overlap={false}
              onKeyDown={handleSearchCustomer}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={messages['common.searchHere'] as string}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Button variant='contained' color='primary'>
                Add Customer
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
                  count={customerCount}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          <CustomerTable customers={customers} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={10}
            count={customerCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>

      <AppInfoView />
    </>
  );
};

export default Customers;
