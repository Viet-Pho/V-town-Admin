import {RiUserReceived2Line, RiMoneyDollarCircleLine} from 'react-icons/ri';
import {CgUserList} from 'react-icons/cg';
import {ReactNode} from 'react';
import {RoutePermittedRole} from '../shared/constants/AppConst';

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: object;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  as?: string;
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'app',
    title: 'Dashboard',
    messageId: 'sidebar.app.dashboard',
    type: 'group',
    children: [
      {
        id: 'register-staff',
        title: 'Register Staff',
        messageId: 'sidebar.app.dashboard.registerStaff',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin],
        icon: <RiUserReceived2Line />,
        url: '/dashboards/register-staff',
      },
      {
        id: 'exchange-point',
        title: 'Exchange Point',
        messageId: 'sidebar.app.dashboard.exchangePoint',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.User],
        icon: <RiMoneyDollarCircleLine />,
        url: '/dashboards/exchange-point',
      },
      {
        id: 'userlist',
        title: 'User List',
        messageId: 'sidebar.app.dashboard.userList',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.User],
        icon: <CgUserList />,
        url: '/dashboards/customers-list',
      },
      {
        id: 'add-customer',
        title: 'Add Customer',
        messageId: 'sidebar.app.dashboard.addCustomer',
        type: 'item',
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.User],
        icon: <RiUserReceived2Line />,
        url: '/dashboards/add-customer',
      },
    ],
  },
];

function getFlattenRoute(route) {
  let flattenRoutes = [...route];
  route.forEach((route) => {
    if (route.children && route.children.length)
      flattenRoutes = [...flattenRoutes, ...getFlattenRoute(route.children)];
  });
  return flattenRoutes.map((route) => {
    const {children, ...routeNoChild} = route;
    return routeNoChild;
  });
}

const flattenRoute = getFlattenRoute(routesConfig);

export {flattenRoute};
export default routesConfig;
