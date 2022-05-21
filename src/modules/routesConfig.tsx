import {FaRegCalendarAlt, FaRegHospital} from 'react-icons/fa';
import {FiMap, FiUsers} from 'react-icons/fi';
import {HiOutlineAcademicCap, HiOutlineChartSquareBar} from 'react-icons/hi';
import {
  RiCustomerService2Line,
  RiDashboardLine,
  RiShieldUserLine,
  RiTodoLine,
  RiUserSettingsLine,
  RiUserReceived2Line,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
import {BiCarousel, BiCartAlt, BiErrorAlt} from 'react-icons/bi';
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
  BsFillFilePersonFill,
  BsPersonLinesFill,
} from 'react-icons/bs';
import {DiHtml5Multimedia} from 'react-icons/di';
import {
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import {CgFeed, CgUserList} from 'react-icons/cg';
import {ImFeed, ImLab} from 'react-icons/im';
import {GrDatabase, GrNavigate} from 'react-icons/gr';
import {VscTable, VscTools} from 'react-icons/vsc';
import {
  AiOutlineLayout,
  AiOutlineUnorderedList,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import {ReactNode} from 'react';
import {RoutePermittedRole} from '../shared/constants/AppConst';

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  as?: string;
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'register-staff',
        title: 'Register Staff',
        messageId: 'sidebar.app.dashboard.registerStaff',
        type: 'item',
        icon: <RiUserReceived2Line />,
        url: '/dashboards/register-staff',
      },
      {
        id: 'exchange-point',
        title: 'Exchange Point',
        messageId: 'sidebar.app.dashboard.exchangePoint',
        type: 'item',
        icon: <RiMoneyDollarCircleLine />,
        url: '/dashboards/exchange-point',
      },
      {
        id: 'userlist',
        title: 'User List',
        messageId: 'sidebar.app.dashboard.userList',
        type: 'item',
        icon: <CgUserList />,
        url: '/dashboards/users-list',
      },
    ],
  },
];
export default routesConfig;
