import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
// import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
// import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DnsIcon from '@mui/icons-material/Dns';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: 'Home',
    route: '/main-page/home',
  },
  {
    id: 1,
    icon: <DnsIcon />,
    label: 'Dashboard',
    route: '/main-page/dashboard',
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: 'Cluster Map',
    route: '/main-page/cluster-view',
  },
  {
    id: 3,
    icon: <PublicIcon />,
    label: 'Alerts',
    route: '/main-page/alerts',
  },
  {
    id: 4,
    icon: <AssignmentIcon />,
    label: 'Login',
    route: '/main-page/login',
  },
  // {
  //   id: 5,
  //   icon: <SettingsEthernetIcon />,
  //   label: 'Main',
  //   route: 'main-page',
  // },
  // {
  //   id: 5,
  //   icon: <SettingsInputComponentIcon />,
  //   label: 'OpenFaaS',
  //   route: 'OpenFaaS Cost',
  // },
];
