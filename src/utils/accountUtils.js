import algosdk from 'algosdk';

import { clientForChain } from './algod';

export const getAccountBalance = (amount) => algosdk.microalgosToAlgos(amount);

export const getAssetByID = (assetId) => {
  const server =
    'https://cosmopolitan-damp-sunset.algorand-mainnet.discover.quiknode.pro/c7c0b2696bfff7209d8f14f10ac733d6d38e556d/index/';
  const client = new algosdk.Indexer('', server, '');
  return new Promise((resolve, reject) => {
    try {
      resolve(client.lookupAssetByID(assetId).do());
    } catch (error) {
      reject(error);
    }
  });
};

export const getAccountInformation = (chain, address) =>
  new Promise((resolve, reject) => {
    try {
      resolve(clientForChain(chain).accountInformation(address).do());
    } catch (error) {
      reject(error);
    }
  });
