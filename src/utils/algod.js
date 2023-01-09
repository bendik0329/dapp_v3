import algosdk from 'algosdk';

export const ChainType = {
  MainNet: 'mainnet',
  TestNet: 'testnet'
};

const mainNetClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', '');
const testNetClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

export const clientForChain = (chain) => {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetClient;
    case ChainType.TestNet:
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
};

export const apiGetTxnParams = async (chain) => {
  const params = await clientForChain(chain).getTransactionParams().do();
  return params;
};
