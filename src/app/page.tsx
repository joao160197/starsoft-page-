"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { Container } from "@/components/container";
import { Cards } from "@/components/Cards";
import { NFTs } from "@/utils/types/nfts";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Progress } from "@/components/Progress/";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const fetchNFTs = async (page: number) => {
  const res = await fetch(
    `https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=${page}&limit=8`
  );
  if (!res.ok) throw new Error("Não foi possível carregar");
  const { data } = await res.json();
  return data;
};

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(15);
  const [buttonText, setButtonText] = useState("Carregar Mais"); 

  const { data, refetch } = useQuery<NFTs[]>(
    ["nfts", clickCount],
    () => fetchNFTs(clickCount + 1),
    { enabled: clickCount < 5 }
  );

  const handleClick = async () => {
    if (progress >= 100) {
      
      setClickCount(0);
      setProgress(15);
      setButtonText("Carregar Mais");
      await refetch();
    } else {
      
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
      setProgress((prev) => Math.min(prev + 20, 100));

     
      if (newClickCount >= 5) {
        setButtonText("Você já viu tudo");
      } else {
        await refetch();
      }
    }
  };

  return (
    <Container>
      {data?.length === 0 && <LoadingIndicator />}
      <section className="cardsGrid">
        {data?.slice(0, 8).map((nft) => (
          <Cards key={nft.id} data={nft} />
        ))}
      </section>
      <div className="ProgressContainer">
        <Progress progress={progress} />
      </div>
      <div className="ButtonContainer">
        <AnimatedButton onClick={handleClick} text={buttonText} />
      </div>
    </Container>
  );
}
