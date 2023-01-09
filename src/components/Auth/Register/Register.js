/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-ant-design/apple-filled';
import google from '@iconify/icons-ant-design/google-circle-filled';
import { useNavigate} from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
//   padding: theme.spacing(5, 0, 10)
}));


// ----------------------------------------------------------------------

export default function Register() {

  const navigate = useNavigate();
  
  const createAccount= () => {
    if(!userName || !email || !password || !terms){
      setEmailError( !email ? "Email is required" : null);
      setTermsError( !terms ? "You have to agree with Terms and Conditions" : null);
      setPasswordError( !password ? "Password is required" : null);
      setUserNameError( !userName ? "Username is required" : null);
    }else{
      setEmailError(null);
      setTermsError(null);
      setPasswordError(null);
      const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name:  'email',
        Value: email,
      })
    );
    UserPool.signUp(userName, password, attributeList, null, (err, data) => {
      if (err) {
        setError(err.message);
        console.log('err',err.message);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        setSuccess('User Added Successfully');
        // alert('User Added Successfully');
        // localStorage.setItem('user_data', JSON.stringify(data));
        navigate('/auth/login');
      }
    });
 
    }
   
  }

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);
  const [terms, setTerms] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [termsError, setTermsError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);
  return (
    <RootStyle sx={{  paddingLeft: 0, paddingRight : 0, background: '#f5f5f5'  }}>
        <Container className='widget-heading' maxWidth="xl" sx={{  position: 'relative', paddingLeft: '0 !important', paddingRight : '0 !important' }}>
          <Grid container spacing={0} justifyContent="space-between" alignItems="flex-start"  sx={{  paddingLeft: 0, paddingRight : 0  }}>
            <Grid item xs={12} md={5} padding={5} paddingBottom={2}  height= '100vh' sx={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflow: 'auto', '&::-webkit-scrollbar': { display: 'none'}}}>
              <Box component="img" src="/static/logo_light.png" width="130px"/>
              <Box sx={{width: '100%', paddingTop: '40px'}} justifyContent="center">
                <Box sx={{maxWidth:{ xs: 280, md: 380 }, margin: '0 auto'}}>
                  <Typography sx={{fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '60px',
                  color: '#000000'}}>
                     Sign up
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
                    Welcome to Backed Capital
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
                      >Username</Typography>
                    <Box display="flex" flexDirection="column">
                    <input  placeholder='Username'  type="text"   className='auth-input' sx={{width: {xs: 300, md: 400}}}
                     onChange={event => setUserName(event.target.value)}
                    />
                    { userNameError && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal',
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'red'}}>{userNameError}</span>
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
                    <Box sx={{ display: 'flex', marginTop: 5 }}>
                    <input type="checkbox" checked={terms}
                      onChange={event => setTerms(event.target.checked)} /> 
                      <Typography sx={{paddingLeft: 1, color: '#00000099'}}>Agree with <a href='https://www.equityswap.io/terms' style={{textDecoration: 'none', fontWeight: 'bold', color: '#00000099'}}>Terms and Conditions</a></Typography>
                    </Box>
                    { termsError && <span style={{
                       fontFamily: 'Poppins',
                       fontStyle: 'normal', 
                       fontWeight: 400,
                       fontSize: '14px',
                       lineHeight: '21px',
                       letterSpacing: '0.02em',
                       padding: 5,
                      color: 'red'}}>{termsError}</span>
                    }
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
                       createAccount()
                      }}
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                        fontFamily: 'Poppins',
                        width: { xs: 'auto', md: 'auto' },
                        fontWeight: 400,
                        borderRadius: '0',
                        background: '#000000',
                        boxShadow: 'none',
                        padding: '12px 100px',
                        marginTop: 5,
                        '&:hover': {
                          opacity: '80%'
                        }
                      }}
                    >
                      Create Account
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
                  <Typography sx={{marginTop: 2 , paddingLeft: 3, color: '#00000099', fontFamily: 'Poppins'}}>Already have Account? <a href='/auth/login' style={{textDecoration: 'none', fontWeight: 'bold', color: '#00000099'}}>Login</a></Typography>
                </Box>
              </Box>
              
            </Grid>
            <Grid className='bg-auth' item xs={12} md={7}  sx={{ display: { height: '100vh', xs: 'none', md: 'block'} , paddingLeft: 0, paddingRight : 0}}>
              {/* <Box component="img" src="/static/auth.png" sx={{width: '100%'}} /> */}
            </Grid>
          </Grid>
        </Container>
    </RootStyle>
  );
}
