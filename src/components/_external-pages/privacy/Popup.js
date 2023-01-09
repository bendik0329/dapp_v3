import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useSettings from '../../../hooks/useSettings';
import { numberWithCommas, numberWithOutCommas } from '../../../helpers/formatters';

// ----------------------------------------------------------------------
TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.number,
  index: PropTypes.number
};
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

Popup.propTypes = {
  price: PropTypes.number,
  buyOrSell: PropTypes.number,
  buyOrder: PropTypes.number,
  sellOrder: PropTypes.number,
  estimationSellPrice: PropTypes.number,
  estimationBuyPrice: PropTypes.number,
  isApprove: PropTypes.bool,
  approveToContract: PropTypes.number,
  idx: PropTypes.number
};
export default function Popup({
  price,
  buyOrSell,
  buyOrder,
  sellOrder,
  estimationSellPrice,
  estimationBuyPrice,
  isApprove,
  approveToContract,
  idx
}) {
  const { themeMode } = useSettings();
  const select = { img: '/static/usd.svg', name: 'BUSD' };
  const select2 = { img: '/static/abcd.svg', name: 'εABCD' };
  const [value, setValue] = React.useState(idx - 1);

  const [busdAmount, setBusdAmount] = useState(0);
  const [eAbcdAmount, setEabcdAmount] = useState(0);
  const [mode, setMode] = useState(0);
  useEffect(() => {
    setMode(buyOrSell);
  }, [buyOrSell]);
  const busdChangeHandler = (val) => {
    setBusdAmount(val);
    if (mode === 0) {
      const data = estimationBuyPrice(val, true);
      if (data.result) setEabcdAmount(data.data.toFixed(4));
    }
    if (mode === 1) {
      const data = estimationSellPrice(val, false);
      if (data.result) setEabcdAmount(data.data.toFixed(4));
    }
  };

  const eabcdChangeHandler = (val) => {
    setEabcdAmount(val);
    if (mode === 0) {
      const data = estimationBuyPrice(val, false);
      if (data.result) setBusdAmount(data.data.toFixed(4));
    }

    if (mode === 1) {
      const data = estimationSellPrice(val, true);
      if (data.result) setBusdAmount(data.data.toFixed(4));
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      className="card cutom-color"
      sx={{ background: themeMode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)', paddingTop: 2 }}
    >
      <Tabs indicatorColor="white" value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab
          label="Buy"
          {...a11yProps(0)}
          style={{ fontWeight: 400, fontSize: '20px', fontFamily: 'Abel', width: '50%', marginRight: 0 }}
        />
        <Tab
          label="Sell"
          {...a11yProps(1)}
          style={{
            fontWeight: 400,
            fontSize: '20px',
            fontFamily: 'Abel',
            width: '50%',
            borderLeft: '1px solid',
            borderRadius: 0
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Abel', fontWeight: 400, fontSize: '18' }}>
          1 εABCD is roughly
        </Typography>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Abel', fontWeight: 400, fontSize: '18' }}>
          {`${numberWithCommas(Number(price).toFixed(2))} BUSD`}
        </Typography>
        <Box
          className="custom-input-outer"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            margin: 3,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1.5
          }}
        >
          <Box>
            <input
              type="text"
              className="input-custom"
              onChange={(e) => busdChangeHandler(numberWithOutCommas(e.target.value))}
              value={numberWithCommas(busdAmount)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              paddingLeft: 3,
              flexDirection: 'row',
              gap: 1,
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Box component="img" src={select.img} alt="usd icon" />
            <Typography sx={{ fontSize: '1rem', marginTop: '3px' }}>{select.name}</Typography>
          </Box>
        </Box>
        <Box
          className="custom-input-outer"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            margin: 3,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1.5
          }}
        >
          <Box>
            <input
              type="text"
              className="input-custom"
              onChange={(e) => eabcdChangeHandler(numberWithOutCommas(e.target.value))}
              value={numberWithCommas(eAbcdAmount)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              paddingLeft: 3,
              flexDirection: 'row',
              gap: 1,
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Box component="img" src={select2.img} alt="usd icon" />
            <Typography sx={{ fontSize: '1rem', marginTop: '3px' }}>{select2.name}</Typography>
          </Box>
        </Box>
        <Button
          onClick={() => {
            if (isApprove) {
              buyOrder(busdAmount);
            } else approveToContract();
          }}
          sx={{
            fontSize: { xs: '12px', md: '18px' },
            fontFamily: 'Poppins',
            minWidth: { xs: '90%', md: '90%' },
            fontWeight: 400,
            borderRadius: '50px',
            background: 'black',
            boxShadow: 'none',
            color: 'white',
            margin: '20px',
            padding: 2,
            '&:hover': {
              opacity: '80%',
              background: 'black'
            }
          }}
        >
          {isApprove ? `Buy Now` : `Approve`}
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Abel', fontWeight: 400, fontSize: '18' }}>
          1 εABCD is roughly
        </Typography>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Abel', fontWeight: 400, fontSize: '18' }}>
          {`${numberWithCommas(Number(price).toFixed(2))} BUSD`}
        </Typography>
        <Box
          className="custom-input-outer"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            margin: 3,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1.5
          }}
        >
          <Box>
            <input
              type="text"
              className="input-custom"
              onChange={(e) => eabcdChangeHandler(numberWithOutCommas(e.target.value))}
              value={numberWithCommas(eAbcdAmount)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              paddingLeft: 3,
              flexDirection: 'row',
              gap: 1,
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Box component="img" src={select2.img} alt="usd icon" />
            <Typography sx={{ fontSize: '1rem', marginTop: '3px' }}>{select2.name}</Typography>
          </Box>
        </Box>
        <Box
          className="custom-input-outer"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            margin: 3,
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 1.5
          }}
        >
          <Box>
            <input
              type="text"
              className="input-custom"
              onChange={(e) => busdChangeHandler(numberWithOutCommas(e.target.value))}
              value={numberWithCommas(busdAmount)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              paddingLeft: 3,
              flexDirection: 'row',
              gap: 1,
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Box component="img" src={select.img} alt="usd icon" />
            <Typography sx={{ fontSize: '1rem', marginTop: '3px' }}>{select.name}</Typography>
          </Box>
        </Box>
        <Button
          onClick={() => {
            if (isApprove) {
              sellOrder(eAbcdAmount);
            } else approveToContract();
          }}
          sx={{
            fontSize: { xs: '12px', md: '18px' },
            fontFamily: 'Poppins',
            minWidth: { xs: '90%', md: '90%' },
            fontWeight: 400,
            borderRadius: '50px',
            background: 'black',
            boxShadow: 'none',
            color: 'white',
            margin: '20px',
            padding: 2,
            '&:hover': {
              opacity: '80%',
              background: 'black'
            }
          }}
        >
          {isApprove ? `Sell Now` : `Approve`}
        </Button>
      </TabPanel>
    </Box>
  );
}
