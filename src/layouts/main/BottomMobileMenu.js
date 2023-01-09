/* eslint-disable prettier/prettier */
import { Link, Box } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import { MHidden } from '../../components/@material-extend';


export default function MainFooter() {
  const path = window.location.pathname;
  const { themeMode } = useSettings();
  const getImage = (name, active, normal )=> {
    let img = '';
    if(name === path){
      img = active;
    }else{
      img =  normal;
    }
    return img;
  }
  const backgroundColor = themeMode==='light' ? '#000' : '#fff';
  return (
    <MHidden width="mdUp">
      <Box  
        sx={{
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          background: backgroundColor, position: 'fixed', bottom: 20, height: '50px', width: '70%', left: '15%',
          padding: 2,
          zIndex: '9999 !important'
        }}
      >
          <Link component={RouterLink} to="/"  sx={{ width: { xs: '120px', md: '160px' }, display: 'flex', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
            <Box
              sx={{ width: 28 }}
              component="img"
              src={themeMode==='light' ?
              getImage('/', '/static/connect-white.svg', '/static/connect.svg') 
              : 
              getImage('/', '/static/connect-black.svg', '/static/connect-dark.svg')
            }
              alt="connect"
            />
          </Link>
          <Link component={RouterLink} to="/fiat"  sx={{ width: { xs: '120px', md: '160px' }, display: 'flex', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
            <Box
             sx={{ width: 28 }}
              component="img"
              src={themeMode==='light' ? 
              getImage('/fiat', '/static/fiat-white.svg', '/static/fiat-dark.svg') 
              : 
              getImage('/fiat', '/static/fiat-black.svg', '/static/fiat.svg')
            }
              alt="connect"
            />
          </Link>
           <Link component={RouterLink} to="/swap"  sx={{ width: { xs: '120px', md: '160px' }, display: 'flex', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
            <Box
            sx={{ width: 28 }}
              component="img"
              src={themeMode==='light' ? 
              getImage('/swap', '/static/swap-white.svg', '/static/swap-dark.svg') 
              : 
              getImage('/swap', '/static/swap-black.svg', '/static/swap.svg')
              }
              alt="swap"
            />
           </Link>
           <Link component={RouterLink} to="/invest"  sx={{ width: { xs: '120px', md: '160px' }, display: 'flex', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
            <Box style={{color: 'red'}}
            sx={{ width: 28 }}
              component="img"
              src={themeMode==='light' ?
              getImage('/invest', '/static/invest-white.svg', '/static/invest-dark.svg') 
              : 
              getImage('/invest', '/static/invest-black.svg', '/static/invest.svg')
             
            }
              alt="connect"
            />
             </Link>
           <Link component={RouterLink} to="/stake"  sx={{ width: { xs: '120px', md: '160px' }, display: 'flex', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
            <Box
             sx={{ width: 28 }}
              component="img"
              src={themeMode==='light' ?
              getImage('/stake', '/static/stake-white.svg', '/static/stake-dark.svg') 
              : 
              getImage('/stake', '/static/stake-black.svg', '/static/stake.svg')
             
            }
              alt="connect"
            />
          </Link>
      </Box>

    </MHidden>
    
  );
}
