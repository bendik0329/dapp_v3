/* eslint-disable camelcase */
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { SC1_Address, SC2_Address, BUSD_Address, eABCD_Address, THALES_Address } from '../constant/env';
import { SC1_ABI, SC2_ABI, BEP20_ABI } from '../constant/contractABI';

export const useStakeInfo = () => {
  const { Moralis, account } = useMoralis();
  const [error, setError] = useState({ result: false, message: '' });
  const [success, setSuccess] = useState(false);
  const [busdAveDays, setBUSDAveDays] = useState(0);
  const [eabcdAveDays, setEABCDAbeDays] = useState(0);
  const [busdAmount, setBUSDAmount] = useState(0);
  const [eabcdAmount, setEABCDAmount] = useState(0);

  const [busdDecimal, setBUSDDecimal] = useState(0);
  const [eABCDDecimal, setEABCDDecimal] = useState(0);
  const [THALESDecimal, setTHALESDecimal] = useState(0);

  const [stakePeriod, setStakePeriod] = useState([]);
  const [stakeWeight, setStakeWeight] = useState([1, 3, 8, 36, 100]);
  const [rewardEABCD, setRewardEABCD] = useState(0);
  const [rewardBUSD, setRewardBUSD] = useState(0);
  const [maxBUSD, setMaxBUSD] = useState(0);
  const [maxEABCD, setMaxEABCD] = useState(0);

  const [stakeOwner, setStakeOwner] = useState([]);
  const [stakeAmount, setStakeAmount] = useState([]);
  const [stakeTokenTypes, setStakeTokenTypes] = useState([]);
  const [stakeType, setStakeType] = useState([]);

  const [liveStake, setLiveStake] = useState([]);
  const [completeStake, setCompleteStake] = useState([]);

  const [provider, setProvider] = useState();
  const [isApprove, setIsApprove] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  useEffect(() => {
    getProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getInitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);
  const getInitData = () => {
    if (provider) {
      getTokenDecimals();
      getStakeSpec();
      getStakeData();
      getLiveEvents();
      getCompleteEvents();
      getApproveInfo();
    }
  };
  const getProvider = async () => {
    const rawProvider = await Moralis.enableWeb3();
    setProvider(rawProvider);
  };

  const getStakeData = async () => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, signer);
      const result = await sc2Contract.getStakeData();
      console.log('result of polygon', result);
      setStakeOwner(result[0]);
      setStakeAmount(result[1]);
      setStakeTokenTypes(result[3]);
      setStakeType(result[4]);
    } catch (err) {
      setError({ result: true, message: err.message });
    }
  };
  const getLiveEvents = async () => {
    const ethers = Moralis.web3Library;
    const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, provider);
    const filter = sc2Contract.filters.stakeReal(account);
    const topic = filter.topics;
    const abi = {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Amount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenType',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'stakeType',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'claim',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'date',
          type: 'uint256'
        }
      ],
      name: 'stakeReal',
      type: 'event'
    };
    const option = {
      chain: 'matic',
      address: SC2_Address,
      topic: topic[0],
      abi
    };
    const events = await Web3Api.native.getContractEvents(option);
    console.log('bsc testnet event results', events.result);
    setLiveStake(events.result);
  };
  const getCompleteEvents = async () => {
    const ethers = Moralis.web3Library;
    const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, provider);
    const filter = sc2Contract.filters.stakeEnd(account);
    const topic = filter.topics;
    const abi = {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Amount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenType',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'stakeType',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'claim',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'date',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startDate',
          type: 'uint256'
        }
      ],
      name: 'stakeEnd',
      type: 'event'
    };
    const option = {
      chain: 'matic',
      address: SC2_Address,
      topic: topic[0],
      abi
    };
    const events = await Web3Api.native.getContractEvents(option);
    setCompleteStake(events.result);
  };
  const getStakeSpec = async () => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, signer);
      const period = await sc2Contract
        .getStakingPeriod()
        .catch((err) => setError({ result: true, message: err.data.message }));
      console.log('stking pereoere', Number(period[0]));
      const weight = await sc2Contract
        .getStakingWeight()
        .catch((err) => setError({ result: true, message: err.data.message }));
      const reward1 = await sc2Contract.reward_eABCD_amount();
      const reward2 = await sc2Contract.reward_BUSD_amount();
      const max1 = await sc2Contract._MAX_eABCD();
      const max2 = await sc2Contract._MAX_BUSD();
      console.log('setStakePeriod', stakePeriod);

      setMaxEABCD(max1);
      setMaxBUSD(max2);
      setStakePeriod(period);
      setStakeWeight(weight);
      setRewardEABCD(reward1);
      setRewardBUSD(reward2);
    } catch (err) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  const getTokenDecimals = async () => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const busdContract = new ethers.Contract(BUSD_Address, BEP20_ABI, signer);
      const eabcdContract = new ethers.Contract(eABCD_Address, BEP20_ABI, signer);
      const equityContract = new ethers.Contract(THALES_Address, BEP20_ABI, signer);
      const result1 = await busdContract.decimals();
      const result2 = await eabcdContract.decimals();
      const result3 = await equityContract.decimals();

      setBUSDDecimal(result1);
      setEABCDDecimal(result2);
      setTHALESDecimal(result3);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  //   console.log('amount', Number(stakeAmount[0] / 10 ** busdDecimal));
  //   console.log('stakeowner', stakePeriod.length <= 0);
  useEffect(() => {
    if (stakeOwner.length <= 0 || eABCDDecimal === 0 || stakePeriod.length <= 0) return;
    let busdAmount = 0;
    let eabcdAmount = 0;
    let busdDay = 0;
    let eabcdDay = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < stakeOwner.length; i++) {
      const period = Number(stakePeriod[Number(stakeType[i])]) / (3600 * 24);
      let tokenAmount = stakeAmount[i];
      if (Number(stakeTokenTypes[i]) === 1) {
        tokenAmount = Number(tokenAmount / 10 ** busdDecimal);
        busdDay += period * tokenAmount;
        busdAmount += tokenAmount;
      }
      if (Number(stakeTokenTypes[i]) === 2) {
        tokenAmount = Number(tokenAmount / 10 ** eABCDDecimal);
        eabcdDay += period * tokenAmount;
        eabcdAmount += tokenAmount;
      }

      // if(stakeTokenTypes[i] > 0){
      //     // let now = Date.now() / 1000;
      //     // if(Number(stakeDates[i]) + period <= now)
      //     //     now = Number(stakeDates[i]) + period;
      //     if(stakeTokenTypes[i] == 1){

      //     }
      //     if(stakeTokenTypes[i] == 2){

      //     }

      // }
    }

    if (busdAmount) busdDay /= busdAmount; //
    if (eabcdAmount) eabcdDay /= eabcdAmount; //
    setBUSDAveDays(Number(busdDay));
    setEABCDAbeDays(Number(eabcdDay));
    setBUSDAmount(busdAmount);
    setEABCDAmount(eabcdAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeOwner, eABCDDecimal, stakePeriod]);

  const stakeBUSD = async (amount, _type) => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      if (busdDecimal === 0) {
        setError({ result: false, message: 'decimal error' });
        return;
      }
      const busdContract = new ethers.Contract(BUSD_Address, BEP20_ABI, signer);
      let trx = await busdContract
        .approve(SC2_Address, Moralis.Units.Token(amount, busdDecimal))
        .catch((err) => setError({ result: true, message: err.data.message }));
      await trx.wait(1);
      const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, signer);
      trx = await sc2Contract
        .stakeBUSD(Moralis.Units.Token(amount, busdDecimal), _type)
        .catch((err) => setError({ result: true, message: err.data.message }));
      await trx.wait(1);
      setSuccess(true);
      getInitData();
    } catch (err) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  const stakeEABCD = async (amount, _type) => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const eabcdContract = new ethers.Contract(eABCD_Address, BEP20_ABI, signer);
      if (eABCDDecimal === 0) {
        setError({ result: false, message: 'decimal error' });
        return;
      }
      let trx = await eabcdContract
        .approve(SC2_Address, Moralis.Units.Token(amount, eABCDDecimal))
        .catch((err) => setError({ result: true, message: err.data.message }));
      await trx.wait(1);
      const sc2Contract = new ethers.Contract(SC2_Address, SC2_ABI, signer);
      trx = await sc2Contract
        .stakeEABCD(Moralis.Units.Token(amount, eABCDDecimal), _type)
        .catch((err) => setError({ result: true, message: err.data.message }));
      await trx.wait(1);
      setSuccess(true);
      getInitData();
    } catch (err) {
      setError({ result: true, message: 'unknown Error' });
    }
  };
  const getApproveInfo = async () => {
    const ethers = Moralis.web3Library;
    const sc1Contract = new ethers.Contract(SC1_Address, SC1_ABI, provider);
    const result = await sc1Contract.getAssignToContractForUser(account);
    console.log('aprove', result);
    setIsApprove(result);
  };
  const approveToContract = async () => {
    const ethers = Moralis.web3Library;
    const signer = provider.getSigner();
    const sc1Contract = new ethers.Contract(SC1_Address, SC1_ABI, signer);
    const trx = await sc1Contract
      .assignToContract()
      .catch((err) => setError({ result: true, message: err.data.message }));
    await trx.wait(1);
    setSuccess(true);
    getApproveInfo();
  };
  return {
    account,
    provider,
    busdAveDays,
    eabcdAveDays,
    busdAmount,
    eabcdAmount,
    error,
    success,
    busdDecimal,
    eABCDDecimal,
    THALESDecimal,
    stakeWeight,
    stakePeriod,
    liveStake,
    completeStake,
    isApprove,
    rewardEABCD,
    rewardBUSD,
    maxBUSD,
    maxEABCD,
    approveToContract,
    setSuccess,
    setError,
    stakeBUSD,
    stakeEABCD,
    getInitData
  };
};
