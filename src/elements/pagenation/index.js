/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { whitespace } from 'stylis';
import useSettings from '../../hooks/useSettings';

export const Pagenation = ({ pageSize, current, total, onChange }) => {
  const { onChangeMode, themeMode } = useSettings();
  const prev = () => {
    if (current - 1 >= 1) onChange(current - 1);
  };
  const next = () => {
    let max = 0;
    const minus = total % pageSize;
    if (minus === 0) max = total / pageSize;
    else max = Math.floor(total / pageSize) + 1;
    if (current + 1 <= max) onChange(current + 1);
  };
  // useEffect(()=>{
  //     let max = 0;
  //     let minus = total % pageSize;
  //     if(minus == 0)
  //         max = total / pageSize;
  //     else
  //         max = Math.floor(total / pageSize) + 1;

  //     console.log("max", max, total);
  // },[total])

  useEffect(() => {
    onChange(current);
  }, [current]);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <a
        onClick={prev}
        style={themeMode === 'dark' ? { color: 'white', padding: '4px' } : { color: 'black', padding: '4px' }}
      >
        {'< '}
      </a>
      <span>{`Page ${current}`}</span>
      <a
        onClick={next}
        style={themeMode === 'dark' ? { color: 'white', padding: '4px' } : { color: 'black', padding: '4px' }}
      >
        {' '}
        {' >'}{' '}
      </a>
    </div>
  );
};
