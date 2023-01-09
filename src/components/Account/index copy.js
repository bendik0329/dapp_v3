/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Box, Button, AppBar, Toolbar, Container, Typography, Grid } from '@material-ui/core';
import { experimentalStyled as styled, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-ic/arrow-drop-down';
import tick from '@iconify/icons-ant-design/check-circle-filled';
import logoutBtn from '@iconify/icons-ant-design/poweroff';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
import axios from 'axios';
import crypto from 'crypto';
import { PeraWalletConnect } from '@perawallet/connect';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { convertUtf8ToHex } from '@walletconnect/utils';
import { IInternalEvent } from '@walletconnect/types';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { getEllipsisTxt } from '../../helpers/formatters';
import { MHidden } from '../@material-extend';
import useSettings from '../../hooks/useSettings';
// import { connectors } from './config';
import UserPool from '../Auth/UserPool';

import PeraConnectWhiteIcon from './WalletIcons/pera-connect-white.png';
import PeraConnectBlackIcon from './WalletIcons/pera-connect-black.png';
import WalletConnectIcon from './WalletIcons/wallet-connect.svg';

const useStyles = makeStyles((theme) => ({
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

const API_TOKEN = '9db5ac23-8175-4f0c-8d75-151ebe7f98b5';
const API_SECRET = '0e0f46fe-0f3b-4288-8fe9-9e4b4e4ceb7f';

export function generateSignature(payloadAsString, apiPrivateKey) {
  const signature = crypto
    .createHmac('sha256', apiPrivateKey)
    .update(Buffer.from(payloadAsString, 'utf8'))
    .digest('hex')
    .toLowerCase();
  console.log('X-HMAC-SIGNATURE', signature);
  return signature;
}

export default function Account() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('user_data'));
  const { themeMode, onChangeMode } = useSettings();
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [verified, setVerified] = useState(false);
  const [veiffApprovalStatus, setVeriffStatus] = useState(null);
  const [veiffToken, setVeriffToken] = useState(null);
  const [veiffUrl, setVeriffUrl] = useState(null);

  const classes = useStyles();
  useEffect(() => {
    // console.log("test", !isAuthenticated || !account);
    checkVeiffStatus();
  }, [isAuthenticated]);

  // handle wallet connect
  const [connectState, setConnectState] = useState({
    connected: false,
    connecttorId: '',
    chainId: '',
    address: '',
    accounts: ''
  });
  const handleWalletConnect = (connectorId) => {
    console.log('connectorId:', connectorId);
    window.localStorage.setItem('connectorId', connectorId);
    switch (connectorId) {
      case 'peraconnect':
        console.log('pera connect');
        peraWalletConnect();
        break;
      case 'walletconnect':
        console.log('wallet connect');
        walletConnect();
        break;
      default:
        break;
    }
  };

  // Pera wallet connect
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

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', peraWalletDisconnect);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const peraWalletConnect = () => {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', peraWalletDisconnect);

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
    setAccountAddress(null);
  };

  // WalletConnect
  const bridge = 'https://bridge.walletconnect.org';
  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
  const [wConnector, setWConnector] = useState(null);
  useEffect(() => {
    setWConnector(connector);
  }, []);

  const walletConnect = async () => {
    console.log('wallet connect part->>>>>>>');
    console.log(wConnector);
    console.log(wConnector.connected);
    if (connector.connected) {
      await connector.createSession();
    }
  };

  const updateVeriffStatusOnLivePool = (name, value) => {
    // Update attribute
    const attributes = [new CognitoUserAttribute({ Name: name, Value: value })];
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      const getSession = async () => {
        await new Promise((res) => cognitoUser.getSession(res));
        cognitoUser.updateAttributes(attributes, (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          console.log('call result: ', result);
        });
      };
      getSession();
    }
  };

  const PreviousSession = () => {
    const sessionID = veiffToken;
    const sessionUrl = veiffUrl;
    // console.log(sessionID, sessionUrl)
    // console.log(sessionID, " - ",sessionUrl)
    createVeriffFrame({
      url: sessionUrl,
      branding: {
        themeColor: 'red'
      },
      onEvent: (msg) => {
        switch (msg) {
          case MESSAGES.CANCELED:
            //
            break;
          case MESSAGES.FINISHED:
            fetch(`https://stationapi.veriff.com/v1/sessions/${sessionID}/decision`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'X-AUTH-CLIENT': API_TOKEN,
                'X-HMAC-SIGNATURE': generateSignature(sessionID, API_SECRET)
              }
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                if (data.status === 'success') {
                  setVeriffStatus(data.verification.status);
                  // update user pool
                  updateVeriffStatusOnLivePool('custom:status_veriff', data.verification.status);
                  localStorage.setItem('veriffVerified', data.verification.status);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          default:
        }
      }
    });
  };
  const toggleVerified = () => {
    setVerified(!verified);
  };

  const checkVeiffStatus = async () => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser) {
      await new Promise((res) => cognitoUser.getSession(res));
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }

        // Extracting attributes
        result.map((item) => {
          // Extract status
          if (item.getName() === 'custom:status_veriff') {
            setVeriffStatus(item.getValue());
          }
          if (item.getName() === 'custom:veriff_tokens') {
            setVeriffToken(item.getValue());
          }
          if (item.getName() === 'custom:veriff') {
            setVeriffUrl(item.getValue());
          }
          return console.log('Done');
        });
        // console.log('veriffStatus', veriffStatus)
      });
    }
  };

  const proceedKyc = () => {
    // console.log('veiffApprovalStatus', veiffUrl)
    // console.log('veiffToken', veiffToken)

    const CurrentUser = UserPool.getCurrentUser();
    const userName = 'Social User';
    if (CurrentUser) {
      const userName = CurrentUser.getUsername();
    }

    console.log('userName', userName);
    if (veiffApprovalStatus === null) {
      // New Session
      if (veiffToken === null && veiffUrl === null) {
        const nows = new Date();
        const dateString = nows.toISOString();
        const info = JSON.stringify({
          verification: {
            callback: 'https://veriff.com',
            person: {
              firstName: ' ',
              lastName: ' ',
              idNumber: userName
            },
            vendorData: ' ',
            timestamp: dateString
          }
        });
        const headers = {
          'content-type': 'application/json',
          'X-AUTH-CLIENT': API_TOKEN
        };

        axios
          .post('https://stationapi.veriff.com/v1/sessions', info, { headers })
          .then((response) => {
            console.log('hre', response.data);
            if (response.data.status === 'success') {
              localStorage.setItem('veriff_data', JSON.stringify(response));
              const sessionUrl = response.data.verification.url;
              const sessionID = response.data.verification.id;
              setVeriffToken(sessionID);
              setVeriffUrl(sessionUrl);
              // update user pool
              updateVeriffStatusOnLivePool('custom:veriff_tokens', sessionID);
              updateVeriffStatusOnLivePool('custom:veriff', sessionUrl);
              createVeriffFrame({
                url: sessionUrl,
                onEvent: (msg) => {
                  switch (msg) {
                    case MESSAGES.CANCELED:
                      //
                      break;
                    case MESSAGES.FINISHED:
                      fetch(`https://stationapi.veriff.com/v1/sessions/${sessionID}/decision`, {
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'X-AUTH-CLIENT': API_TOKEN,
                          'X-HMAC-SIGNATURE': generateSignature(sessionID, API_SECRET)
                        }
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log('Success:', data);
                        })
                        .catch((error) => {
                          console.error('Error:', error);
                        });
                      break;
                    default:
                  }
                }
              });
            }
          })
          .catch((error) => {
            console.error('There was an error!', error);
          });
      } else {
        console.log('Going for previous');
        // window.location.href=JSON.parse(localStorage.getItem('veriff_data')).verification.url
        PreviousSession();
      }
    } else {
      toggleVerified();
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Typography
          display="flex"
          style={{ cursor: 'pointer' }}
          alignItems="center"
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          Account <Icon icon={homeFill} fontSize={32} style={{ marginRight: 12 }} />
        </Typography>
        {dropdown && (
          <Grid
            container
            sx={{
              display: dropdown ? 'flex' : 'none',
              position: 'absolute',
              flexDirection: 'row',
              minWidth: { xs: 'calc(100vw)', md: '400px' },
              right: { xs: '-50%', md: '-115%' },
              padding: { xs: 2, md: 1 },
              paddingRight: '0 !important',
              marginTop: { xs: '20px', md: '0' },
              background: {
                xs: themeMode === 'dark' ? '#141721' : '#f5f5f5',
                md: themeMode === 'dark' ? '#141721a3' : '#f5f5f59c'
              }
            }}
          >
            <Grid
              item
              xs={6}
              md={6}
              display="flex !important"
              flexDirection="column !important"
              width="fit-content !important"
            >
              <Typography
                style={{
                  fontFamily: 'Public Sans !important',
                  fontWeight: '400 !important',
                  fontSize: '1rem !important',
                  lineHeight: '1.5 !important'
                }}
              >
                Features
              </Typography>
              <Box marginTop={2} display="flex" alignItems="flex-start" gap={1}>
                <Box
                  sx={{ color: 'red' }}
                  component="img"
                  src={themeMode === 'dark' ? '/static/safe.svg' : '/static/safe-dark.svg'}
                  width="30px !important"
                />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins !important',
                      fontStyle: 'normal !important',
                      fontWeight: 400,
                      fontSize: '12px !important',
                      lineHeight: '16px !important',
                      letterSpacing: ' 0.02em !important'
                    }}
                  >
                    Asset Custody
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins !important',
                      fontStyle: 'normal !important',
                      fontWeight: 400,
                      fontSize: '11px !important',
                      lineHeight: '15px !important',
                      letterSpacing: ' 0.02em !important',
                      color: '#B4B4B8 !important'
                    }}
                  >
                    Delegate your assets custody
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={1} marginTop={2}>
                <Box
                  sx={{ color: 'red' }}
                  component="img"
                  src={themeMode === 'dark' ? '/static/kyc.svg' : '/static/kyc-dark.svg'}
                  width="30px !important"
                />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins !important',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '12px  !important',
                      lineHeight: '16px  !important',
                      letterSpacing: ' 0.02em  !important'
                    }}
                  >
                    Identity Verification
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins !important',
                      fontStyle: 'normal !important',
                      fontWeight: 400,
                      fontSize: '11px !important',
                      lineHeight: '15px !important',
                      letterSpacing: ' 0.02em !important',
                      color: '#B4B4B8 !important',
                      maxWidth: '120px'
                    }}
                  >
                    Increase the security of your account
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box component="img" src="/static/drop-img.png" width="100%" sx={{ borderRadius: '10px' }} />
              <Typography
                sx={{
                  fontFamily: 'Poppins !important',
                  fontStyle: 'normal !important',
                  fontWeight: '400 !important',
                  fontSize: '11px !important',
                  marginTop: '10px !important',
                  lineHeight: '15px !important',
                  letterSpacing: ' 0.02em !important',
                  textAlign: 'center !important'
                }}
              >
                Sign up to access more features
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  marginTop: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                {isLogin ? (
                  <Button
                    variant="contained"
                    onClick={proceedKyc}
                    className="bto"
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      fontFamily: 'Poppins',
                      width: { xs: 'auto', md: 'auto' },
                      fontWeight: 500,
                      borderRadius: '8px',
                      minWidth: 'unset  !important',
                      boxShadow: 'none',
                      background: themeMode === 'dark' ? 'white' : 'black',
                      color: themeMode === 'dark' ? 'black' : 'white',
                      padding: '5px 10px !important',
                      '&:hover': {
                        background: themeMode === 'dark' ? 'white' : 'black',
                        opacity: '80%'
                      },
                      position: 'relative'
                    }}
                  >
                    KYC
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    href="/auth/register"
                    className="bto"
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      fontFamily: 'Poppins',
                      minWidth: 'unset  !important',
                      width: { xs: 'auto', md: 'auto' },
                      fontWeight: 500,
                      borderRadius: '8px',
                      boxShadow: 'none',
                      background: themeMode === 'dark' ? 'white' : 'black',
                      color: themeMode === 'dark' ? 'black' : 'white',
                      padding: '5px 10px !important',
                      '&:hover': {
                        background: themeMode === 'dark' ? 'white' : 'black',
                        opacity: '80%'
                      }
                    }}
                  >
                    Sign up
                  </Button>
                )}

                <Button
                  variant="contained"
                  href={isLogin ? 'app.equityswap.io/custody' : '/auth/login'}
                  className="bto"
                  sx={{
                    fontSize: { xs: '10px', md: '12px' },
                    fontFamily: 'Poppins',
                    width: { xs: 'auto', md: 'auto' },
                    minWidth: 'unset  !important',
                    fontWeight: 500,
                    borderRadius: '8px',
                    boxShadow: 'none',
                    background: themeMode === 'dark' ? 'white' : 'black',
                    color: themeMode === 'dark' ? 'black' : 'white',
                    padding: '5px 10px',
                    '&:hover': {
                      background: themeMode === 'dark' ? 'white' : 'black',
                      opacity: '80%'
                    }
                  }}
                >
                  {isLogin ? 'Custody' : 'Login'}
                </Button>
                {isLogin && (
                  <Button
                    variant="contained"
                    onClick={async () => {
                      setIsLogin(false);
                      window.localStorage.removeItem('user_data');
                      const user = UserPool.getCurrentUser();
                      if (user) {
                        user.signOut();
                      }
                    }}
                    href="#"
                    className="bto"
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      fontFamily: 'Poppins',
                      width: { xs: 'auto', md: 'auto' },
                      fontWeight: 500,
                      minWidth: '30px !important',
                      borderRadius: '8px',
                      boxShadow: 'none',
                      background: themeMode === 'dark' ? 'white' : 'black',
                      color: themeMode === 'dark' ? 'black' : 'white',
                      padding: '5px 5px',
                      '&:hover': {
                        background: themeMode === 'dark' ? 'white' : 'black',
                        opacity: '80%'
                      }
                    }}
                  >
                    <Icon icon={logoutBtn} fontSize={18} style={{ cursor: 'pointer' }} />
                  </Button>
                )}
              </Box>
              {verified && (
                <Box
                  style={{
                    background: '#fff',
                    borderRadius: '5px',
                    padding: '5px',
                    fontSize: '14px',
                    minWidth: 'unset  !important',
                    color: '#000',
                    marginTop: '10px',
                    textAlign: 'center'
                  }}
                >
                  You are verified{' '}
                  <Icon icon={tick} fontSize={18} style={{ marginLeft: 1, color: 'green', marginBottom: '-3px' }} />
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
      {!account ? (
        <>
          <MHidden width="mdDown">
            <Button
              onClick={() => setIsAuthModalVisible(true)}
              variant="contained"
              // href="#"
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
          <Button
            onClick={() => setIsModalVisible(true)}
            variant="contained"
            href="#"
            className="bto"
            sx={{
              fontSize: { xs: '10px', md: '12px' },
              fontFamily: 'Poppins',
              width: { xs: 'auto', md: 'auto' },
              fontWeight: 400,
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
            {getEllipsisTxt(account, 6)}
          </Button>
          <Modal
            className={classes.modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={isModalVisible} style={{ zIndex: 1 }} className={classes.paper}>
              <div
                style={{
                  background: themeMode === 'dark' ? 'white' : 'black',
                  padding: '12px'
                }}
              >
                {/* <div id='transition-modal-title' style={{textAlign: 'center', fontSize: '20px'}}> Wallet Connect</div> */}
                <div id="transition-modal-description">
                  <Button
                    className="bto"
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      fontFamily: 'Poppins',
                      width: { xs: 'auto', md: 'auto' },
                      fontWeight: 400,
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
                    onClick={async () => {
                      await logout();
                      window.localStorage.removeItem('connectorId');
                      setIsModalVisible(false);
                    }}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
}
