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
  RiMoneyDollarCircleLine
} from 'react-icons/ri';
import {BiCarousel, BiCartAlt, BiErrorAlt} from 'react-icons/bi';
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
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
        id: 'crypto',
        title: 'Crypto',
        messageId: 'sidebar.app.dashboard.crypto',
        type: 'item',
        icon: <BsCurrencyBitcoin />,
        url: '/dashboards/crypto',
      },
      {
        id: 'crm',
        title: 'CRM',
        messageId: 'sidebar.app.dashboard.crm',
        type: 'item',
        icon: <RiCustomerService2Line />,
        url: '/dashboards/crm',
      },
      {
        id: 'analytics',
        title: 'Analytics',
        messageId: 'sidebar.app.dashboard.analytics',
        type: 'item',
        icon: <MdOutlineAnalytics />,
        url: '/dashboards/analytics',
      },
      {
        id: 'healthCare',
        title: 'Health Care',
        messageId: 'sidebar.healthCare',
        type: 'item',
        icon: <RiUserReceived2Line />,
        url: '/dashboards/register-staff',
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
  {
    id: 'apps',
    title: 'Apps',
    messageId: 'sidebar.apps',
    type: 'group',
    children: [
      {
        id: 'mail',
        title: 'Mail',
        messageId: 'sidebar.apps.mail',
        type: 'item',
        count: 4,
        icon: 'mail_outline',
        url: '/apps/mail/[...all]',
        as: '/apps/mail/inbox',
      },
      {
        id: 'todo',
        title: 'ToDo',
        messageId: 'sidebar.apps.todo',
        type: 'item',
        count: 6,
        icon: <RiTodoLine />,
        color: '#48bb78',
        url: '/apps/todo/[...all]',
        as: '/apps/todo/all',
      },
      {
        id: 'contact',
        title: 'Contact',
        messageId: 'sidebar.apps.contact',
        type: 'item',
        icon: <MdOutlineContactPhone />,
        url: '/apps/contact/[...all]',
        as: '/apps/contact/folder/all',
      },
      {
        id: 'chat',
        title: 'Chat',
        messageId: 'sidebar.apps.chat',
        type: 'item',
        icon: <BsChatDots />,
        url: '/apps/chat',
      },
      // {
      //   id: 'scrum-board',
      //   title: 'Scrum Board',
      //   messageId: 'sidebar.apps.scrumboard',
      //   type: 'item',
      //   icon: <MdOutlineDns />,
      //   url: '/apps/scrum-board',
      //   as: '/apps/scrum-board',
      // },
      {
        id: 'wall',
        title: 'Wall',
        messageId: 'sidebar.apps.wall',
        type: 'item',
        icon: <CgFeed />,
        url: '/apps/wall',
      },
      {
        id: 'ecommerce',
        title: 'Ecommerce',
        messageId: 'sidebar.ecommerce',
        type: 'collapse',
        icon: <BiCartAlt />,
        children: [
          {
            id: 'products',
            title: 'Products',
            messageId: 'sidebar.ecommerce.products',
            type: 'item',
            url: '/ecommerce/products',
          },
          {
            id: 'product_detail',
            title: 'Product Detail',
            messageId: 'sidebar.ecommerce.productDetail',
            type: 'item',
            url: '/ecommerce/product_detail/[...all]',
            as: '/ecommerce/product_detail/1',
          },
          {
            id: 'orders',
            title: 'Orders',
            messageId: 'sidebar.ecommerce.orders',
            type: 'item',
            url: '/ecommerce/orders',
          },
          {
            id: 'customers',
            title: 'Customers',
            messageId: 'sidebar.ecommerce.customers',
            type: 'item',
            url: '/ecommerce/customers',
          },
          {
            id: 'cart',
            title: 'Cart',
            messageId: 'sidebar.ecommerce.cart',
            type: 'item',
            url: '/ecommerce/cart',
          },
          {
            id: 'checkout',
            title: 'Checkout',
            messageId: 'sidebar.ecommerce.checkout',
            type: 'item',
            url: '/ecommerce/checkout',
          },
          {
            id: 'confirmation',
            title: 'Confirmation',
            messageId: 'sidebar.ecommerce.confirmation',
            type: 'item',
            url: '/ecommerce/confirmation',
          },
          {
            id: 'invoice-1',
            title: 'Invoice 1',
            messageId: 'sidebar.ecommerce.invoice1',
            type: 'item',
            url: '/ecommerce/invoice-1',
          },
          {
            id: 'invoice-2',
            title: 'Invoice 2',
            messageId: 'sidebar.ecommerce.invoice2',
            type: 'item',
            url: '/ecommerce/invoice-2',
          },
        ],
      },
    ],
  },
  {
    id: 'mui',
    title: 'MUI Components',
    messageId: 'sidebar.mui',
    type: 'group',
    children: [
      {
        id: 'inputs',
        title: 'Inputs',
        messageId: 'sidebar.mui.inputs',
        type: 'collapse',
        icon: 'input',
        children: [
          {
            id: 'autocomplete',
            title: 'Autocomplete',
            messageId: 'sidebar.mui.inputs.autocomplete',
            type: 'item',
            url: '/mui/inputs/autocomplete',
          },
          {
            id: 'buttons',
            title: 'Buttons',
            messageId: 'sidebar.mui.inputs.buttons',
            type: 'item',
            url: '/mui/inputs/buttons',
          },
          {
            id: 'button-group',
            title: 'Buttons',
            messageId: 'sidebar.mui.inputs.buttonGroup',
            type: 'item',
            url: '/mui/inputs/button-group',
          },
          {
            id: 'checkboxes',
            title: 'Checkboxes',
            messageId: 'sidebar.mui.inputs.checkboxes',
            type: 'item',
            url: '/mui/inputs/checkboxes',
          },
          {
            id: 'fab',
            title: 'Fab',
            messageId: 'sidebar.mui.inputs.fab',
            type: 'item',
            url: '/mui/inputs/floating-action-button',
          },
          {
            id: 'radios',
            title: 'Radio Button',
            messageId: 'sidebar.mui.inputs.radio',
            type: 'item',
            url: '/mui/inputs/radios',
          },
          {
            id: 'rating',
            title: 'Rating',
            messageId: 'sidebar.mui.util.rating',
            type: 'item',
            url: '/mui/inputs/rating',
          },
          {
            id: 'selects',
            title: 'Selects',
            messageId: 'sidebar.mui.inputs.selects',
            type: 'item',
            url: '/mui/inputs/selects',
          },
          {
            id: 'slider',
            title: 'Slider',
            messageId: 'sidebar.mui.inputs.slider',
            type: 'item',
            url: '/mui/inputs/slider',
          },
          {
            id: 'switches',
            title: 'Switches',
            messageId: 'sidebar.mui.inputs.switches',
            type: 'item',
            url: '/mui/inputs/switches',
          },
          {
            id: 'textField',
            title: 'Text Field',
            messageId: 'sidebar.mui.inputs.textField',
            type: 'item',
            url: '/mui/inputs/text-fields',
          },
          {
            id: 'transfer',
            title: 'Transfer List',
            messageId: 'sidebar.mui.inputs.transfer',
            type: 'item',
            url: '/mui/inputs/transfer-list',
          },
          {
            id: 'toggle-buttons',
            title: 'Toggle Buttons',
            messageId: 'sidebar.mui.util.toggleButtons',
            type: 'item',
            url: '/mui/inputs/toggle-buttons',
          },
        ],
      },
      {
        id: 'dataDisplay',
        title: 'Data Display',
        messageId: 'sidebar.mui.dataDisplay',
        type: 'collapse',
        icon: <GrDatabase />,
        children: [
          {
            id: 'avatars',
            title: 'Avatars',
            messageId: 'sidebar.mui.dataDisplay.avatars',
            type: 'item',
            url: '/mui/data-display/avatars',
          },
          {
            id: 'badges',
            title: 'Badges',
            messageId: 'sidebar.mui.dataDisplay.badges',
            type: 'item',
            url: '/mui/data-display/badges',
          },
          {
            id: 'chips',
            title: 'Chips',
            messageId: 'sidebar.mui.dataDisplay.chips',
            type: 'item',
            url: '/mui/data-display/chips',
          },
          {
            id: 'divider',
            title: 'Divider',
            messageId: 'sidebar.mui.dataDisplay.divider',
            type: 'item',
            url: '/mui/data-display/divider',
          },
          {
            id: 'lists',
            title: 'Lists',
            messageId: 'sidebar.mui.dataDisplay.lists',
            type: 'item',
            url: '/mui/data-display/lists',
          },
          {
            id: 'tables',
            title: 'Tables',
            messageId: 'sidebar.mui.dataDisplay.tables',
            type: 'item',
            url: '/mui/data-display/tables',
          },
          {
            id: 'tooltip',
            title: 'Tooltip',
            messageId: 'sidebar.mui.dataDisplay.tooltip',
            type: 'item',
            url: '/mui/data-display/tooltip',
          },
          {
            id: 'typography',
            title: 'Typography',
            messageId: 'sidebar.mui.dataDisplay.typography',
            type: 'item',
            url: '/mui/data-display/typography',
          },
        ],
      },
      {
        id: 'navigation',
        title: 'Navigation',
        messageId: 'sidebar.mui.navigation',
        type: 'collapse',
        icon: <GrNavigate />,
        children: [
          {
            id: 'bottomNavigation',
            title: 'Bottom Navigation',
            messageId: 'sidebar.mui.navigation.bottom',
            type: 'item',
            url: '/mui/navigation/bottom-navigation',
          },
          {
            id: 'breadcrumbs',
            title: 'Breadcrumbs',
            messageId: 'sidebar.mui.navigation.breadcrumbs',
            type: 'item',
            url: '/mui/navigation/breadcrumbs',
          },
          {
            id: 'drawers',
            title: 'Drawers',
            messageId: 'sidebar.mui.navigation.drawers',
            type: 'item',
            url: '/mui/navigation/drawers',
          },
          {
            id: 'links',
            title: 'Links',
            messageId: 'sidebar.mui.navigation.links',
            type: 'item',
            url: '/mui/navigation/links',
          },
          {
            id: 'menus',
            title: 'Menus',
            messageId: 'sidebar.mui.navigation.menus',
            type: 'item',
            url: '/mui/navigation/menus',
          },
          {
            id: 'pagination',
            title: 'Pagination',
            messageId: 'sidebar.mui.navigation.pagination',
            type: 'item',
            url: '/mui/navigation/pagination',
          },
          {
            id: 'speed-dial',
            title: 'Speed Dial',
            messageId: 'sidebar.mui.navigation.speedDial',
            type: 'item',
            url: '/mui/navigation/speed-dial',
          },
          {
            id: 'steppers',
            title: 'Steppers',
            messageId: 'sidebar.mui.navigation.steppers',
            type: 'item',
            url: '/mui/navigation/steppers',
          },
          {
            id: 'tabs',
            title: 'Tabs',
            messageId: 'sidebar.mui.navigation.tabs',
            type: 'item',
            url: '/mui/navigation/tabs',
          },
        ],
      },
      {
        id: 'surface',
        title: 'Surface',
        messageId: 'sidebar.mui.surface',
        type: 'collapse',
        icon: 'surround_sound',
        children: [
          {
            id: 'appBar',
            title: 'App Bar',
            messageId: 'sidebar.mui.surface.appBar',
            type: 'item',
            url: '/mui/surface/appbar',
          },
          {
            id: 'accordion',
            title: 'Accordion',
            messageId: 'sidebar.mui.surface.accordion',
            type: 'item',
            url: '/mui/surface/accordion',
          },
          {
            id: 'cards',
            title: 'Cards',
            messageId: 'sidebar.mui.surface.cards',
            type: 'item',
            url: '/mui/surface/cards',
          },
          {
            id: 'paper',
            title: 'Paper',
            messageId: 'sidebar.mui.surface.paper',
            type: 'item',
            url: '/mui/surface/paper',
          },
        ],
      },
      {
        id: 'feedback',
        title: 'feedback',
        messageId: 'sidebar.mui.feedback',
        type: 'collapse',
        icon: <ImFeed />,
        children: [
          {
            id: 'alert',
            title: 'Alert',
            messageId: 'sidebar.mui.feedback.alert',
            type: 'item',
            url: '/mui/feedback/alert',
          },
          {
            id: 'backdrop',
            title: 'Backdrop',
            messageId: 'sidebar.mui.feedback.backdrop',
            type: 'item',
            url: '/mui/feedback/backdrop',
          },
          {
            id: 'dialog',
            title: 'Dialog',
            messageId: 'sidebar.mui.feedback.dialog',
            type: 'item',
            url: '/mui/feedback/dialog',
          },
          {
            id: 'progress',
            title: 'Progress',
            messageId: 'sidebar.mui.feedback.progress',
            type: 'item',
            url: '/mui/feedback/progress',
          },
          {
            id: 'skeleton',
            title: 'Skeleton',
            messageId: 'sidebar.mui.feedback.skeleton',
            type: 'item',
            url: '/mui/feedback/skeleton',
          },
          {
            id: 'snackbars',
            title: 'Snackbars',
            messageId: 'sidebar.mui.feedback.snackbars',
            type: 'item',
            url: '/mui/feedback/snackbars',
          },
        ],
      },
      {
        id: 'layout',
        title: 'Layout',
        messageId: 'sidebar.mui.layout',
        type: 'collapse',
        icon: <AiOutlineLayout />,
        children: [
          {
            id: 'box',
            title: 'Box',
            messageId: 'sidebar.mui.layout.box',
            type: 'item',
            url: '/mui/layout/box',
          },
          {
            id: 'container',
            title: 'Container',
            messageId: 'sidebar.mui.layout.container',
            type: 'item',
            url: '/mui/layout/container',
          },
          {
            id: 'grid',
            title: 'Grid',
            messageId: 'sidebar.mui.layout.grid',
            type: 'item',
            url: '/mui/layout/grid',
          },
          {
            id: 'stack',
            title: 'Stack',
            messageId: 'sidebar.mui.layout.stack',
            type: 'item',
            url: '/mui/layout/stack',
          },
          {
            id: 'image-list',
            title: 'Image List',
            messageId: 'sidebar.mui.layout.imageList',
            type: 'item',
            url: '/mui/layout/image-list',
          },
          {
            id: 'hidden',
            title: 'Hidden',
            messageId: 'sidebar.mui.layout.hidden',
            type: 'item',
            url: '/mui/layout/hidden',
          },
        ],
      },
      {
        id: 'util',
        title: 'Util',
        messageId: 'sidebar.mui.util',
        type: 'collapse',
        icon: <VscTools />,
        children: [
          {
            id: 'click-away-listener',
            title: 'Click away listener',
            messageId: 'sidebar.mui.util.clickAwayListener',
            type: 'item',
            url: '/mui/utility/click-away-listener',
          },
          {
            id: 'modal',
            title: 'Modal',
            messageId: 'sidebar.mui.util.modal',
            type: 'item',
            url: '/mui/utility/modal',
          },
          {
            id: 'popover',
            title: 'Popover',
            messageId: 'sidebar.mui.util.popover',
            type: 'item',
            url: '/mui/utility/popover',
          },
          {
            id: 'popper',
            title: 'Popper',
            messageId: 'sidebar.mui.util.popper',
            type: 'item',
            url: '/mui/utility/popper',
          },
          {
            id: 'portal',
            title: 'Portal',
            messageId: 'sidebar.mui.util.portal',
            type: 'item',
            url: '/mui/utility/portal',
          },
          {
            id: 'textarea-autosize',
            title: 'Textarea Autosize',
            messageId: 'sidebar.mui.util.textareaAutosize',
            type: 'item',
            url: '/mui/utility/textarea-autosize',
          },
          {
            id: 'transitions',
            title: 'Transitions',
            messageId: 'sidebar.mui.util.transitions',
            type: 'item',
            url: '/mui/utility/transitions',
          },
          {
            id: 'mediaquery',
            title: 'Media query',
            messageId: 'sidebar.mui.util.mediaquery',
            type: 'item',
            url: '/mui/utility/media-query',
          },
        ],
      },
      {
        id: 'data-grid',
        title: 'Data Grid',
        messageId: 'sidebar.mui.dataGrid',
        type: 'collapse',
        icon: <VscTable />,
        children: [
          {
            id: 'overview',
            title: 'Overview',
            messageId: 'sidebar.mui.dataGrid.overview',
            type: 'item',
            url: '/mui/data-grid/overview',
          },
          {
            id: 'layout',
            title: 'Layout',
            messageId: 'sidebar.mui.dataGrid.layout',
            type: 'item',
            url: '/mui/data-grid/layout',
          },
          {
            id: 'columns',
            title: 'Columns',
            messageId: 'sidebar.mui.dataGrid.columns',
            type: 'item',
            url: '/mui/data-grid/columns',
          },
          {
            id: 'rows',
            title: 'Rows',
            messageId: 'sidebar.mui.dataGrid.rows',
            type: 'item',
            url: '/mui/data-grid/rows',
          },
          {
            id: 'editing',
            title: 'Editing',
            messageId: 'sidebar.mui.dataGrid.editing',
            type: 'item',
            url: '/mui/data-grid/editing',
          },
          {
            id: 'sorting',
            title: 'Sorting',
            messageId: 'sidebar.mui.dataGrid.sorting',
            type: 'item',
            url: '/mui/data-grid/sorting',
          },
          {
            id: 'filtering',
            title: 'Filtering',
            messageId: 'sidebar.mui.dataGrid.filtering',
            type: 'item',
            url: '/mui/data-grid/filtering',
          },
          {
            id: 'pagination',
            title: 'Pagination',
            messageId: 'sidebar.mui.dataGrid.pagination',
            type: 'item',
            url: '/mui/data-grid/pagination',
          },
          {
            id: 'selection',
            title: 'Selection',
            messageId: 'sidebar.mui.dataGrid.selection',
            type: 'item',
            url: '/mui/data-grid/selection',
          },
          {
            id: 'events',
            title: 'Events',
            messageId: 'sidebar.mui.dataGrid.events',
            type: 'item',
            url: '/mui/data-grid/events',
          },
          {
            id: 'export',
            title: 'Export',
            messageId: 'sidebar.mui.dataGrid.export',
            type: 'item',
            url: '/mui/data-grid/export',
          },
          {
            id: 'components',
            title: 'Components',
            messageId: 'sidebar.mui.dataGrid.components',
            type: 'item',
            url: '/mui/data-grid/components',
          },
          {
            id: 'styling',
            title: 'Styling',
            messageId: 'sidebar.mui.dataGrid.styling',
            type: 'item',
            url: '/mui/data-grid/styling',
          },
          {
            id: 'localization',
            title: 'localization',
            messageId: 'sidebar.mui.dataGrid.localization',
            type: 'item',
            url: '/mui/data-grid/localization',
          },
          {
            id: 'scrolling',
            title: 'Scrolling',
            messageId: 'sidebar.mui.dataGrid.scrolling',
            type: 'item',
            url: '/mui/data-grid/scrolling',
          },
          {
            id: 'virtualization',
            title: 'Virtualization',
            messageId: 'sidebar.mui.dataGrid.virtualization',
            type: 'item',
            url: '/mui/data-grid/virtualization',
          },
          {
            id: 'accessibility',
            title: 'Accessibility',
            messageId: 'sidebar.mui.dataGrid.accessibility',
            type: 'item',
            url: '/mui/data-grid/accessibility',
          },
        ],
      },
      {
        id: 'lab',
        title: 'Lab',
        messageId: 'sidebar.mui.lab',
        type: 'collapse',
        icon: <ImLab />,
        children: [
          {
            id: 'date-time',
            title: 'Date Time',
            messageId: 'sidebar.mui.lab.dateTime',
            type: 'item',
            url: '/mui/lab/date-picker',
          },
          {
            id: 'date-range-picker',
            title: 'Date Range Picker',
            messageId: 'sidebar.mui.lab.dateRangePicker',
            type: 'item',
            url: '/mui/lab/date-range-picker',
          },
          {
            id: 'date-time-picker',
            title: 'Date Time Picker',
            messageId: 'sidebar.mui.lab.dateTimePicker',
            type: 'item',
            url: '/mui/lab/date-time-picker',
          },
          {
            id: 'time-picker',
            title: 'Time Picker',
            messageId: 'sidebar.mui.lab.timePicker',
            type: 'item',
            url: '/mui/lab/time-picker',
          },
          {
            id: 'masonry',
            title: 'Masonry',
            messageId: 'sidebar.mui.lab.masonry',
            type: 'item',
            url: '/mui/lab/masonry',
          },
          {
            id: 'timeline',
            title: 'Time Line',
            messageId: 'sidebar.mui.lab.timeline',
            type: 'item',
            url: '/mui/lab/timeline',
          },
          {
            id: 'trap-focus',
            title: 'Trap Focus',
            messageId: 'sidebar.mui.lab.trapFocus',
            type: 'item',
            url: '/mui/lab/trap-focus',
          },
          {
            id: 'tree-view',
            title: 'Tree View',
            messageId: 'sidebar.mui.lab.treeView',
            type: 'item',
            url: '/mui/lab/tree-view',
          },
        ],
      },
    ],
  },
  {
    id: 'third-party',
    title: 'Libs',
    messageId: 'sidebar.libs',
    type: 'group',
    children: [
      {
        id: 'google-map',
        title: 'Google Map',
        messageId: 'sidebar.googleMap',
        type: 'item',
        icon: <FiMap />,
        url: '/third-party/google-map',
      },
      {
        id: 'recharts',
        title: 'Recharts',
        messageId: 'sidebar.recharts',
        type: 'collapse',
        icon: 'bar_chart',
        children: [
          {
            id: 'area',
            title: 'Area Chart',
            messageId: 'sidebar.recharts.areaChart',
            type: 'item',
            url: '/recharts/area',
          },
          {
            id: 'bar',
            title: 'Bar Chart',
            messageId: 'sidebar.recharts.barChart',
            type: 'item',
            url: '/recharts/bar',
          },
          {
            id: 'composed',
            title: 'Composed Chart',
            messageId: 'sidebar.recharts.composedChart',
            type: 'item',
            url: '/recharts/composed',
          },
          {
            id: 'line',
            title: 'Line Chart',
            messageId: 'sidebar.recharts.lineChart',
            type: 'item',
            url: '/recharts/line',
          },
          {
            id: 'pie',
            title: 'Pie Chart',
            messageId: 'sidebar.recharts.pieChart',
            type: 'item',
            url: '/recharts/pie',
          },
          {
            id: 'radar',
            title: 'Radar Chart',
            messageId: 'sidebar.recharts.radarChart',
            type: 'item',
            url: '/recharts/radar',
          },
          {
            id: 'radial',
            title: 'Radial Chart',
            messageId: 'sidebar.recharts.radialChart',
            type: 'item',
            url: '/recharts/radial',
          },
          {
            id: 'scatter',
            title: 'Scatter Chart',
            messageId: 'sidebar.recharts.scatterChart',
            type: 'item',
            url: '/recharts/scatter',
          },
          {
            id: 'funnel',
            title: 'Funnel Chart',
            messageId: 'sidebar.recharts.funnelChart',
            type: 'item',
            url: '/recharts/funnel',
          },
          {
            id: 'treemap',
            title: 'Treemap Chart',
            messageId: 'sidebar.recharts.treeChart',
            type: 'item',
            url: '/recharts/treemap',
          },
        ],
      },
      {
        id: 'calendar',
        title: 'Big Calendar',
        messageId: 'sidebar.bigCalender',
        icon: <FaRegCalendarAlt />,
        type: 'item',
        url: '/third-party/calendar',
      },
      {
        id: 'slider',
        title: 'React Slick',
        messageId: 'sidebar.reactSlick',
        icon: <BiCarousel />,
        type: 'item',
        url: '/third-party/slider',
      },
      {
        id: 'react-color',
        title: 'React Color',
        messageId: 'sidebar.reactColor',
        type: 'item',
        icon: 'invert_colors',
        url: '/third-party/react-color',
      },
      {
        id: 'react-dropzone',
        title: 'React Dropzone',
        messageId: 'sidebar.reactDropzone',
        type: 'item',
        icon: 'attach_file',
        url: '/third-party/react-dropzone',
      },
      {
        id: 'react-player',
        title: 'Player',
        messageId: 'sidebar.player',
        type: 'item',
        icon: <DiHtml5Multimedia />,
        url: '/third-party/react-player',
      },
      {
        id: 'timeline',
        title: 'Time Line',
        messageId: 'sidebar.pages.timeLine',
        type: 'item',
        icon: 'timeline',
        url: '/third-party/time-line',
      },
    ],
  },
  {
    id: 'extra-pages',
    title: 'Extra Pages',
    messageId: 'sidebar.pages.extraPages',
    type: 'group',
    children: [
      {
        id: 'account',
        title: 'Account',
        messageId: 'sidebar.pages.extraPages.account',
        type: 'item',
        icon: <MdOutlineManageAccounts />,
        url: '/my-account',
      },
      {
        id: 'about-us',
        title: 'About Us',
        messageId: 'sidebar.pages.extraPages.aboutUs',
        type: 'item',
        icon: <FiUsers />,
        url: '/extra-pages/about-us',
      },
      {
        id: 'contact-us',
        title: 'Contact Us',
        messageId: 'sidebar.pages.extraPages.contactUs',
        type: 'item',
        icon: <MdOutlineContactSupport />,
        url: '/extra-pages/contact-us',
      },
      {
        id: 'portfolio',
        title: 'Portfolio',
        messageId: 'sidebar.pages.extraPages.portfolio',
        type: 'item',
        icon: <BsBriefcase />,
        url: '/extra-pages/portfolio',
      },
      {
        id: 'faq',
        title: 'FAQ',
        messageId: 'sidebar.pages.extraPages.faq',
        type: 'item',
        icon: <BsQuestionDiamond />,
        url: '/extra-pages/faq',
      },
      {
        id: 'pricing',
        title: 'Pricing',
        messageId: 'sidebar.pages.extraPages.pricing',
        type: 'item',
        icon: 'attach_money',
        url: '/extra-pages/pricing',
      },
      {
        id: 'user',
        title: 'User Pages',
        messageId: 'sidebar.pages.userPages',
        type: 'collapse',
        icon: <RiShieldUserLine />,
        children: [
          {
            id: 'sign-in-1',
            title: 'SignIn-1',
            messageId: 'sidebar.pages.userPages.signIn1',
            type: 'item',
            url: '/user/sign-in-1',
          },
          {
            id: 'sign-in-2',
            title: 'SignIn-2',
            messageId: 'sidebar.pages.userPages.signIn2',
            type: 'item',
            url: '/user/sign-in-2',
          },
          {
            id: 'sign-up-1',
            title: 'SignUp-1',
            messageId: 'sidebar.pages.userPages.signUp1',
            type: 'item',
            url: '/user/sign-up-1',
          },
          {
            id: 'sign-up-2',
            title: 'SignUp-2',
            messageId: 'sidebar.pages.userPages.signUp2',
            type: 'item',
            url: '/user/sign-up-2',
          },
          {
            id: 'forgot-password-1',
            title: 'Forgot Password-1',
            messageId: 'sidebar.pages.userPages.forgetPassword1',
            type: 'item',
            url: '/user/forgot-password-1',
          },
          {
            id: 'forgot-password-2',
            title: 'Forgot Password-2',
            messageId: 'sidebar.pages.userPages.forgetPassword2',
            type: 'item',
            url: '/user/forgot-password-2',
          },
          {
            id: 'reset-password-1',
            title: 'Reset Password-1',
            messageId: 'sidebar.pages.userPages.resetPassword1',
            type: 'item',
            url: '/user/reset-password-1',
          },
          {
            id: 'reset-password-2',
            title: 'Reset Password-2',
            messageId: 'sidebar.pages.userPages.resetPassword2',
            type: 'item',
            url: '/user/reset-password-2',
          },
          {
            id: 'lock-1',
            title: 'Lock Screen-1',
            messageId: 'sidebar.pages.userPages.lockScreen1',
            type: 'item',
            url: '/user/lock-1',
          },
          {
            id: 'lock-2',
            title: 'Lock Screen-2',
            messageId: 'sidebar.pages.userPages.lockScreen2',
            type: 'item',
            url: '/user/lock-2',
          },
        ],
      },
      {
        id: 'list-type',
        title: 'User List',
        messageId: 'sidebar.pages.userList',
        type: 'collapse',
        icon: <AiOutlineUnorderedList />,
        children: [
          {
            id: 'morden',
            title: 'Modern',
            messageId: 'sidebar.pages.userList.modern',
            type: 'item',
            url: '/list-type/morden',
          },
          {
            id: 'standard',
            title: 'Standard',
            messageId: 'sidebar.pages.userList.standard',
            type: 'item',
            url: '/list-type/standard',
          },
          {
            id: 'flat',
            title: 'Flat',
            messageId: 'sidebar.pages.userList.flat',
            type: 'item',
            url: '/list-type/flat',
          },
        ],
      },
      {
        id: 'error-pages',
        title: 'Error Pages',
        messageId: 'sidebar.pages.errorPages',
        type: 'collapse',
        icon: <BiErrorAlt />,
        children: [
          {
            id: 'error-401',
            title: '402',
            messageId: 'sidebar.pages.errorPages.401',
            type: 'item',
            url: '/error-pages/error-401',
          },
          {
            id: 'error-403',
            title: '403',
            messageId: 'sidebar.pages.errorPages.403',
            type: 'item',
            url: '/error-pages/error-403',
          },
          {
            id: 'error-404',
            title: '404',
            messageId: 'sidebar.pages.errorPages.404',
            type: 'item',
            url: '/error-pages/error-404',
          },
          {
            id: 'error-500',
            title: '500',
            messageId: 'sidebar.pages.errorPages.500',
            type: 'item',
            url: '/error-pages/error-500',
          },
          {
            id: 'error-503',
            title: '503',
            messageId: 'sidebar.pages.errorPages.503',
            type: 'item',
            url: '/error-pages/error-503',
          },
          {
            id: 'maintenance',
            title: 'Maintenance',
            messageId: 'sidebar.pages.errorPages.maintenance',
            type: 'item',
            url: '/error-pages/maintenance',
          },
          {
            id: 'coming-soon',
            title: 'Coming Soon',
            messageId: 'sidebar.pages.errorPages.comingSoon',
            type: 'item',
            url: '/error-pages/coming-soon',
          },
        ],
      },
    ],
  },
];
export default routesConfig;
