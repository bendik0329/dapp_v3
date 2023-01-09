/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#141721',
  padding: theme.spacing(20, 0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: 0,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function LandingBuy() {
  return (
    <RootStyle>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Grid container spacing={5} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <Box>
                        <Box component="img" alt="light mode" src="/static/home/landing-buy-img1.png" sx={{ margin: { xs: 'auto', md: 'auto auto auto 0' }, maxWidth: { xs: '300px', md: '100%' } }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContentStyle>
                        <Box>
                            <Typography component="p" variant="overline" sx={{ textTransform: 'none', mb: 4, color: 'common.white', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 50, md: 82 }, lineHeight: { xs: '60px', md: '92px' } }}>
                                Buy crypto <br /> in minutes, <br /> with fiat
                            </Typography>
                        </Box>
                        <Box>
                            <Typography component="p" variant="overline" sx={{ textTransform: 'none', mb: 4, color: 'common.white', display: 'block', fontFamily: 'Poppins', fontWeight: 400, fontSize: 16, lineHeight: '28px', opacity: 0.6, letterSpacing: 0 }}>
                                Don’t have any crypto? Do not worry! You can buy in a few minutes with card, Apple Pay or Google Pay
                            </Typography>
                        </Box>
                        <Box>
                            <Box component="img" alt="light mode" src="/static/home/landing-buy-img2.png" sx={{ margin: { xs: 'auto', md: 'auto auto auto 0' } }} />
                        </Box>
                    </ContentStyle>
                </Grid>
            </Grid>
        </Container>
    </RootStyle>
  );
}
