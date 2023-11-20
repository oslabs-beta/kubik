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
    label: 'Authentication',
    route: 'authentication',
  },
  {
    id: 1,
    icon: <DnsIcon />,
    label: 'Database',
    route: 'database',
  },
  {
    id: 2,
    icon: <ImageIcon />,
    label: 'Storage',
    route: 'storage',
  },
  {
    id: 3,
    icon: <PublicIcon />,
    label: 'Hosting',
    route: 'hosting',
  },
  {
    id: 4,
    icon: <SettingsEthernetIcon />,
    label: 'Functions',
    route: 'functions',
  },
  {
    id: 5,
    icon: <SettingsInputComponentIcon />,
    label: 'Machine learning',
    route: 'machine-learning',
  },
];
