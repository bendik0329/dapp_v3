/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import { Typography, Box } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
// ----------------------------------------------------------------------

export default function Slide(props) {
  const showClick = props.category === "Stocks";
  const handleOnClickNull = () => {};
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate('/invest_detail', {replace: true}), [navigate]);
  return (
    <Box onClick={showClick ? handleOnClick : handleOnClickNull}  sx={{cursor: 'pointer'}}>
      <Box
        component="img"
        alt="light mode"
        src={props.image}
        sx={{ margin: { xs: 'auto', md: '0 auto' }, maxWidth: { xs: 300, md: '100%' }, borderRadius: '20px' }}
      />
      <Typography component="p" variant="overline" className="slider-category">
        {props.category}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          width: { xs: '220px', md: '300px' },
          margin: { xs: '10px 55px', md: '10px 40px' }
        }}
      >
        <Typography component="p" variant="overline" className="slider-bottom-heading">
          {props.heading}
        </Typography>
        <Typography component="p" variant="overline" className="slider-bottom-sub-heading">
          {props.description}
        </Typography>
      </Box>
    </Box>
  );
}
