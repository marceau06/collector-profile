// lib/traitMatchingService.ts
import { fetchUserNFTs } from './nftService';
import { fetchAllTraits } from './traitService';

export async function checkTraitCompleteness(address: string) {
  try {
    const [nfts, allTraits] = await Promise.all([
      fetchUserNFTs(address),
      fetchAllTraits()
    ]);

    const completeness = Object.keys(allTraits).map(traitType => {
      const userValues = new Set(
        nfts
          .flatMap(nft => nft.raw.metadata.attributes)
          .filter(attr => attr.trait_type === traitType)
          .map(attr => attr.value)
      );
      const allValues = new Set(allTraits[traitType]);
      const hasAll = allValues.size > 0 && [...allValues].every(v => userValues.has(v));
      return { traitType, hasAll };
    });

    return { nfts, completeness };
  } catch (error) {
    console.error('Error in trait matching:', error);
    throw error;
  }
}   