import { useCallback, useEffect } from 'react';

import { getAccountInformation } from '../utils/accountUtils';
import useAsyncProcess from './useAsyncProcess';

export default function useGetAccountDetailRequest({ chain, accountAddress }) {
  const { state: accountInformationState, runAsyncProcess: runGetAccountInformationAsyncProcess } = useAsyncProcess();
  const refetchAccountDetail = useCallback(() => {
    if (chain && accountAddress) {
      try {
        runGetAccountInformationAsyncProcess(getAccountInformation(chain, accountAddress));
      } catch (error) {
        console.log(error);
      }
    }
  }, [accountAddress, chain, runGetAccountInformationAsyncProcess]);

  useEffect(() => {
    refetchAccountDetail();
  }, [refetchAccountDetail]);

  return {
    accountInformationState,
    refetchAccountDetail
  };
}
