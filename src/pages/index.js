"use client"
import CoinFlipGame from "@/Components/CoinFlipGame";
import WalletConnect from "@/Components/WalletConnect";

export default function Home() {
  return (
    <main className="container mx-auto my-10">
      <WalletConnect />
      <CoinFlipGame />
    </main>
  );
}
