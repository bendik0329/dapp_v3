/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-ant-design/apple-filled';
import google from '@iconify/icons-ant-design/google-circle-filled';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import UserPool from '../UserPool';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
//   padding: theme.spacing(5, 0, 10)
}));


// ----------------------------------------------------------------------

export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const tryLogin = () => {
    // console.log(email)
    if(!email || !password){
      setEmailError( !email ? "Email is required" : null);
      setPasswordError( !password ? "Password is required" : null);
    }else{
      setError(null)
      setSuccess(null)
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('login success', result);
          setSuccess('User Logged in Successfully');
          localStorage.setItem('user_data', JSON.stringify(result));
          navigate('/');
        },
        onFailure: (err) => {
          setError(err.message)
          console.log('login failure', err);
        },
        newPasswordRequired: (data) => {
          setError('new password required')
          console.log('new password required', data);
          
        },
      });
      // console.log("All Fields set.  Ready to Login")
    }
  }
useEffect(() => {

  
  
    
  

  // if(appleLogin || googleLogin){
    if(window.location.pathname=== '/auth/success'){
      localStorage.setItem('user_data', JSON.stringify('acces_token:sdfklds209384903mdfhfdsfjds'));
      navigate('/');
  }
  
}, []);
  return (
    <RootStyle sx={{  paddingLeft: 0, paddingRight : 0, background: '#f5f5f5' }}>
        <Container className='widget-heading' maxWidth="xl" sx={{  position: 'relative',  paddingLeft: '0 !important', paddingRight : '0 !important' }}>
          <Grid container spacing={0} justifyContent="space-between" alignItems="flex-start"  sx={{  paddingLeft: 0, paddingRight : 0  }}>
            <Grid item xs={12} md={5} padding={5} paddingBottom={2} height= '100vh' sx={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflow: 'auto', '&::-webkit-scrollbar': { display: 'none'}}}>
              <Box component="img" src="/static/logo_light.png" width="130px"/>
              <Box sx={{width: '100%',  paddingTop: '40px'}} justifyContent="center">
                <Box sx={{maxWidth:{ xs: 280, md: 380 }, margin: '0 auto'}}>
                  <Typography sx={{fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '60px',
                  color: '#000000'}}>
                     Log in
                  </Typography>
                  <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.02em',
                    color: '#000000',
                    opacity: '0.5',
                  }}>
                    Welcome back to Backed Capital
                  </Typography>
                  <Box sx={{ height: '100%', marginTop: 5}}>
                    <Typography sx={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '21px',
                      letterSpacing: '0.02em',
                      color: '#000000',
                      opacity: '0.5',
                      padding: '10px 0px'
                    }}
                      >Email</Typography>
                    <Box display="flex" flexDirection="column">
                    <input  placeholder='Email'  type="text" placeholde="Email"  className='auth-input' sx={{width: {xs: 300, md: 400}}}
                     onChange={event => setEmail(event.target.value)}
                    />
                    { emailError && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal',
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'red'}}>{emailError}</span>
                      }
                    </Box>
                    
                    <Typography sx={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '21px',
                      letterSpacing: '0.02em',
                      color: '#000000',
                      opacity: '0.5',
                      padding: '10px 0px'
                    }}
                      >Password</Typography>
                      <Box display="flex" flexDirection="column">
                      <input placeholder='Password'  type="password" placeholde="Pssword" className='auth-input' sx={{ width: {xs: 300, md: 400}}}
                       onChange={event => setPassword(event.target.value)}
                      />
                      { passwordError && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal',
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'red'}}>{passwordError}</span>
                      }
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: 3 }}>
                     <Typography sx={{paddingLeft: 10, color: '#00000099'}}><a href='https://equityswap.auth.us-east-2.amazoncognito.com/forgotPassword?client_id=5s8jqussath0biforh3qc3j7pa&response_type=code&scope=email+openid+phone+profile+aws.cognito.signin.user.admin&redirect_uri=https://app.equityswap.io/auth/success' style={{textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', color: '#00000099'}}>Forgot password</a></Typography>
                    </Box>
                    { error && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal', 
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'red'}}>{error}</span>
                    }
                    { success && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal', 
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'green'}}>{success}</span>
                    }
                    <Button
                      variant="contained"
                      onClick={() => {
                        tryLogin();
                      }}
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                        fontFamily: 'Poppins',
                        width: { xs: 'auto', md: 'auto' },
                        fontWeight: 400,
                        borderRadius: '0',
                        background: '#000000',
                        boxShadow: 'none',
                        padding: {xs: '12px 120px', md: '12px 125px'},
                        marginTop: 3,
                        
                        '&:hover': {
                          opacity: '80%'
                        }
                      }}
                    >
                      Sign in
                  </Button>
                  <Box sx={{  marginTop: 3, width: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                  <Button
                      variant="contained"
                      onClick={() => {
                        window.location.href='https://equityswap.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=SignInWithApple&redirect_uri=https://app.equityswap.io/auth/success&response_type=CODE&client_id=5s8jqussath0biforh3qc3j7pa&scope=email openid phone profile aws.cognito.signin.user.admin'
                   
                      }}
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                        fontFamily: 'Poppins',
                        width: { xs: 'auto', md: 'auto' },
                        fontWeight: 400,
                        background: '#fff',
                        boxShadow: 'none',
                        padding: '5px 65px',
                        margin: '0px',
                        color: '#000',
                        border: 1,
                        borderColor: '#00000059',
                        borderRadius:'5px',
                        borderWidth: 1,
                        '&:hover': {
                          opacity: '80%',
                          color: '#fff'
                        }
                      }}
                    >
                       <Icon icon={homeFill} fontSize={32} style={{marginRight: 12}} />Sign in with Apple
                  </Button>
                  
                  <Button
                      variant="contained"
                      onClick={() => {
                        window.location.href='https://equityswap.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://app.equityswap.io/auth/success&response_type=CODE&client_id=5s8jqussath0biforh3qc3j7pa&scope=email openid phone profile aws.cognito.signin.user.admin'
                      }}
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                        fontFamily: 'Poppins',
                        width: { xs: 'auto', md: 'auto' },
                        fontWeight: 400,
                        background: '#fff',
                        boxShadow: 'none',
                        padding: '5px 70px',
                        marginTop: '8px',
                        color: '#000',
                        border: 1,
                        borderColor: '#00000059',
                        borderRadius:'5px',
                        borderWidth: 1,
                        '&:hover': {
                          opacity: '80%',
                          color: '#fff'
                        }
                      }}
                    >
                      <Icon icon={google} style={{marginRight: 4}} fontSize={28} />Sign in with Google
                  </Button>
                  </Box>
                  </Box>
                  <Typography sx={{marginTop: 2 , paddingLeft: 2, color: '#00000099', fontFamily: 'Poppins'}}>Don’t have an account?  <a href='/auth/register' style={{textDecoration: 'none', fontWeight: 'bold', color: '#00000099'}}>Sign up</a></Typography>
                </Box>
              </Box>
              
            </Grid>
            <Grid item xs={12} md={7} className='bg-auth'  sx={{ height: '100vh', display: {xs: 'none', md: 'block'} , paddingLeft: 0, paddingRight : 0  }}>
              {/* <Box component="img" src="/static/auth.png" sx={{width: '100%'}} /> */}
            </Grid>
          </Grid>
        </Container>
    </RootStyle>
  );
}
