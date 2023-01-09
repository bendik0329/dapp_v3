import { useLayoutEffect } from 'react';

function useOnUnmount(callback) {
  useLayoutEffect(
    () => () => {
      if (callback) {
        callback();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

export default useOnUnmount;
