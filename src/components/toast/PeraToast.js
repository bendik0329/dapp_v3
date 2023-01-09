import './_pera-toast.scss';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

PeraToast.propTypes = {
  message: PropTypes.node,
  customClassName: PropTypes.string
};

export default function PeraToast({ message, customClassName }) {
  return (
    <div className={classNames('pera-toast', customClassName)}>
      <div>{message}</div>
    </div>
  );
}
