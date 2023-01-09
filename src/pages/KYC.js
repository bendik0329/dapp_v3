/* eslint-disable prettier/prettier */
// material
import { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import { Container, Typography} from '@material-ui/core';
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import axios from "axios";
import crypto from "crypto";
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#F8F9FA',
  padding: theme.spacing(20, 0, 15)
}));

const ContentStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative'
}));

const API_TOKEN = "9db5ac23-8175-4f0c-8d75-151ebe7f98b5";
const API_SECRET = "0e0f46fe-0f3b-4288-8fe9-9e4b4e4ceb7f";

export function generateSignature(payloadAsString, apiPrivateKey) {

  const signature = crypto
  .createHmac('sha256', apiPrivateKey)
  .update(Buffer.from(payloadAsString, 'utf8'))
  .digest('hex')
  .toLowerCase();
  console.log("X-HMAC-SIGNATURE", signature)
  return signature;
}
export function testStatus(){
  // const sessionID = "62c5a13b-fcbb-426d-a7ff-937de05b33c3";
  // generateSignature(sessionID, API_SECRET);
}

// ----------------------------------------------------------------------

export default function KYCPage() {
  const [veriffStatus, setVeriffStatus] = useState(false);

// Get Previous Session
  const PreviousSession = () => {
    const sessionID = localStorage.getItem('sessionID');
    const sessionUrl =localStorage.getItem('sessionUrl');
    // console.log(sessionID, " - ",sessionUrl)
    createVeriffFrame({
      url: sessionUrl,
      onEvent: (msg) => {
        switch (msg) {
          case MESSAGES.CANCELED:
            //
            break;
          case MESSAGES.FINISHED:
            fetch(`https://stationapi.veriff.com/v1/sessions/${sessionID}/decision`, {
              method: 'GET',
              headers: {
                'Accept' : 'application/json',
                'X-AUTH-CLIENT': API_TOKEN,
                'X-HMAC-SIGNATURE' : generateSignature(sessionID, API_SECRET)
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          default:
        }
      }
    });
  }

  useEffect(() => {
    // testStatus()
    
    if(!localStorage.getItem('sessionID') && !localStorage.getItem('sessionUrl')){
     
      const nows =new Date();
      const dateString = nows.toISOString();
      const info = JSON.stringify({
        "verification": {
          "callback": "https://veriff.com",
          "person": {
            "firstName": "John",
            "lastName": "Smith",
            "idNumber": "123456789"
          },
          "vendorData": " ",
          "timestamp": dateString
        }
      });
      const headers = { 
        'content-type': 'application/json',
        'X-AUTH-CLIENT': API_TOKEN,
      };
      
      axios.post('https://stationapi.veriff.com/v1/sessions', info, { headers })
        .then(response => {
          console.log('hre', response.data)
          if( response.data.status === "success"){
            localStorage.setItem('veriff_data', JSON.stringify(response));
            localStorage.setItem('sessionUrl', response.data.verification.url);
            localStorage.setItem('sessionID', response.data.verification.id);
            const sessionUrl = response.data.verification.url;
            const sessionID = response.data.verification.id;
            createVeriffFrame({
              url: sessionUrl,
              onEvent: (msg) => {
                switch (msg) {
                  case MESSAGES.CANCELED:
                    //
                    break;
                  case MESSAGES.FINISHED:
                    fetch(`https://stationapi.veriff.com/v1/sessions/${sessionID}/decision`, {
                    method: 'GET',
                    headers: {
                      'Accept' : 'application/json',
                      'X-AUTH-CLIENT': API_TOKEN,
                      'X-HMAC-SIGNATURE' : generateSignature(sessionID, API_SECRET)
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('Success:', data);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                    break;
                  default:
                }
              }
            });
          }
          })
        .catch(error => {
            console.error('There was an error!', error);
        });

    }
    else{
      console.log("Going for previous");
      // window.location.href=JSON.parse(localStorage.getItem('veriff_data')).verification.url
      PreviousSession();
    }        
  }, []);
  return (
    <RootStyle title="App | Backed Capital" id="move_top">
      <ContentStyle>
        <Container sx={{ position: 'relative', paddingTop: 1, maxWidth: '860px !important', flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'center', textTransform: 'none', marginBottom: 10, color: '#333333', display: 'block', fontFamily: 'Raleway', fontWeight: 700, fontSize: 48, lineHeight: '64px' }}>
              Verification Page
            </Typography>
           
            <div id='veriff-root' style={{width:'400px'}}> {veriffStatus ? "Verified"  : "Not Verified"} </div>

        </Container>
      </ContentStyle>
    </RootStyle>
  );
}
