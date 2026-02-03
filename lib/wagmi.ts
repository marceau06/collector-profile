'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';
import { abstract } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'Collector Profile',
  projectId: 'VOTRE_PROJECT_ID',
  chains: [sepolia, abstract],
  ssr: true,
});