"use client";
import { createConfig } from 'wagmi';
import { abstract } from 'viem/chains';
import { http } from 'wagmi';

export const config = createConfig({
  chains: [abstract] as const,
  transports: {
    [abstract.id]: http('https://api.mainnet.abs.xyz'),
  },
});