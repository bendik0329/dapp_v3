/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { experimentalStyled as styled, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid, Button } from '@material-ui/core';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianAxis,
  Tooltip,
} from 'recharts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useInvestInfo } from '../../../utils/invest';
import useSettings from '../../../hooks/useSettings';
import {Popup} from './index';
import {getDurationYears, getDurationMonths, getDurationHours, getDurationDays, getYM} from '../../../utils/dateUtils';
import { numberWithCommas } from '../../../helpers/formatters';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 0,
    borderRadius: '20px'
  },
}));


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 5)
}));

const th = { fontWeight: 'normal', opacity: '1',background: 'transparent', color: '#5d6588', textTransform: 'capitalize !important',  boxShadow: 'none'};
const thcustom = {borderLeft: '1px solid rgb(93, 101, 136)', fontWeight: 'normal', opacity: '1',background: 'transparent', color: '#5d6588', textTransform: 'capitalize !important',  boxShadow: 'none'};
const priceHistory1 = [
  {year : 2022, data : ['-10', '1.03', '-1.03', '10.03', '6.03', '-2.03', '1.03', '-1.03', '12.03', '-10', '1.03', '-1.03']},
  {year : 2023, data : ['-10', '1.03', '-1.03', '10.03', '6.03', '-2.03', '1.03', '-1.03', '12.03', '-10', '1.03', '-1.03']},
  {year : 2024, data : ['-10', '1.03', '-1.03', '10.03', '6.03', '-2.03', '1.03', '-1.03', '12.03', '-10', '1.03', '-1.03']}
]
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      let width  = window.innerWidth;
      if(width>1180){
        width = 1180;
      }
      if(width<500){
        width = window.innerWidth-20;
      }
      setSize([width, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

// ----------------------------------------------------------------------
const data = [
  {name: 'Jan', uv: 10,  amt: 2400},
  {name: 'Feb', uv: 9,  amt: 2400},
  {name: 'Mar', uv: 8.5,  amt: 2400},
  {name: 'Apr', uv: 6,  amt: 2400},
  {name: 'May', uv: 9.5,  amt: 2400},
  {name: 'Jun', uv: 11,  amt: 2400},
  {name: 'Jul', uv: 7,  amt: 2400},
  {name: 'Aug', uv: 10.69,  amt: 2400},
  {name: 'Sep', uv: 10.20,  amt: 2400},
  {name: 'Oct', uv: 9,  amt: 2400},
  {name: 'Nov', uv: 11,  amt: 2400},
  {name: 'Dec', uv: 13,  amt: 2400},
  {name: 'Jan', uv: 10,  amt: 2400},
  {name: 'Feb', uv: 9,  amt: 2400},
  {name: 'Mar', uv: 8.5,  amt: 2400},
  {name: 'Apr', uv: 6,  amt: 2400},
  {name: 'May', uv: 9.5,  amt: 2400}
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="custom-tooltip">
        <p className="label">$ {`${payload[0].value}`}</p>
        <p className="desc">{`${label} 2022`}</p>
      </div>
    );
  }

  return null;
};

export default function Equity() {
  const [time, setTime] = useState("all");
  const {
    buyOrder,
    sellOrder,
    estimationBuyPrice,
    estimationSellPrice,
    isApprove,
    approveToContract,
    totalEABCD,
    eABCDDecimal,
    priceOracle,
    priceHistory,
  } = useInvestInfo();
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState(0);
  const [chartMode, setChartMode] = useState(0);

  const { themeMode } = useSettings();
  const main = "https://widget.onramper.com?color=266677&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0&darkMode=";
  const mode1 = themeMode === 'dark' ? 'true' : 'false'; 
  const url = main+mode1;
  const tooltipStyleT = {
    border: 0,
     ':focus-visible':{
    border: 0,
  }
}
  const tooltipStyle = {
    color: '#222230',
    fontWeight: 700,
    borderRadius: '10px',
    border: 0,
    boxShadow: '5px 10px 8px #888888',
    ':focus-visible':{
      border: 0,
    }
  };
  console.log('pricedata', priceHistory);
  const [width, height] = useWindowSize();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const diff = (A, B) => (priceHistory[B].data.price - priceHistory[A].data.price) / priceHistory[A].data.price * 100
  const getTotal = (data)=>{
    let total = 0;
    data.map((item)=>{
      if(item != '-')
        total += Number(item);
    })
    return total;
  }
  const chartData = useMemo(()=>{
    if(priceHistory.length > 0){
      const now = Date.now() / 1000;
      const chart = [];
      if(chartMode == 0){
        const last = 24 * 3600;
        const step = 60;
        let oldDate = now + 24 * 3600;
        console.log('pricehistoryasdfasdf', priceHistory)
        // eslint-disable-next-line array-callback-return
        priceHistory.map((item)=>{
          
          
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationHours(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })
      }
      if(chartMode == 1){
        const last = 24 * 3600 * 7;
        const step = 24 * 3600;
        let oldDate = now + 24 * 3600;
        priceHistory.map((item)=>{
          console.log("chrat", now - item.data.date < last, oldDate - item.data.date > step);
          console.log("value", now - item.data.date , oldDate - item.data.date );
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationDays(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })

        
      }
      if(chartMode == 2){
        const last = 24 * 3600 * 31;
        const step = 24 * 3600;
        let oldDate = now + 24 * 3600;

        priceHistory.map((item)=>{
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationDays(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })
      }
      if(chartMode == 3){
        const last = 24 * 3600 * 31 * 3;
        const step = 24 * 3600;
        let oldDate = now + 24 * 3600;
        priceHistory.map((item)=>{
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationMonths(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })
      }
      if(chartMode == 4){
        const last = 24 * 3600 * 31 * 6;
        const step = 24 * 3600;
        let oldDate = now + 24 * 3600;

        priceHistory.map((item)=>{
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationMonths(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })
      }
      if(chartMode == 5){
        const last = 24 * 3600 * 365;
        const step = 24 * 3600;
        let oldDate = now + 24 * 3600;

        priceHistory.map((item)=>{
          if(now - item.data.date < last && oldDate - item.data.date > step){
            oldDate = item.data.date;
            chart.push({name : getDurationYears(Number(item.data.date)), uv : Number(item.data.price)})
          }
        })
      }
      if(chartMode == 6){
        priceHistory.map((item)=>{
            chart.push({name : getDurationMonths(Number(item.data.date)), uv : Number(item.data.price)})
        })
      }
      console.log('chart data', chart);
      return chart.reverse();
    } 
    return data;
    
    
  },[priceHistory, chartMode])
  const handlepricehistory = useMemo(()=>{

    if(priceHistory.length <= 0)
      return priceHistory1;
    const priceCalender = [];
    let oldYear=-1; let oldMonth =0;
    let y=-1;
    let first = priceHistory.length-1;
    for(let i = priceHistory.length-1; i > 0  ; i--){
      const date = getYM(priceHistory[i].data.date);
      
      if( date.year > oldYear ){
        
        oldYear = date.year;
        oldMonth = date.month;
        y++;
        priceCalender.push({year:'0', data:['-','-','-','-','-','-','-','-','-','-','-','-']});
        priceCalender[y].year = date.year.toString();
        
      }

      if(date.month > oldMonth){
        oldMonth = date.month;
        priceCalender[y].data[date.month] = (diff(first, i).toFixed(2));
        first = i;
      }
    }
    const date = getYM(priceHistory[0].data.date);
    priceCalender[y].data[date.month] = (diff(first, 0).toFixed(2));

    return priceCalender;
  },[priceHistory])
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: {xs: '50px', md: 10} }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{zIndex: 1}}>
          <div id={themeMode === 'dark' ? 'modal-outer-dark' : 'modal-outer-light'} className={classes.paper}>
            <Popup price={priceHistory.length > 0 ? priceHistory[0].data.price : 0} buyOrSell = {mode}  isApprove = {isApprove} approveToContract = {approveToContract} modalShow = {modalShow} setModalShow={setModalShow} sellOrder = {sellOrder} buyOrder = {buyOrder} estimationSellPrice = {estimationSellPrice} estimationBuyPrice = {estimationBuyPrice} idx={id} />
          </div>
        </Fade>
      </Modal>

       <Grid container justifyContent="space-between" alignItems="flex-start" className='card' padding="10px">
        <Grid item xs={12} md={5} sx={{ position: 'relative', display: 'flex', aligItem: 'center', flexDirection: { xs: 'column', md: 'row' }, padding: '10px' }}>
          <Box  sx={{ margin: { xs: 'auto', md: '0' }, width: '260px', borderRadius: '20px', position: 'relative' }}>
            <Box
              component="img"
              alt="light mode"
              src="/static/slider/1.png"
              sx={{  width: '100%' }}
            />
            <figcaption style={{ backdropFilter: 'blur(3px)', background: 'rgba(255, 255, 255, .1)', position: 'absolute', width: '100%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', padding: '10px', bottom: 0}}>

            <Typography component="p" variant="overline" sx={{ width: '100%', textTransform: 'none',fontFamily: 'Lato', fontWeight: 400, color:' rgba(255, 255, 255, 0.5)', fontSize: { xs: 10, md: 10 } }}>
              Asset Type
            </Typography>
            <Typography component="p" variant="overline" sx={{ width: '100%', textTransform: 'none',fontFamily: 'Lato', fontWeight: 500, color:' rgba(255, 255, 255, 1)', fontSize: { xs: 12, md: 14 } }}>
              Stocks
            </Typography>
            </figcaption>
          </Box>
          
          <Box sx={{width:'-webkit-fill-available', padding: '5px'}}>
            <Typography component="p" variant="overline" sx={{ width: '100%', textAlign: 'center', textTransform: 'none', margin: '5px', display: 'block', fontFamily: 'Lato', fontWeight: 700, fontSize: { xs: 16, md: 20 } }}>
              Global Equity Fund - εABCD
            </Typography>
            <Box className='cutom-card' sx={{display: 'flex', padding: '10px 0px', margin: {xs: '0px', md: '10px'}, marginTop: '23px !important' }}>
              <Grid item xs={12} md={5} sx={{maxWidth:{xs: '100px'}}}>
                <Typography className='small-text' component="p" color='rgba(255, 255, 255, 0.5)' variant="overline" sx={{ width: '100%', paddingLeft: '5px', textAlign: 'left', textTransform: 'none', margin: '5px', display: 'block', fontFamily: 'Lato', fontWeight: 'normal', fontSize: { xs: 10, md: 10 } }}>
                  Current Price
                </Typography>
                <Typography component="h3" sx={{paddingLeft: '10px', fontFamily: 'Lato', fontSize: '18px'}}>{`$${priceHistory.length > 0 ? numberWithCommas(Number(priceHistory[0].data.price).toFixed(2)) : 0.00}`}</Typography>
              </Grid>
              <Grid item xs={12} md={7} sx={{borderLeft: '1px dashed rgba(255, 255, 255, 0.2)'}}>
                <Typography className='small-text' component="p" color='rgba(255, 255, 255, 0.5)' variant="overline" sx={{ width: '100%', textAlign: 'left', textTransform: 'none', margin: '5px', display: 'block', fontFamily: 'Lato', fontWeight: 'normal', fontSize: { xs: 10, md: 10 }, paddingLeft: '5px' }}>
                  Assets under Management
                </Typography>
                <Typography component="h2" sx={{paddingLeft: '10px', fontFamily: 'Lato', fontSize: '18px'}}>{`${numberWithCommas(Number((totalEABCD * priceOracle / (10 ** eABCDDecimal)).toFixed(0)))} USD`}</Typography>
              </Grid>
              
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '5px 10px', paddingTop: '20px' }}>
            <Button
                variant="contained"
                onClick={() => {
                  handleOpen();
                  setId(1);
                }}
                sx={{
                  fontSize: { xs: '10px', md: '12px' },
                  fontFamily: 'Poppins',
                  width: { xs: 'auto', md: 'auto' },
                  fontWeight: 400,
                  borderRadius: '20px',
                  background: '#11cabe',
                  boxShadow: 'none',
                  padding: '12px 52px',
                  '&:hover': {
                    opacity: '80%'
                  }
                }}
              >
                Buy
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                  handleOpen();
                  setId(2);
                }}
                sx={{
                  fontSize: { xs: '10px', md: '12px' },
                  fontFamily: 'Poppins',
                  width: { xs: 'auto', md: 'auto' },
                  fontWeight: 400,
                  borderRadius: '20px',
                  background: '#f23838',
                  boxShadow: 'none',
                  padding: '12px 52px',
                  '&:hover': {
                    opacity: '80%'
                  }
                }}
              >
                Sell
            </Button>
            </Box>
            
          </Box>
          
        </Grid>
        <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
          <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', marginTop: {xs: 3, md: 10}, display: 'block', color: '#A5ADCF', fontFamily: 'Abel', fontWeight: 'normal', fontSize: { xs: 10, md: 16 }, lineHeight: '24px' }}>
            Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our exchange and products. Subscribe to get update and notify our ex
          </Typography>
        </Grid>
       </Grid>
      </Container>
    
      <Grid width='lg' xs={12} md={12}>
        <Container width='lg' sx={{ position: 'relative', paddingTop: 10 }}>
          <Box sx={{display: 'flex', flexDirection: {xs: 'column', md:'row'}, justifyContent: 'space-between'}}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', marginBottom: {xs: 1, md: 10}, display: 'block', fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: 18, md: 20 }, lineHeight: { xs: '40px', md: '50px' } }}>
            Price History
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', gap: 3}}>
            <Box className={time==="1d" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('1d'); setChartMode(0)}}>
              1D
            </Box>
            <Box className={time==="1w" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('1w'); setChartMode(1)}}>
              1W
            </Box>
            <Box className={time==="1m" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('1m'); setChartMode(2)}}>
              1M
            </Box>
            <Box className={time==="3m" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('3m'); setChartMode(3)}}>
              3M
            </Box>
            <Box className={time==="6m" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('6m'); setChartMode(4)}}>
              6M
            </Box>
            <Box className={time==="1y" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('1y'); setChartMode(5)}}>
              1Y
            </Box>
            <Box className={time==="all" ? "tab-buttons active": "tab-buttons"} onClick={() =>{setTime('all'); setChartMode(6)}}>
              All
            </Box>

          </Box>
          </Box>
         
          <LineChart
            width={width}
            height={450}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis  style={{textTransform: 'uppercase'}} dataKey="name" tickLine={false} axisLine={false}/>
            <YAxis tickMargin={50} offset={10} axisLine={false} tickSize={4} tickLine={false} />
            <CartesianAxis vertical={false} />
            <Tooltip content={<CustomTooltip />}/>
            <Line stroke={themeMode==="dark" ? "white" : "black"} type="monotone" dataKey="uv" strokeWidth={4} dot={false} />
          </LineChart>
          <br />
          <br />
          <Box className='card' style={{ overflowX:'auto'}}>
          <Table style={{ padding: '10px', overflowX:'auto', width: '100%' }} sx={{ minWidth: '100%' }} aria-label="simple table">
              <TableHead style={{background: 'transparent', boxShadow: 'none'}}>
                <TableRow style={{background: 'transparent'}}>
                  <TableCell align="center" style={th}>Year</TableCell>
                  <TableCell align="center" style={th}>Jan</TableCell>
                  <TableCell align="center" style={th}>Feb</TableCell>
                  <TableCell align="center" style={th}>Mar</TableCell>
                  <TableCell align="center" style={th}>Apr</TableCell>
                  <TableCell align="center" style={th}>May</TableCell>
                  <TableCell align="center" style={th}>Jun</TableCell>
                  <TableCell align="center" style={th}>Jul</TableCell>
                  <TableCell align="center" style={th}>Aug</TableCell>
                  <TableCell align="center" style={th}>Sep</TableCell>
                  <TableCell align="center" style={th}>Oct</TableCell>
                  <TableCell align="center" style={th}>Nov</TableCell>
                  <TableCell align="center" style={th}>Dec</TableCell>
                  <TableCell align="center" style={thcustom}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handlepricehistory.map((row, idx) => (
                  <TableRow>
                    <TableCell align="center" style={{color: '#c0c0c0', fontWeight: '500'}}>{row.year}</TableCell>
                    <TableCell align="center" style={{color: row.data[0] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[0] != '-'  ? `${row.data[0]}%` : `${row.data[0]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[1] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[1] != '-'  ? `${row.data[1]}%` : `${row.data[1]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[2] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[2] != '-'  ? `${row.data[2]}%` : `${row.data[2]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[3] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[3] != '-'  ? `${row.data[3]}%` : `${row.data[3]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[4] > 0 ?'#27b783' : '#ca1c46'}}>{row.data[4] != '-'  ? `${row.data[4]}%` : `${row.data[4]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[5] > 0 ?'#27b783' : '#ca1c46'}}>{row.data[5] != '-'  ? `${row.data[5]}%` : `${row.data[5]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[6] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[6] != '-'  ? `${row.data[6]}%` : `${row.data[6]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[7] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[7] != '-'  ? `${row.data[7]}%` : `${row.data[7]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[8] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[8] != '-'  ? `${row.data[8]}%` : `${row.data[8]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[9] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[9] != '-'  ? `${row.data[9]}%` : `${row.data[9]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[10] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[10] != '-'  ? `${row.data[10]}%` : `${row.data[10]}`}</TableCell>
                    <TableCell align="center" style={{color: row.data[11] > 0 ?'#27b783' : '#ca1c46',}}>{row.data[11] != '-'  ? `${row.data[11]}%` : `${row.data[11]}`}</TableCell>
                    <TableCell align="center" style={{color: getTotal(row.data) > 0 ?'#27b783' : '#ca1c46',borderLeft: '1px solid rgb(93, 101, 136)'}}>{`${getTotal(row.data).toFixed(2)}%`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'} , justifyContent: 'space-between', marginTop: {xs: '20px', md: '50px'}}}>
            <Box sx={{marginTop: {xs: 2, md: 0} }}>
              <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 16, md: 22 }, lineHeight: { xs: '16px', md: '40px' } }}>
                Contract
              </Typography>
              <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 'normal', fontSize: { xs: 12, md: 14 }, color: '#a5adcf', lineHeight: { xs: '22px', md: '20px' } }}>
                0xaBE33a92e4eB557f4E938E28A7652D6d2a7114a1
              </Typography>
            </Box>
            <Box sx={{marginTop: {xs: 2, md: 0} }}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 16, md: 22 }, lineHeight: { xs: '16px', md: '40px' } }}>
                Fund Prospectus
              </Typography>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 'normal', fontSize: { xs: 12, md: 14 }, color: '#a5adcf', lineHeight: { xs: '22px', md: '20px' } }}>
                  Morningstar
                </Typography>
                <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 'normal', fontSize: { xs: 12, md: 14 }, color: '#a5adcf', lineHeight: { xs: '22px', md: '20px' } }}>
                  Bloomberg
                </Typography>
                <Typography component="p" variant="overline" sx={{ textAlign: 'left', textTransform: 'none', display: 'block', fontFamily: 'Montserrat', fontWeight: 'normal', fontSize: { xs: 12, md: 14 }, color: '#a5adcf', lineHeight: { xs: '22px', md: '20px' } }}>
                  Fundsquare
                </Typography>

              </Box>
            </Box>
          </Box>
        </Container>
      </Grid>
    </RootStyle>
  );
}
