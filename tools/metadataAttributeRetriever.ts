// script.ts
import { Alchemy, Network } from 'alchemy-sdk';
import fs from 'fs';
import 'dotenv/config';

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  network: Network.ABSTRACT_MAINNET,
};
const alchemy = new Alchemy(config);

const TEST_NFT_CONTRACT_ADDRESS = '0x0bA85C729745C7Ff0148b865c61a27058e3974d2'
const contractAddress = TEST_NFT_CONTRACT_ADDRESS;
// const contractAddress = process.env.CONTRACT_ADDRESS;

async function extractAttributeTraits() {
  const attributesMap: Record<string, Set<string>> = {};

  if(contractAddress)
    for await (const nft of alchemy.nft.getNftsForContractIterator(contractAddress)) {
      const metadata = nft.raw?.metadata;
      if (!metadata?.attributes) continue;

      for (const attr of metadata.attributes) {
        const { trait_type, value } = attr;
        if (!attributesMap[trait_type]) {
          attributesMap[trait_type] = new Set();
        }
        attributesMap[trait_type].add(value);
      }
    }

  const result: Record<string, string[]> = {};
  for (const [trait, values] of Object.entries(attributesMap)) {
    result[trait] = Array.from(values);
  }

  // Sauvegarde dans un fichier JSON
  fs.writeFileSync('../ressources/traits.json', JSON.stringify(result, null, 2));
  console.log('Fichier traits.json généré avec succès.');
}

extractAttributeTraits();   