/* eslint-disable prettier/prettier */
import PeraConnectWhite from './WalletIcons/pera-connect-white.png';
// import PeraConnectBlack from './WalletIcons/pera-connect-black.png';
import WalletConnect from './WalletIcons/wallet-connect.svg';

export const connectors = [
  {
    title: 'PeraConnect',
    // icon: themeMode === 'light' ? PeraConnectBlack : PeraConnectWhite,
    icon: PeraConnectWhite,
    connectorId: 'peraconnect',
    priority: 1
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: 'walletconnect',
    priority: 2
  }
];
