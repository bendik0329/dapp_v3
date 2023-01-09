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

export default function Swap() {
  return (
    <RootStyle>
        <Container className='widget-heading' maxWidth="lg" sx={{ position: 'relative', paddingTop: { xs: '40px', md: 30 } }}>
          <Typography component="p" variant="overline" sx={{ textAlign: 'center', textTransform: 'none', marginBottom: '1px', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 24, md: 20 }, lineHeight: { xs: '40px', md: '50px' } }}>
                Fiat Gateway Providers
            </Typography>
            <Typography component="p" sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 14, lineHeight: 2, color: '#AEB6BF', maxWidth: '450px', paddingBottom: '25px !important', padding: 2, textAlign: 'center', margin: '0 auto !important' }}>
            Below is a list of popular fiat gateways. It can be used to buy or sell crypto with a credit card, bank transfer & more.
            </Typography>
            <Grid spacing={10} justifyContent="center" display='flex' alignItems="center" alignContent='center'>
                <Card />
            </Grid>
        </Container>
    </RootStyle>
  );
}
