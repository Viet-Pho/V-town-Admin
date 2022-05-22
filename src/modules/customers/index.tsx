// @ts-nocheck
import React, {useEffect, useState} from 'react';
import CustomerTable from './CustomerTable';
import AppsContainer from '../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers} from '../../redux/actions';
import {searchCustomers} from '../../models/customer';
import {Button, Hidden} from '@mui/material';
import AppsHeader from '../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '../../@crema/core/AppInfoView';
import AppSearchBar from '../../@crema/core/AppSearchBar';
import {AppState} from '../../redux/store';
import AddNewCustomer from './AddNewCustomer';

interface TableItemProps {
  isEditCustomerOpen: boolean;
  isCustomerInfoOpen: boolean;
}

const Customers: React.FC<TableItemProps> = (props) => {
  const {isEditCustomerOpen, isCustomerInfoOpen} = props;
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([
    {
      id: 0,
      code: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
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

  const [isAddCustomerOpen, setAddCustomerOpen] = React.useState(false);

  const onOpenAddCustomer = () => {
    setAddCustomerOpen(true);
  };

  const onCloseAddCustomer = () => {
    setAddCustomerOpen(false);
  };

  // const onSearchCustomer = (value: string) => {
  //   setSearchQuery(value);
  //   setPage(0);
  // };

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
              <Button
                variant='contained'
                color='primary'
                onClick={onOpenAddCustomer}
              >
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
      <AddNewCustomer
        isCustomerInfoOpen={isCustomerInfoOpen}
        isEditCustomerOpen={isEditCustomerOpen}
        isAddCustomerOpen={isAddCustomerOpen}
        onCloseAddCustomer={onCloseAddCustomer}
      />
      <AppInfoView />
    </>
  );
};

export default Customers;
