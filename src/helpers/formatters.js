import numeral from 'numeral';

export const n6 = new Intl.NumberFormat('en-us', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 6
});
export const n4 = new Intl.NumberFormat('en-us', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 4
});

export const c2 = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return '';
};

export const tokenValue = (value, decimals) => {
  let pattern = '';
  for (let i = 0; i < decimals; i += 1) {
    pattern += '0';
  }
  return numeral(value).format(`0,0.[${pattern}]`);
};

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (value, symbol) => `${numeral(value).format(`0,0.[000]`)} ${symbol}`;

export const numberWithCommas = (x) => {
  const numParts = x.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numParts.join('.');
};
export const numberWithOutCommas = (s) => {
  console.log('bug', s);
  return s.toString().replace(/,/g, '');
};
