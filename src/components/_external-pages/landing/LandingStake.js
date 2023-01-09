/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(20, 0),
  background: 'url("/static/home/landing-stake-bg.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'left top'
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

export default function LandingStake() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between" alignItems="flex-end">
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <Box>
              <Box component="img" alt="light mode" src="/static/home/landing-stake-img.png" sx={{ margin: { xs: 'auto', md: 'auto 0 auto auto' }, maxWidth: { xs: 300, md: '100%' } }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <Box>
                <Typography component="p" variant="overline" sx={{ textTransform: 'none', marginBottom: 4, color: 'common.black', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 40, md: 64 }, lineHeight: '72px', letterSpacing: 0 }}>
                    Stake your tokens <br /> and get rewards
                </Typography>
              </Box>

              <Box>
                <Typography component="p" sx={{ maxWidth: 540, marginBottom: 4, textTransform: 'none', color: '#7C7B7B', display: 'block', fontFamily: 'Poppins', fontWeight: 400, fontSize: 16, lineHeight: '28px', opacity: 0.6, margin: { xs: 'auto', md: 'auto auto 32px auto' } }}>
                    You can stake your tokenized assets or stablecoin to increase the liquidity of the protocol. In return you will be rewarded with the protocol’s native EQUITY token 
                </Typography>
              </Box>

                <Box>
                <Typography component="p" sx={{ diplay: 'block', maxWidth: 540, textTransform: 'none', color: '#7C7B7B', display: 'block', fontFamily: 'Poppins', fontStyle: 'italic', fontWeight: 300, fontSize: 12, lineHeight: '28px', opacity: 0.6, margin: { xs: 'auto', md: 'auto auto 32px auto' } }}>
                    *Staking rewards are limited, EQUITY token has max supply
                </Typography>
                </Box>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
