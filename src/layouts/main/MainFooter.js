import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Link, Divider, Container, Typography, Button, Stack, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Service',
    children: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Audit', href: '#' },
      { name: 'Explorer', href: '#' },
      { name: 'Technology', href: '#' }
    ]
  },
  {
    headline: 'Company',
    children: [
      { name: 'Team', href: '/team' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  }
];

const RootStyle = styled('div')(() => ({
  position: 'relative',
  backgroundColor: '#141721'
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle id="footer" className="#footer">
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 5 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={8} md={3} mt={3}>
            <ScrollLink to="move_top" spy smooth mb={8}>
              <Box
                component="img"
                src="/static/home/logo-sm.png"
                alt="logo"
                sx={{ width: 125, margin: { xs: '0 auto', md: '0' } }}
              />
            </ScrollLink>
            <Typography
              variant="body2"
              sx={{
                pr: { md: 5 },
                fontFamily: '"Roboto", sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#A2A9B0',
                marginTop: '20px',
                paddingLeft: '5px',
                maxWidth: '240px',
                textAlign: { xs: 'center', md: 'left' },
                margin: { xs: '0 auto', md: '30px 0 0' }
              }}
            >
              Bringing real world assets to the blockchain
            </Typography>
          </Grid>

          <Grid item xs={12} md={9} mb={10}>
            <Grid container>
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Grid item xs={6} md={3} key={headline}>
                    <Typography
                      component="p"
                      variant="overline"
                      color="#FEFFFF"
                      sx={{
                        fontFamily: 'Raleway',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '22px',
                        textTransform: 'capitalize',
                        marginTop: { md: '30px', mb: '60px', xs: '60px' }
                      }}
                    >
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="#A2A9B0"
                        variant="body2"
                        component={RouterLink}
                        sx={{
                          display: 'block',
                          fontFamily: 'Roboto',
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: 1.5,
                          marginTop: '30px'
                        }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Grid>
                );
              })}
              <Grid item xs={12} md={6}>
                <Typography
                  component="p"
                  variant="overline"
                  color="#FEFFFF"
                  sx={{
                    fontFamily: 'Raleway',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '22px',
                    textTransform: 'capitalize',
                    marginTop: { md: '30px', mb: '60px', xs: '60px' }
                  }}
                >
                  Subscribe for Backed Capital newsletter
                </Typography>
                <Typography
                  color="#A2A9B0"
                  variant="body2"
                  component="p"
                  sx={{
                    display: 'block',
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: 1.5,
                    marginTop: '20px'
                  }}
                >
                  Your Email
                </Typography>
                <Stack direction="row" mt={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Box
                    component="input"
                    type="email"
                    placeholder="Enter Your Email"
                    sx={{
                      padding: '17px',
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      background: '#3B4857',
                      border: '1px solid #636D79',
                      color: '#FFF',
                      flex: 1,
                      maxWidth: 296,
                      '&:focus': { borderColor: '#CCC', outline: 'none' }
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '16px',
                      padding: '10px 17px',
                      minWidth: 150,
                      borderRadius: '0px',
                      background: '#FFF',
                      color: '#000',
                      marginLeft: '10px',
                      '&:hover': {
                        background: '#EEE'
                      }
                    }}
                  >
                    Subscribe
                  </Button>
                </Stack>
                <Stack direction="row" mt={2} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Box component="img" src="/static/home/ic_reddit.png" alt="reddit icon" />
                  <Box component="img" src="/static/home/ic_twitter.png" alt="twitter icon" ml={2} />
                  <Box component="img" src="/static/home/ic_github.png" alt="github icon" ml={2} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <hr />

        <Stack direction="row" justifyContent="space-between">
          <Typography
            component="p"
            variant="body2"
            sx={{
              mt: 5,
              pb: 8,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Roboto',
              color: '#A2A9B0'
            }}
          >
            © 2022 Backed Capital
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              mt: 5,
              pb: 8,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Roboto',
              color: '#A2A9B0'
            }}
          >
            <Box
              component="img"
              alt="mailbox"
              src="/static/home/mailbox.png"
              sx={{ display: 'inline-block', marginRight: '10px', marginBottom: '-3px' }}
            />
            info@equityswap.io
          </Typography>
        </Stack>
      </Container>
    </RootStyle>
  );
}
