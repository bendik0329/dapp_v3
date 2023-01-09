import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';

// ----------------------------------------------------------------------
const link1 = '/#websection';
const baseUrl = window.location.origin.toString();
const url = baseUrl + link1;
const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Fiat',
    path: 'fiat',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  {
    title: 'Swap',
    path: 'swap',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  {
    title: 'Invest',
    path: 'invest',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  // {
  //   title: 'Resources',
  //   path: '#',
  //   icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  //   children: [
  //     { title: 'Whitepaper', path: '#' },
  //     { title: 'Economics paper', path: '#' },
  //     { title: 'Token Metrics', path: '/tokenomics' },
  //     { title: 'Ecosystem', path: '/ecosystem' }
  //   ]
  // },
  {
    title: 'Stake',
    path: 'stake',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  }
];

export default menuConfig;
