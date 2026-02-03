"use client";

import 'dotenv/config';
import { Alchemy, Network } from 'alchemy-sdk';

export const fetchUserNFTs = async (address: string) => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    network: Network.ABSTRACT_MAINNET,
  };
  const alchemy = new Alchemy(config);

  const result = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0x0'],
  });

  return result.ownedNfts;
}; 