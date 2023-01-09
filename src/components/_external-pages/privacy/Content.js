/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container, Typography, Box } from '@material-ui/core';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from './Slide';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 5)
}));

// ----------------------------------------------------------------------

export default function Content() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <Box component="img" alt="light mode" src="/static/slider/right.svg" sx={{ width: { xs: '30px !important', md: '50px !important' }, height: { xs: '30px !important', md: '50px !important' }, zIndex: '2 !important', right: '0 !important' }} />,
    prevArrow: <Box component="img" alt="light mode" src="/static/slider/left.svg" sx={{ width: { xs: '30px !important', md: '50px !important' }, height: { xs: '30px !important', md: '50px !important' }, zIndex: '2  !important', left: '0 !important' }} />
  };
  const data = [
    {
      'category' : 'Stocks',
      'title' : 'Blue and Orange Abstract',
      'description' : 'Swap your stablecoins from one network to another. You can use them later to',
      'image' : '/static/slider/1.png'
    },
    {
      'category' : 'Real Assets',
      'title' : 'Blue and Orange Abstract',
      'description' : 'Swap your stablecoins from one network to another. You can use them later to',
      'image' : '/static/slider/2.png'
    },
    {
      'category' : 'Private Equity',
      'title' : 'Blue and Orange Abstract',
      'description' : 'Swap your stablecoins from one network to another. You can use them later to',
      'image' : '/static/slider/3.png'
    }
    
  ]
  return (
    <RootStyle>
      <Container width='lg' sx={{ position: 'relative', paddingTop: 10 }}>
        <Typography component="p" variant="overline" sx={{ textAlign: 'center', textTransform: 'none', marginBottom: '80px !important', display: 'block', fontFamily: 'Montserrat', fontWeight: '600 !important', fontSize: { xs: '18px !important', md: '26px  !important' }, lineHeight: { xs: '40px !important', md: '50px !important' } }}>
          Investment Opportunities
        </Typography>
        <Slider {...settings}>
          {data.map((item, index) =>
            <Slide key={index} category={item.category} heading={item.title} description={item.description} image={item.image} />
            )}
        </Slider>
      </Container> 
    </RootStyle>
  );
}
