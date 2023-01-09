/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Stack, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0, 20)
}));

const members = [
    {
        "image": '/static/home/test.png',
        "name": "VRO",
        "detail": "Vlad",
        "twitter": "#",
        "instagram": "#"
    },{
        "image": '/static/home/test.png',
        "name": "CMS",
        "detail": "Carlos",
        "twitter": "#",
        "instagram": "#"
    },{
        "image": '/static/home/test.png',
        "name": "JCA",
        "detail": "Juan Carlos",
        "twitter": "#",
        "instagram": "#"
    },{
        "image": '/static/home/test.png',
        "name": "AYA",
        "detail": "ALeksander",
        "twitter": "#",
        "instagram": "#"
    }
]

// ----------------------------------------------------------------------

export default function Ourteam() {
  return (
    <RootStyle>
        <Container maxWidth="lg" sx={{ position: 'relative', paddingTop: 10 }}>
            <Typography component="p" variant="overline" sx={{ textTransform: 'none', marginBottom: 10, color: 'common.black', display: 'block', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: 32, md: 42 }, lineHeight: { xs: '70px', md: '92px' } }}>
                Our Team
            </Typography>
            <Grid container spacing={5} justifyContent="space-between" alignItems="flex-start">
                {members.map(member => (
                    <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative' }} key={member.name}>
                        <Box component="p" sx={{ width: 200, height: 200, backgroundColor: '#141721', borderRadius: '10px', margin: 'auto' }} />
                        <Typography component="p" sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 24, lineHeight: '36px', color: '#2B2C43', maxWidth: 200, margin: '20px auto 0' }}>
                            { member.name }
                        </Typography>
                        <Typography component="p" sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#2B2C43', opacity: 0.5, maxWidth: 200, margin: 'auto' }}>
                            { member.detail }
                        </Typography>
                        <Stack direction="row" sx={{ maxWidth: 200, margin: 'auto' }}>
                            <Link
                                to={member.twitter}
                                color="#A2A9B0"
                                variant="body2"
                                component={RouterLink}
                                sx={{
                                    marginTop: '20px'
                                }}
                            >
                                <Box component="img" src="/static/home/ic_twitter.svg" alt="twitter icon" />
                            </Link>
                            <Link
                                to={member.instagram}
                                color="#A2A9B0"
                                variant="body2"
                                component={RouterLink}
                                sx={{
                                    marginTop: '20px',
                                    marginLeft: '10px'
                                }}
                            >
                                <Box component="img" src="/static/home/ic_instagram.svg" alt="instagram icon" />
                            </Link>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </RootStyle>
  );
}
