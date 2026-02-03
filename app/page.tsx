"use client";

import 'dotenv/config';
import { Alchemy, Network } from 'alchemy-sdk';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { checkTraitCompleteness } from "@/lib/traitMatchingService";
import styles from '@/styles/NFTCard.module.css';

export default function Home() {
  const { login, logout} = useLoginWithAbstract();
  const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    network: Network.ABSTRACT_MAINNET,
  };
  const alchemy = new Alchemy(config);

  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<any>(null);
  const [completeness, setCompleteness] = useState<{ traitType: string; hasAll: boolean }[]>([]);

  useEffect(() => {
    if (isConnected && address) {
      checkTraitCompleteness(address).then(({ nfts, completeness }) => {
        setNfts(nfts);
        setCompleteness(completeness);
      });
    }
  }, [address, isConnected]);

  console.log('apiKey: ' + process.env.API_KEY)
  console.log('CA: ' + process.env.CONTRACT_ADDRESS)

  console.log("NFTs raw:", nfts);

  if (!isConnected)
    return (
      <div>
        <button onClick={login}>Connect</button>
      </div>
    );

  return (
    <div>
      <button onClick={logout}>Disconnect</button>
      <p>Connected to: {address}</p>

      <h2>Your Characters</h2>
      {nfts?.length === 0 ? (
        <p>You don't own any NFT from this collection.</p>
      ) : (
        <>
          {completeness?.map(
            ({ traitType, hasAll }) =>
              hasAll && (
                <p key={traitType} className={styles.complete}>
                  You got all the possible values for the {traitType} trait
                </p>
              )
          )}

          {nfts?.map((nft: any, i: number) => (
            <div key={nft.tokenId} className={styles.card}>
              <div className={styles.image}>
                <img src={nft.image.thumbnailUrl} alt={nft.name} />
              </div>
              <div className={styles.details}>
                <h3>{nft.name}</h3>
                <h4>Attributs :</h4>
                <ul>
                  {nft.raw.metadata.attributes.map((attr: any, j: number) => (
                    <li key={i + '_' + j}>
                      <strong>{attr.trait_type} :</strong> {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
