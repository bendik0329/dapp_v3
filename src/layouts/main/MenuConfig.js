import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';

// ----------------------------------------------------------------------
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
  {
    title: 'Stake',
    path: 'stake',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  }
];

export default menuConfig;
