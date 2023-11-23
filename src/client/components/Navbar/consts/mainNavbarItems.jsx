import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DnsIcon from '@mui/icons-material/Dns';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: 'Home',
    route: 'home',
  },
  {
    id: 1,
    icon: <DnsIcon />,
    label: 'Dashboard',
    route: 'dashboard',
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: 'Cluster Map',
    route: 'cluster-map',
  },
  // {
  //   id: 3,
  //   icon: <PublicIcon />,
  //   label: 'Queries',
  //   route: 'queries',
  // },
  // {
  //   id: 4,
  //   icon: <SettingsEthernetIcon />,
  //   label: 'Alerts',
  //   route: 'alerts',
  // },
  // {
  //   id: 5,
  //   icon: <SettingsInputComponentIcon />,
  //   label: 'OpenFaaS',
  //   route: 'OpenFaaS Cost',
  // },
];
