/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Button, Typography, Divider, MenuItem, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-ic/arrow-drop-down';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import contentCopy from '@iconify/icons-ic/content-copy';
import closeFill from '@iconify/icons-eva/close-fill';
import { PeraWalletConnect } from '@perawallet/connect';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { getEllipsisTxt, tokenValue } from '../../helpers/formatters';
import { MHidden, MIconButton } from '../@material-extend';

import useSettings from '../../hooks/useSettings';
import useGetAccountDetailRequest from '../../hooks/useGetAccountDetailRequest';
import { getAccountBalance, getAssetByID } from '../../utils/accountUtils';
import MenuPopover from '../MenuPopover';

import PeraConnectWhiteIcon from './WalletIcons/pera-connect-white.png';
import PeraConnectBlackIcon from './WalletIcons/pera-connect-black.png';
import WalletConnectIcon from './WalletIcons/wallet-connect.svg';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    flexGrow: '0!important',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    flexGrow: '0!important',
    padding: 0,
    borderRadius: '20px'
  }
}));

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24
  },
  account: {
    height: '42px',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: '12px',
    backgroundColor: 'rgb(244, 244, 244)',
    cursor: 'pointer'
  },
  text: {
    color: '#21BF96'
  },
  connector: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px 5px',
    cursor: 'pointer',
    width: '150px'
  },
  icon: {
    alignSelf: 'center',
    fill: 'rgb(40, 13, 95)',
    flexShrink: '0',
    marginBottom: '8px',
    height: '30px'
  }
};

export default function Account() {
  const { themeMode } = useSettings();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [balanceList, setBalanceList] = useState([]);
  const anchorRef = useRef(null);

  const handleWalletConnect = (connectorId) => {
    switch (connectorId) {
      case 'peraconnect':
        peraWalletConnect();
        break;
      case 'walletconnect':
        walletConnect();
        break;
      default:
        break;
    }
  };

  const connectors = [
    {
      title: 'PeraConnect',
      icon: themeMode === 'light' ? PeraConnectBlackIcon : PeraConnectWhiteIcon,
      connectorId: 'peraconnect',
      priority: 1
    },
    {
      title: 'WalletConnect',
      icon: WalletConnectIcon,
      connectorId: 'walletconnect',
      priority: 2
    }
  ];

  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;
  const peraWallet = new PeraWalletConnect();

  const { accountInformationState, refetchAccountDetail } = useGetAccountDetailRequest({
    chain: 'mainnet',
    accountAddress: accountAddress || ''
  });

  useEffect(() => {
    const handleAssets = async () => {
      const newArr = await Promise.all(
        accountInformationState.data.assets.map(async (item) => {
          const assetInfo = await getAssetByID(item['asset-id']);
          return {
            ...item,
            params: assetInfo.asset.params
          };
        })
      );
      setBalanceList(...balanceList, newArr);
    };
    if (accountInformationState.data) {
      handleAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInformationState]);

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', peraWalletDisconnect);
        handleSetLog('Connected to Pera Wallet');
        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const peraWalletConnect = async () => {
    await peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', peraWalletDisconnect);
        handleSetLog('Connected to Pera Wallet');
        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error);
        }
      });
  };

  const peraWalletDisconnect = () => {
    peraWallet.disconnect();
    handleSetLog('Disconnected to Pera Wallet');
    setAccountAddress(null);
  };

  const copyToClipboard = (copyText) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(
        () => {
          enqueueSnackbar('Copy to clipboard', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      const el = document.createElement('textarea');
      el.value = copyText;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);

      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };
  const handleSetLog = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };
  // WalletConnect
  const bridge = 'https://bridge.walletconnect.org';
  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
  const [wConnector, setWConnector] = useState(null);
  useEffect(() => {
    setWConnector(connector);
  }, []);

  const walletConnect = async () => {
    if (connector.connected) {
      await connector.createSession();
    }
  };

  return (
    <>
      {!isConnectedToPeraWallet ? (
        <>
          <MHidden width="smDown">
            <Button
              onClick={() => setIsAuthModalVisible(true)}
              variant="contained"
              className="bto"
              sx={{
                fontSize: { xs: '10px', md: '12px' },
                fontFamily: 'Poppins',
                width: { xs: 'auto', md: 'auto' },
                fontWeight: 500,
                borderRadius: '8px',
                boxShadow: 'none',
                background: themeMode === 'dark' ? 'white' : 'black',
                color: themeMode === 'dark' ? 'black' : 'white',
                padding: '8px 10px',
                '&:hover': {
                  background: themeMode === 'dark' ? 'white' : 'black',
                  opacity: '80%'
                }
              }}
            >
              Connect Wallet
            </Button>
          </MHidden>
          <Modal
            className={classes.modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isAuthModalVisible}
            onClose={() => setIsAuthModalVisible(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={isAuthModalVisible} style={{ zIndex: 1 }} className={classes.paper}>
              <div
                style={{
                  background: themeMode === 'dark' ? 'black' : 'white',
                  padding: '12px'
                }}
              >
                <div id="transition-modal-title" style={{ textAlign: 'center', fontSize: '20px' }}>
                  {' '}
                  Wallet Connect
                </div>
                <div id="transition-modal-description">
                  <div
                    role="menu"
                    style={{
                      display: 'flex',
                      width: '400px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {connectors.map(({ title, icon, connectorId }, key) => (
                      <div
                        style={styles.connector}
                        role="menuitem"
                        tabIndex={key}
                        key={key}
                        onKeyDown={() => {}}
                        onClick={() => handleWalletConnect(connectorId)}
                      >
                        <img src={icon} alt={title} style={styles.icon} />
                        <p style={{ fontSize: '14px' }}>{title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </>
      ) : (
        <>
          <Box sx={{ position: 'relative' }}>
            <Button
              onClick={() => {
                setDropdown(!dropdown);
              }}
              ref={anchorRef}
              variant="contained"
              sx={{
                fontSize: { xs: '10px', md: '12px' },
                fontFamily: 'Poppins',
                width: { xs: 'auto', md: 'auto' },
                fontWeight: 500,
                borderRadius: '8px',
                boxShadow: 'none',
                background: themeMode === 'dark' ? 'white' : 'black',
                color: themeMode === 'dark' ? 'black' : 'white',
                padding: '8px 16px',
                paddingLeft: '24px',
                '&:hover': {
                  background: themeMode === 'dark' ? 'white' : 'black',
                  opacity: '80%'
                }
              }}
            >
              {getEllipsisTxt(accountAddress, 6)} <Icon icon={homeFill} fontSize={20} />
            </Button>
            <MenuPopover
              open={dropdown}
              onClose={() => setDropdown(false)}
              anchorEl={anchorRef.current}
              sx={{ width: 300 }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ my: 1.5, px: 2.5, cursor: 'pointer' }}
                onClick={() => copyToClipboard(accountAddress)}
              >
                <Icon icon={contentCopy} fontSize={25} />
                <Box>
                  <Typography variant="subtitle1" noWrap>
                    {getEllipsisTxt(accountAddress, 6)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    Copy account address
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              {accountInformationState.data && (
                <>
                  <MenuItem sx={{ typography: 'body2', py: 1, px: 2.5 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
                      <Box display="flex" alignItems="center">
                        <Box
                          component="img"
                          src="/static/token/algo.png"
                          alt="Algorand's logo"
                          sx={{
                            mr: 2,
                            width: 24,
                            height: 24
                          }}
                        />
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1" noWrap>
                              Algorand
                            </Typography>
                            <Tooltip title="Trusted asset by Pera" arrow>
                              <Box
                                component="img"
                                src="/static/token/trust.svg"
                                alt="Trust logo"
                                sx={{
                                  width: 16,
                                  height: 16
                                }}
                              />
                            </Tooltip>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            $ALGO
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="flex-end" justifyContent="center" flexDirection="column">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {tokenValue(getAccountBalance(accountInformationState.data.amount), 3)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          ≈ $0
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  {balanceList.map((item) => (
                    <MenuItem key={item['asset-id']} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
                        <Box display="flex" alignItems="center">
                          <Box
                            component="img"
                            src={`/static/token/${item['asset-id']}.png`}
                            alt="Asset logo"
                            sx={{
                              mr: 2,
                              width: 24,
                              height: 24
                            }}
                          />
                          <Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="subtitle1" noWrap>
                                {item.params.name}
                              </Typography>
                              <Tooltip title="Trusted asset by Pera" arrow>
                                <Box
                                  component="img"
                                  src="/static/token/trust.svg"
                                  alt="Asset logo"
                                  sx={{
                                    width: 16,
                                    height: 16
                                  }}
                                />
                              </Tooltip>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                              ${item.params['unit-name']} - {item['asset-id']}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="flex-end" justifyContent="center" flexDirection="column">
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {tokenValue(item.amount, item.params.decimals)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            ≈ $0
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </>
              )}
              <Box sx={{ p: 2, pt: 1.5 }}>
                <Button fullWidth color="inherit" variant="outlined" onClick={peraWalletDisconnect}>
                  Disconnect
                </Button>
              </Box>
            </MenuPopover>
          </Box>
        </>
      )}
    </>
  );
}
