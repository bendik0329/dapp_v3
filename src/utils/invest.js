/* eslint-disable eqeqeq */
/* eslint-disable import/order */
/* eslint-disable camelcase */
import { SC1_ABI, SC2_ABI, SC3_ABI, BEP20_ABI } from '../constant/contractABI';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { SC1_Address, SC2_Address, SC3_Address, BUSD_Address, eABCD_Address } from '../constant/env';

export const useInvestInfo = () => {
  const { Moralis, account } = useMoralis();
  const [error, setError] = useState({ result: false, message: '' });
  const [success, setSuccess] = useState(false);
  const [busdDecimal, setBUSDDecimal] = useState(0);
  const [eABCDDecimal, setEABCDDecimal] = useState(0);

  const [feePlan, setFeePlan] = useState(0);
  const [priceOracle, setPriceOracle] = useState(0);
  const [provider, setProvider] = useState();
  const [priceHistory, setPriceHistory] = useState([]);
  const [isApprove, setIsApprove] = useState(false);
  const [totalEABCD, setTotalEABCD] = useState(0);
  const [eABCDHolders, setEABCDHolders] = useState(0);

  const Web3Api = useMoralisWeb3Api();
  useEffect(() => {
    getProvider();
  }, []);
  useEffect(() => {
    initData();
  }, [provider]);
  const initData = () => {
    if (provider) {
      getTokenDecimals();
      getPriceOracle();
      getFeePlan();
      getPriceHistory();
      getApproveInfo();
    }
  };
  const getApproveInfo = async () => {
    const ethers = Moralis.web3Library;
    const SC1_contract = new ethers.Contract(SC1_Address, SC1_ABI, provider);
    const result = await SC1_contract.getAssignToContractForUser(account).catch((err) =>
      setError({ result: true, message: err.data.message })
    );
    console.log('aprove', result);
    setIsApprove(result);
  };
  const approveToContract = async () => {
    const ethers = Moralis.web3Library;
    const signer = provider.getSigner();
    const SC1_contract = new ethers.Contract(SC1_Address, SC1_ABI, signer);
    const trx = await SC1_contract.assignToContract().catch((err) =>
      setError({ result: true, message: err.data.message })
    );
    await trx.wait(1);
    setSuccess(true);
    getApproveInfo();
  };

  const getProvider = async () => {
    const rawProvider = await Moralis.enableWeb3();
    setProvider(rawProvider);
  };

  const getPriceHistory = async () => {
    console.log('getting price history');
    const ethers = Moralis.web3Library;
    const SC3_contract = new ethers.Contract(SC3_Address, SC3_ABI, provider);
    const filter = SC3_contract.filters.updatePrice();
    const topic = filter.topics;
    const abi = {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'date',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        }
      ],
      name: 'updatePrice',
      type: 'event'
    };
    const option = {
      chain: 'matic',
      address: SC3_Address,
      topic: topic[0],
      abi
    };
    const events = await Web3Api.native.getContractEvents(option);
    console.log('price history', events.result);
    setPriceHistory(events.result);
  };
  // const getPriceHistory = async()=>{
  //     type options = {
  //         chain?: "eth" | "0x1" | "ropsten" | "0x3" | "rinkeby" | "0x4" | "goerli" | "0x5" | "kovan" | "0x2a" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | undefined;
  //         subdomain?: string | undefined;
  //         from_block?: number | undefined;
  //         to_block?: number | undefined;
  //         from_date?: string | undefined;
  //         to_date?: string | undefined;
  //         offset?: number | undefined;
  //         limit?: number | undefined;
  //     } & {
  //         address: string;
  //     };
  //     const option : options = {
  //         chain: "bsc testnet",
  //         address: SC3_Address,
  //         from_block: 0,
  //       };
  //     const bscTransactions = await Web3Api.account.getTransactions(option);
  //     console.log("getHistory", bscTransactions);
  // }
  const buyOrder = async (amount) => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const BUSD_contract = new ethers.Contract(BUSD_Address, BEP20_ABI, signer);
      const SC1_contract = new ethers.Contract(SC1_Address, SC1_ABI, signer);
      let trx = await BUSD_contract.approve(SC1_Address, Moralis.Units.Token(amount, busdDecimal)).catch((err) =>
        setError({ result: true, message: err.data.message })
      );
      await trx.wait(1);
      trx = await SC1_contract.buyOrder(Moralis.Units.Token(amount, busdDecimal)).catch((err) =>
        setError({ result: true, message: err.data.message })
      );
      await trx.wait(1);
      setSuccess(true);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  const sellOrder = async (amount) => {
    try {
      const ethers = Moralis.web3Library;
      const signer = provider.getSigner();
      const eABCD_contract = new ethers.Contract(eABCD_Address, BEP20_ABI, signer);
      const SC2_contract = new ethers.Contract(SC2_Address, SC2_ABI, signer);
      let trx = await eABCD_contract
        .approve(SC2_Address, Moralis.Units.Token(amount, eABCDDecimal))
        .catch((err) => setError({ result: true, message: err.data.message }));
      await trx.wait(1);
      trx = await SC2_contract.sellOrderForEABCD(Moralis.Units.Token(amount, eABCDDecimal)).catch((err) =>
        setError({ result: true, message: err.data.message })
      );
      await trx.wait(1);
      setSuccess(true);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  const estimationBuyPrice = (amount, direction = true) => {
    if (feePlan == 0 || eABCDDecimal == 0 || busdDecimal == 0 || priceOracle == 0) return { result: false, data: 0 };
    let estimation = 0;

    console.log('fee', feePlan);
    if (direction) {
      estimation = (amount * (100 * 1000 - Number(feePlan))) / 1000 / 100 / priceOracle;
    } else {
      estimation = (amount * 1000 * 100 * priceOracle) / (100 * 1000 - Number(feePlan));
    }

    return { result: true, data: estimation };
  };

  const estimationSellPrice = (amount, direction = true) => {
    if (feePlan == 0 || eABCDDecimal == 0 || busdDecimal == 0 || priceOracle == 0) return { result: false, data: 0 };
    let estimation = 0;
    if (direction) {
      estimation = (amount * priceOracle * (100 * 1000 - Number(feePlan))) / 100 / 1000;
    } else {
      estimation = (amount * 1000 * 100) / priceOracle / (100 * 1000 - Number(feePlan));
    }

    return { result: true, data: estimation };
  };
  // get Fee Plan and get total number of eABCD holders
  const getFeePlan = async () => {
    try {
      const ethers = Moralis.web3Library;
      const SC1_contract = new ethers.Contract(SC1_Address, SC1_ABI, provider);
      const result = await SC1_contract._getFeeForBuyer(account);
      const owners = await SC1_contract.getWhiteList();
      setFeePlan(result);
      setEABCDHolders(owners.length);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  const getPriceOracle = async () => {
    try {
      const ethers = Moralis.web3Library;
      const SC3_contract = new ethers.Contract(SC3_Address, SC3_ABI, provider);
      const result = await SC3_contract.getAssetPrice();

      setPriceOracle(result);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };
  const getTokenDecimals = async () => {
    try {
      const ethers = Moralis.web3Library;
      const BUSD_contract = new ethers.Contract(BUSD_Address, BEP20_ABI, provider);
      const eABCD_contract = new ethers.Contract(eABCD_Address, BEP20_ABI, provider);
      const result1 = await BUSD_contract.decimals();
      const result2 = await eABCD_contract.decimals();
      const total = await eABCD_contract.totalSupply();

      setTotalEABCD(total);
      setBUSDDecimal(result1);
      setEABCDDecimal(result2);
    } catch (error) {
      setError({ result: true, message: 'unknown Error' });
    }
  };

  return {
    buyOrder,
    sellOrder,
    estimationBuyPrice,
    estimationSellPrice,
    setSuccess,
    setError,
    totalEABCD,
    priceOracle,
    isApprove,
    eABCDDecimal,
    eABCDHolders,
    approveToContract,
    priceHistory,
    invest_success: success,
    invest_error: error
  };
};
