/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Stack, Button } from '@material-ui/core';
import CardSwap from '../../CardSwap';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
//   padding: theme.spacing(5, 0, 10)
}));


// ----------------------------------------------------------------------

export default function Swap() {
  return (
    <RootStyle>
        <Container className='widget-heading' maxWidth="lg" sx={{ position: 'relative', paddingTop: { xs: '130px', md: 15 } }}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'center', display: 'block', fontFamily: 'Montserrat !important', fontWeight: '600 !important', textTransform: 'capitalize !important', fontSize: { xs: '18px !important', md: '20px !important' }, lineHeight: { xs: '40px', md: '50px' } }}>
              Cross-chain transfer
            </Typography>
            <Typography component="p" sx={{ fontFamily: 'Poppins !important', fontWeight: '400 !important', fontSize: '12px !important', lineHeight: 2, color: '#AEB6BF', maxWidth: '400px !important', paddingBottom: '30px !important', padding: '10px 20px', textAlign: 'center', margin: '0 auto !important', paddingTop:{xs: '20px !important', md: '10px !important'} }}>
            Swap your stablecoins from one network to another. You can use them later to tokenize assets.
            </Typography>
            <Grid spacing={10} justifyContent="center" display='flex' alignItems="center" alignContent='center'>
                <CardSwap />
            </Grid>
        </Container>
    </RootStyle>
  );
}
