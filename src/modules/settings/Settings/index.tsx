import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/utility/IntlMessages';
import {BiUser, BiFoodMenu} from 'react-icons/bi';
import {AiOutlineLock} from 'react-icons/ai';
import {BsDoorOpenFill} from 'react-icons/bs';
import {RiTableFill} from 'react-icons/ri';
import AccountTabsWrapper from './AccountTabsWrapper';
import MenuComponent from './Menu';
import ChangePassword from './ChangePassword';

import {AppAnimate} from '../../../@crema';
import {Fonts} from '../../../shared/constants/AppEnums';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  {
    id: 1,
    icon: <BiFoodMenu />,
    name: <IntlMessages id='common.menu' />,
  },
  {
    id: 2,
    icon: <BsDoorOpenFill />,
    name: <IntlMessages id='common.rooms' />,
  },
  {
    id: 3,
    icon: <RiTableFill />,
    name: <IntlMessages id='common.tables' />,
  },
];

const Account = () => {
  const [value, setValue] = React.useState<number>(0);

  const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(+newValue);
  };

  return (
    <>
      <Box
        component='h2'
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        Setting
      </Box>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AccountTabsWrapper>
          <Tabs
            className='account-tabs'
            value={value}
            onChange={onTabsChange}
            aria-label='basic tabs example'
            orientation='vertical'
          >
            {tabs.map((tab, index) => (
              <Tab
                className='account-tab'
                label={tab.name}
                icon={tab.icon}
                key={index}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <Box className='account-tabs-content'>
            {value === 0 && <MenuComponent />}
            {value === 1 && <ChangePassword />}
            {value === 2 && <ChangePassword />}
          </Box>
        </AccountTabsWrapper>
      </AppAnimate>
    </>
  );
};

export default Account;
