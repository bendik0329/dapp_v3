import './index.css';

// eslint-disable-next-line react/prop-types
export const ButtonWhite = ({ title, onClick, active }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    style={{ margin: '4px' }}
    className={`bg-white ${active ? 'active-border' : ''} rounded-10 text-black p-8`}
    onClick={() => onClick()}
  >
    {title}
  </button>
);
