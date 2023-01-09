/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import Card from '../../Card';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
//   padding: theme.spacing(5, 0, 10)
}));


// ----------------------------------------------------------------------

export default function Fiat() {
  return (
    <RootStyle>
        <Container className='widget-heading' maxWidth="lg" sx={{ position: 'relative', paddingTop: { xs: '130px', md: 15 } }}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'center !important', display: 'block !important', fontFamily: 'Montserrat !important', fontWeight: '600 !important', textTransform: 'capitalize !important', fontSize: { xs: '18px !important', md: '20px !important' }, lineHeight: { xs: '40px !important', md: '50px !important' } }}>
                Fiat Gateway Providers
            </Typography>
            <Typography component="p" sx={{ fontFamily: 'Poppins !important', fontWeight: '400 !important', fontSize: '12px !important', lineHeight: 2, color: '#AEB6BF !important', maxWidth: '400px !important', paddingBottom: '30px !important', padding: '10px 20px', textAlign: 'center !important', margin: '0 auto !important', paddingTop:{xs: '20px !important', md: '10px !important'} }}>
            Below is a list of popular fiat gateways. It can be used to buy or sell crypto with a credit card, bank transfer & more.
            </Typography>
            <Grid spacing={10} justifyContent="center" display='flex' alignItems="center" alignContent='center'>
                <Card />
            </Grid>
        </Container>
    </RootStyle>
  );
}
