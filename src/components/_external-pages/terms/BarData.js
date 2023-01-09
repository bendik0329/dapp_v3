/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Divider, Grid, Container, Typography, Stack } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//
import { MotionInView, varFadeInUp } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  // backgroundColor: '#141721'
}));

const th = { fontWeight: 'normal', opacity: '0.5',background: 'transparent', color: '#E0E0EB',  boxShadow: 'none'}
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
  ,'30 days', '30 Jul 2022', '30 Jul 2022', ' 1,000.01 EQUITY', '0x19f5dfcc51c8….', 1000000.0018, 'BUSD' ),
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

// ----------------------------------------------------------------------

export default function BarData() {
  return (
    <RootStyle>
      <SubRootStyle>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: '2' }}>
            <Grid container spacing={5} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={5} style={{ overflowX:'auto' }}>
              <Typography component="p" variant="overline" sx={{ textTransform: 'none',  color: '#ffffff',  textAlign: 'left', fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px',  paddingTop: {xs: 4, md: 8} }}>
                Liquidity Pools
              </Typography>
             
            </Grid>
            <Grid item xs={12} md={7} style={{ overflowX:'auto' }}>
              <Typography component="p" variant="overline" sx={{ textTransform: 'none',  color: '#ffffff',  textAlign: 'left', fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px', paddingTop: {xs: 4, md: 8} }}>
                Staking Transactions
              </Typography>
            <Table style={{ overflowX:'auto', width: '100%' }} sx={{ minWidth: '100%' }} aria-label="simple table">
              <TableHead style={{background: 'transparent', boxShadow: 'none'}}>
                <TableRow style={{background: 'transparent'}}>
                  <TableCell align="left" style={th}>TXN HASH</TableCell>
                  <TableCell align="left" style={th}>PERIOD</TableCell>
                  <TableCell align="left" style={th}>AMOUNT</TableCell>
                  <TableCell align="left" style={th}>TOKEN</TableCell>
                  <TableCell align="left" style={th}>START</TableCell>
                  <TableCell align="left" style={th}>END</TableCell>
                  <TableCell align="left" style={th}>REWARD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: '700'}}>{row.hash}</TableCell>
                    <TableCell align="left" style={{ opacity: 0.6}}>{row.method}</TableCell>
                    <TableCell align="left"  style={{ opacity: 0.6}}>{row.value}</TableCell>
                    <TableCell align="left" style={{fontWeight: '700'}}>{row.token}</TableCell>
                    <TableCell align="left"  style={{ opacity: 0.6}}>{row.block}</TableCell>
                    <TableCell align="left" style={{ opacity: 0.6}}>{row.age}</TableCell>
                    <TableCell align="left" style={{ fontWeight: '700'}}>{row.from}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Grid>
          </Grid>
        </Container>
      </SubRootStyle>
    </RootStyle>
  );
}
