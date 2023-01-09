/* eslint-disable prettier/prettier */
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { Box, AppBar, Toolbar, Container } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// hooks
// components
import { MHidden } from '../../components/@material-extend';
import Account from '../../components/Account';
//
import useSettings from '../../hooks/useSettings';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));


// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { onChangeMode, themeMode } = useSettings();
  // const isOffset = useOffSetTop(100);
  const isOffset = false;
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isEcosystem = pathname === '/ecosystem';
  const themeToggle = () => {
    onChangeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  return (
    <AppBar color="transparent" 
      sx={{ boxShadow: 0, position: 'absolute', background:  themeMode === 'dark' ? '#141721' : '#f5f5f5' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box width="33%">
            <RouterLink to="/" style={{display:'block', width: 'fit-content'}}>
            <Box
              component="img"
              sx={{ width: { xs: '120px', md: '120px' }, paddingTop: '15px' }}
              src={themeMode === 'dark' ? '/static/logo_dark.png' : '/static/logo_light.png'}
              alt="logo"
            />
          </RouterLink>
          </Box>
          
          {(!isHome || !isEcosystem) && <Box sx={{ flexGrow: 1 }} />}
          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
              sx={{ fontSize: '16px', fontFamily: 'Poppins' }}
            />
          </MHidden>
          <Box sx={{ flexGrow: 1 }} />
          <Account />
          

          <Box
            component="img"
            sx={{ width: '32px', cursor: 'pointer', marginLeft: '12px', '&:hover': { opacity: '80%' } }}
            src={themeMode === 'dark' ? '/static/sun_moon_white.svg' : '/static/sun_moon_black.svg'}
            alt="logo"
            onClick={themeToggle}
          />
          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}

    </AppBar>

  );
}
