/* eslint-disable prettier/prettier */
// material
import { useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import { Container, Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const faqs = [
  {
    quiz: '1. How do I use Backed Capital',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '2. Why should I invest through Backed Capital?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '3. Which are the key features of Backed Capital?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '4. Can I lose my money in Backed Capital?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '5. What fees are involved using Backed Capital?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '6. What is the EQUITY token?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '7. What is the supply of the EQUITY token?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '8. How do I stake the EQUITY token?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '9. What is the asset token?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  },{
    quiz: '10. What is the collateral of the asset token?',
    answer: `A cookie is a small text file containing a unique identification number that identifies a user’s browser each time that user visits a website. The use of cookies is industry standard practice and many major browsers are initially set up to accept them. You can reset your browser to either refuse to accept all cookies or to notify you when you have received a cookie. However, if you refuse to accept cookies, you may not be able to use some of the features available on the Site.`
  }
]

// ----------------------------------------------------------------------

export default function FaqPage() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <RootStyle title="App | Backed Capital" id="move_top">
      <ContentStyle>
        <Container sx={{ position: 'relative', paddingTop: 1, maxWidth: '860px !important' }}>
            <Typography component="p" variant="overline" sx={{ textAlign: 'center', textTransform: 'none', marginBottom: 10, color: '#333333', display: 'block', fontFamily: 'Raleway', fontWeight: 700, fontSize: 48, lineHeight: '64px' }}>
              Frequently Asked Questions
            </Typography>

            {faqs.map(faq => (
              <Accordion key={faq.quiz} expanded={expanded === faq.quiz} onChange={handleChange(faq.quiz)} sx={{ marginBottom: '10px', '&:before': { background: 'transparent' } }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    padding: '30px 40px',
                    backgroundColor: '#FFF'
                  }}
                >
                  <Typography sx={{ width: '90%', flexShrink: 0, fontFamily: 'Raleway', fontWeight: 700, fontSize: '16px', lineHeight: '22px', color: '#333333', fontFeatureSettings: `'pnum' on, 'lnum' on` }}>
                    {faq.quiz}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}
