/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import useSettings from '../hooks/useSettings';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginBottom: 50
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard() {
  const { themeMode } = useSettings();
  const main = "https://widget.onramper.com?color=266677&defaultCrypto=ALGO&onlyCryptos=USDC_ALGO,ALGO,USDT_ALGO&defaultFiat=USD&supportSell=false&supportSwap=false&apiKey=pk_prod_tA3GMVyUU1tes3GK183g8_aQo9mUzIE1WWQXBUE30Os0&darkMode=";
  const mode = themeMode === 'dark' ? 'true' : 'false'; 
  const url = main+mode;
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ background: themeMode === 'dark' ? '#383838' : '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <iframe src={url}
        title="Onramper widget"
        height='660px'
        width= '482px'
        allow="accelerometer; autoplay; camera; gyroscope; payment"
        style={{ border: 0 }}
        />
      </div>
    </Card>
  );
}
