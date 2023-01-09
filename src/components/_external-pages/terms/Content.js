/* eslint-disable prettier/prettier */
// material
import React, { useLayoutEffect, useEffect, useMemo, useState } from 'react';
import { experimentalStyled as styled, makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Grid, Container, Typography, Stack, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//
import Popover from '@material-ui/core/Popover';
import { MotionInView, varFadeInUp } from '../../animate';
import { useStakeInfo } from '../../../utils/stake';
import { numberWithCommas, numberWithOutCommas, getEllipsisTxt } from '../../../helpers/formatters';
import useSettings from '../../../hooks/useSettings';
import {Pagenation} from '../../../elements/pagenation/index';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  // backgroundColor: '#141721'
}));

const th = { fontWeight: 'normal', opacity: '0.7',background: 'transparent', boxShadow: 'none'}
const SubRootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(5, 0, 10),
    backgroundPosition: 'calc(50% - 310px) center',
    backgroundRepeat: 'no-repeat no-repeat',
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 0, 20)
    }
}));

function createData(hash, method, block, age, from, to, value, token) {
  return { hash, method, block, age, from, to, value, token };
}

const rows = [
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', ' 1,000.01 EQUITY', '0x19f5dfcc51c8….', '1,000,000.0018'  , 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', ' 100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),
  createData('0xc….a95'
  ,'30 days', '30 Jul 2022', '30 Jul 2022', '100.01 EQUITY', '0x19f5dfcc51c8….', 0.00018, 'BUSD' ),

];

const stakeTokenList = [{
  "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  "chainId": 56,
  "name": "BinanceUSD",
  "symbol": "BUSD",
  "decimals": 18,
  "logoURI": "https://bscscan.com/token/images/busd_32.png"
},
{
  "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  "chainId": 56,
  "name": "eABCD",
  "symbol": "eABCD",
  "decimals": 18,
  "logoURI": "https://etherscan.io/images/main/empty-token.png"
}]

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));
const pageSize = 12;
export default function LandingMint() {
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const handleChange = (page) => {
      setCurrent(page);
      setMinIndex((page - 1) * pageSize);
      setMaxIndex(page * pageSize);
  }
  const { onChangeMode, themeMode } = useSettings();
  const [select, setSelect] = useState({'img':'/static/usd.svg', 'name': 'BUSD'});
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeToken, setStakeToken] = useState(stakeTokenList[0]);
  const [stakeType, setStakeType] = useState(0);
  const {
    account,
    busdAveDays, 
    eabcdAveDays, 
    busdAmount, 
    eabcdAmount, 
    success,
    error, 
    stakePeriod,
    stakeWeight,
    liveStake,
    rewardEABCD,
    rewardBUSD,
    completeStake,
    busdDecimal,
    eABCDDecimal,
    THALESDecimal,
    isApprove,
    maxBUSD,
    maxEABCD,
    approveToContract,
    setError,
    setSuccess,
    stakeBUSD,
    stakeEABCD,} = useStakeInfo();

  const handleClick = (event) => {
    if(!anchorEl){
      setAnchorEl(event.currentTarget);
    }else{
      setAnchorEl(null);
    }
   
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const stake = ()=>{
    if(stakeToken.symbol === 'BUSD')
      stakeBUSD(stakeAmount, stakeType);
    if(stakeToken.symbol === 'eABCD')
      stakeEABCD(stakeAmount, stakeType);
  }

  const reward = useMemo(()=>{
    if(stakeToken.symbol === 'BUSD')
      return Number(stakeAmount * rewardBUSD * stakeWeight[stakeType] * stakePeriod[stakeType] / (10 ** busdDecimal) / (3600 * 24)).toFixed(2) ;
    if(stakeToken.symbol === 'eABCD')
      return Number(stakeAmount * rewardEABCD * stakeWeight[stakeType] * stakePeriod[stakeType] / (10 ** eABCDDecimal) / (3600 * 24)).toFixed(2) ;
  },[stakeAmount, rewardBUSD, rewardEABCD, busdDecimal, stakeWeight, stakeType])

  useEffect(()=>{
    if(success){
      // openNotification(3.5, 'Success', 'Your transaction is succeeded, please check on transaction result on explorer', true, ()=>{});
      setSuccess(false);
    }
    if(error.result){
      // openNotification(4.5, 'Transaction Failed', `Your transaction is failed because '${error.message}', please check on transaction result on explorer`, false, ()=>{});
      setError({result : false , message : ''});
    }

  },[error, success])
  // console.log('liveStake', liveStake)
  const compareAddress = (a, b)=>a.toString().toLowerCase() === b.toString().toLowerCase();
  const myRealStake = useMemo(()=>{
    const sortFn = (obj1 , obj2) => Number(obj1.data.claim) - Number(obj2.data.claim)
    let sortedArray = [...liveStake];
      if(liveStake?.length){
          sortedArray = sortedArray.sort(sortFn);
      }
    return sortedArray.filter((item) => (
      compareAddress(account, item.data.owner)))
    // console.log('staking data to be shown', liveStake)
    // return sortedArray;
  },[liveStake])

  const getDurationYears = (value) => {
    const MONTH = ['Jan', 'Feb', 'Mar', "Apr", 'May', "Jun", 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"];
    const stakeDate = new Date(value * 1000);
    const year = stakeDate.getFullYear();
    const month = MONTH[stakeDate.getMonth()];
    const day = stakeDate.getDate();
    return `${day} ${month} ${year}`;
  };
  return (
    <RootStyle>
      <SubRootStyle>
        <Container maxWidth="lgcutom" sx={{ position: 'relative', zIndex: '2' }}>
            <Grid container spacing={5} justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} md={5} style={{ overflowX:'auto' }}>
              <Typography component="p" variant="overline" sx={{ textTransform: 'none', textAlign: 'left', fontFamily: 'Nunito', fontWeight: 700, fontSize: '22px',  paddingTop: {xs: 4, md: 8}, marginBottom: 3 }}>
                Liquidity Pools
              </Typography>
              <Box sx={{display: 'flex', gap: {xs:5, md:1}, flexWrap: 'wrap', justifyContent:'space-between'}}>
                {/* 1 Box */}
                <Box sx={{display: 'flex', flexDirection: 'row' , justifyContent: {xs: 'center'}}}>
                  <Box>
                    <Box  sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                    <Box component="img" src="/static/usd.svg" alt="usd icon" />
                    <Typography sx={{ fontSize: '1.2rem', marginTop:'3px'}}>BUSD</Typography>
                    </Box>
                    
                    <Box sx={{ display:'flex', marginRight: 2, flexDirection:'column', justifyContent: 'flex-end', height: '200px' }}>
                      <Typography className="small-text-inner" sx={{ fontSize:'14px'}}>Staked Amount</Typography>
                      <Typography  sx={{fontFamily: 'Lato', fontWeight: 700}}>{`${numberWithCommas(busdAmount.toFixed(0))}`}</Typography>

                      <Typography className="small-text-inner" sx={{ fontSize:'14px', marginTop: 2}}>Average Days</Typography>
                      <Typography sx={{fontFamily: 'Lato', fontWeight: 700}}>{`${busdAveDays.toFixed(0)} Days`} </Typography>
                    </Box>
                  </Box>
                  <Box>
                  <Typography sx={{textAlign: 'center'}}>Max</Typography>
                    <Box sx={{ display:'flex',  justifyContent: 'flex-end', height: '200px' }}>
                      <Box className="outer-container"  sx={{height: '200px', width: {xs: '50px', md: '110px'}, display:'flex',  justifyContent: 'flex-end', flexDirection:"column", borderRadius: '10px' }}>
                        <Box sx={{height: `${(busdAmount * 100 / maxBUSD).toFixed(0)}%`, width: {xs: '50px', md: '110px'}, background: '#F6BA3F', borderRadius: '10px'}}>
                        <Typography sx={{textAlign: 'center'}}>{(busdAmount * 100 / maxBUSD).toFixed(0)}%</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* 2nd Box */}
                <Box sx={{display: 'flex', flexDirection: 'row' , justifyContent: {xs: 'center'}}}>
                  <Box>
                    <Box  sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                    <Box component="img" src="/static/abcd.svg" alt="usd icon" />
                    <Typography sx={{ fontSize: '1.2rem', marginTop:'3px'}}>εABCD</Typography>
                    </Box>
                    
                    <Box sx={{ display:'flex', marginRight: 2, flexDirection:'column', justifyContent: 'flex-end', height: '200px' }}>
                      <Typography className="small-text-inner" sx={{fontSize:'14px'}}>Staked Amount</Typography>
                      <Typography  sx={{fontFamily: 'Lato', fontWeight: 700}}>{numberWithCommas(eabcdAmount.toFixed(0))}</Typography>

                      <Typography className="small-text-inner" sx={{color: 'rgba(255, 255, 255, 0.5)', fontSize:'14px', marginTop: 2}}>Average Days</Typography>
                      <Typography sx={{fontFamily: 'Lato', fontWeight: 700}}>{`${eabcdAveDays.toFixed(0)} Days`}</Typography>
                    </Box>
                  </Box>
                  <Box>
                  <Typography sx={{textAlign: 'center'}}>Max</Typography>
                    <Box sx={{ display:'flex',  justifyContent: 'flex-end', height: '200px' }}>
                      <Box className="outer-container" sx={{height: '200px', width:{xs: '50px', md: '110px'}, background: '#292c38', display:'flex',  justifyContent: 'flex-end', flexDirection:"column", borderRadius: '10px' }}>
                        <Box className="inner-container" sx={{height: `${(eabcdAmount * 100 / maxEABCD).toFixed(0)}%`, width: {xs: '50px', md: '110px'}, color: 'black', borderRadius: '10px'}}>
                        <Typography sx={{textAlign: 'center'}}>{(eabcdAmount * 100 / maxEABCD).toFixed(0)}%</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography component="p" variant="overline" sx={{ textTransform: 'none',   textAlign: 'left', fontFamily: 'Nunito', fontWeight: 700, fontSize: '22px',  paddingTop: {xs: 4, md: 8}, marginBottom: 3 }}>
                  Stake
                </Typography>
                <Box className="card">
                  <Typography sx={themeMode==='dark'? {fontSize: '12px', color: 'rgba(255, 255, 255,  0.5)', margin: 2, paddingTop: 3}: {fontSize: '12px', color: 'black', margin: 2, paddingTop: 3}}>I want to stake</Typography>
                  <Box className="custom-input-outer" sx={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', margin: 3, borderRadius: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1.5
                  }}>
                    <Box>
                      <input type="text" className='input-custom' onChange={(e)=>setStakeAmount(numberWithOutCommas(e.target.value))}
                    value={numberWithCommas(stakeAmount)} defaultValue="0"/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1,}}>
                      <Box component="img" src={select.img} alt="usd icon" />
                      <Typography sx={{ fontSize: '1rem', marginTop:'3px'}}>{select.name}</Typography>
                      <Button
                      onClick={handleClick}
                        sx={{
                          fontSize: { xs: '10px', md: '12px' },
                          fontFamily: 'Poppins',
                          minWidth: { xs: 'auto', md: '20x'},
                          fontWeight: 400,
                          background: 'transparent',
                          boxShadow: 'none',
                          '&:hover': {
                            opacity: '80%'
                          }
                        }}
                        >
                        <Box component="img" src="/static/arrowdown.svg" alt="usd icon" />
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                            <Box sx={{cursor: 'pointer'}} onClick={()=>{
                              setSelect({'img': '/static/usd.svg', 'name':'BUSD'});
                              setStakeToken(stakeTokenList[0]);
                            }}>
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, padding: 2}}>
                                <Box component="img" src='/static/usd.svg' alt="usd icon" />
                                <Typography sx={{ fontSize: '1rem', marginTop:'3px'}}>BUSD</Typography>
                              </Box>
                            </Box>
                            <Box sx={{cursor: 'pointer'}} onClick={()=>{
                              setSelect({'img': '/static/abcd.svg', 'name':'εABCD'});
                              setStakeToken(stakeTokenList[1]);
                            }}>
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, padding: 2}}>
                                <Box component="img" src='/static/abcd.svg' alt="usd icon" />
                                <Typography sx={{ fontSize: '1rem', marginTop:'3px'}}>εABCD</Typography>
                              </Box>
                            </Box>
                            
                        </Popover>
                        </Button>
                        
                    </Box>
                  </Box>
                  <Typography sx={ themeMode === 'dark' ? {fontSize: '12px', color: 'rgba(255, 255, 255,  0.5)', margin: 2, paddingTop: 3}: {fontSize: '12px', color: 'black', margin: 2, paddingTop: 3}}>Staking period</Typography>
                  <Box sx={{display: 'flex', flexDirection: 'row', gap: {xs:1, md:3}, justifyContent: 'center'}}>
                  {stakePeriod.map((item, key) => (
                  // <ButtonWhite active = {key === stakeType} key={key} title={`${(item / (3600 * 24)).toFixed(0)} Days`} onClick = {() => setStakeType(key)}/>
                  <Box key={key} onClick = {() => setStakeType(key)} sx={key===stakeType? {border: '2px solid black',background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: '90px!important'}, borderRadius: '10px', cursor: 'pointer'}:{background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: '90px!important'}, borderRadius: '10px', cursor: 'pointer'}}>
                      <Typography sx={key===stakeType?{fontWeight: 'bold',fontSize: '12px'}:{fontSize: '12px'}}>{`${(item / (3600 * 24)).toFixed(0)} Days`}</Typography>
                    </Box>
                ))}
                    
                    {/* <Box sx={{background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: 'auto'}, borderRadius: '10px', cursor: 'pointer'}}>
                      <Typography sx={{fontSize: '12px'}}>14 Days</Typography>
                    </Box>
                    <Box sx={{background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: 'auto'}, borderRadius: '10px', cursor: 'pointer'}}>
                      <Typography sx={{fontSize: '12px'}}>30 Days</Typography>
                    </Box>
                    <Box sx={{background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: 'auto'}, borderRadius: '10px', cursor: 'pointer'}}>
                      <Typography sx={{fontSize: '12px'}}>90 Days</Typography>
                    </Box>
                    <Box sx={{background: '#e5e6ed', color: 'black', height: {xs: '60px', md : 'auto'}, display: 'flex', flexDirection: 'row',  padding: {md: 2}, justifyContent: 'center', alignItems: 'center', width: {xs: '60px', md: 'auto'}, borderRadius: '10px', cursor: 'pointer'}}>
                      <Typography sx={{fontSize: '12px'}}>180 Days</Typography>
                    </Box> */}
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', padding: 2, marginTop: 3, paddingBottom: 5, flexDirection:{xs: 'column-reverse', md: 'row'}}}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if(isApprove)
                        stake()
                      else
                        approveToContract();
                      }}
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                      fontFamily: 'Poppins',
                      width: { xs: 'auto', md: 'auto' },
                      fontWeight: 400,
                      borderRadius: '20px',
                      background: 'black',
                      boxShadow: 'none',
                      padding: {xs:'15px 40px', md:'10px 100px'},
                      '&:hover': {
                        opacity: '80%'
                      }
                    }}
                    >
                      {isApprove?`STAKE`:`APPROVE`}
                    </Button>
                    <Typography sx={{textAlign:{xs: 'center', width: '-webkit-fill-available'} , marginTop: 1, padding: {xs :2, md: 0}}}>{`Rewards: ${numberWithCommas(reward) } EQUITY`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7} style={{ overflowX:'auto' }}>
              <Typography component="p" variant="overline" sx={{ textTransform: 'none', textAlign: 'left', fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px', paddingTop: {xs: 4, md: 8} }}>
                Staking Transactions
              </Typography>
            <Table style={{ overflowX:'auto', width: '100%' }} sx={{ minWidth: '100%', marginTop: '13px' }} aria-label="simple table">
              <TableHead style={{background: 'transparent', boxShadow: 'none'}}>
                <TableRow style={{background: 'transparent'}}>
                  <TableCell align="left" style={th}>TXN HASH</TableCell>
                  <TableCell align="center" style={th}>PERIOD</TableCell>
                  <TableCell align="center" style={th}>AMOUNT</TableCell>
                  <TableCell align="center" style={th}>TOKEN</TableCell>
                  <TableCell align="center" style={th}>START</TableCell>
                  <TableCell align="center" className='min-width-100' style={th}>END</TableCell>
                  <TableCell align="center" style={th}>REWARD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myRealStake.map((row, idx) => (
                  idx >= minIndex && idx < maxIndex &&
                  // eslint-disable-next-line react/jsx-key
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: '700'}}><a style={ themeMode === 'dark' ? {color: 'white'}: {color: 'black'}} href={`https://polygonscan.com/tx/${row.transaction_hash}`} target='_blank' rel="noreferrer">{getEllipsisTxt(row.transaction_hash, 3)}</a></TableCell>
                    <TableCell align="center" style={{ opacity: 0.6}}>{` ${(Number(stakePeriod[Number(row.data.stakeType)]) / (3600 * 24) ).toFixed(0)} days`}</TableCell>
                    <TableCell align="center"  style={{ opacity: 0.6}}>{busdDecimal && Number(row.data.tokenType) === 1? numberWithCommas((Number(row.data.Amount)/(10 ** busdDecimal)).toFixed(2)) : numberWithCommas((Number(row.data.Amount)/(10 ** eABCDDecimal)).toFixed(2)) }</TableCell>
                    <TableCell align="center" style={{fontWeight: '700'}}>{Number(row.data.tokenType) === 1? 'BUSD' : 'eABCD'}</TableCell>
                    <TableCell align="center"  style={{ opacity: 0.6}}>{getDurationYears(Number(row.data.claim-3600*24*(Number(stakePeriod[Number(row.data.stakeType)]) / (3600 * 24) ).toFixed(0)))}</TableCell>
                    <TableCell align="center" style={{ opacity: 0.6}}>{getDurationYears(Number(row.data.claim))}</TableCell>
                    <TableCell align="center" style={{ fontWeight: '700'}}>{THALESDecimal && numberWithCommas((Number(row.data.date)/(10 ** THALESDecimal)).toFixed(2))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{display: 'flex'}}>
            <Pagenation
                pageSize={pageSize}
                current={current}
                total={myRealStake.length}
                onChange={handleChange}
            />
              {/* <Typography sx={{cursor:'pointer'}} mr={1} onClick={()=>{setPage('1') } } > {" < "} </Typography><Typography> Page {page} </Typography> <Typography ml={1} onClick={()=>{setPage('2') } }  sx={{cursor:'pointer'}}>{" > "}</Typography> */}
            </Box>
            </Grid>
          </Grid>
        </Container>
      </SubRootStyle>
    </RootStyle>
  );
}
