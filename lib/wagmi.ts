import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Collector Profile',
  projectId: 'VOTRE_PROJECT_ID',
  chains: [sepolia],
  ssr: true,
});