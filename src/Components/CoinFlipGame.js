import { useState } from "react";
import { ethers } from "ethers";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import Swal from "sweetalert2";

export default function CoinFlipGame() {
  const [blockchain, setBlockchain] = useState("ethereum"); // Default to Ethereum
  const [side, setSide] = useState(null);
  const [result, setResult] = useState(null);
  const [betAmount, setBetAmount] = useState("");

  const getProvider = (blockchain) => {
    let provider;
    // switch (blockchain) {
    //   case 'ethereum':
    //     provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    //     break;
    //   case 'polygon':
    //     provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    //     break;
    //   case 'solana':
    //     provider = new Connection(clusterApiUrl('devnet'), 'confirmed');
    //     break;
    //   case 'bitcoin':
    //     // Bitcoin testnet connection (Placeholder)
    //     provider = {}; // You would implement this based on your chosen library or API
    //     break;
    //   default:
    //     provider = null;
    // }
    return provider;
  };

  const flipCoin = async () => {
    if (!betAmount || !blockchain) {
      Swal.fire({
        title: "Error",
        text: `Please select the token and bet first !!! `,
        icon: "error",
      });
      return;
    }
    if (!side) {
      Swal.fire({
        title: "Error",
        text: `Please select the side !!!`,
        icon: "error",
      });
      return;
    }
    const provider = getProvider(blockchain);
    if (provider) {
      // Implement blockchain-specific logic here if needed
    }

    const randomSide = Math.random() > 0.5 ? "heads" : "tails";
    setResult(randomSide);
    if (side === randomSide) {
      Swal.fire({
        title: "You won",
        text: `You doubled your bet of ${betAmount} tokens on ${blockchain}!`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "You loss",
        text: `Better luck next time.`,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-6">Coin Flip Game</h1>

      <select
        value={blockchain}
        onChange={(e) => setBlockchain(e.target.value)}
        required
        className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none"
      >
        <option value="ethereum">Ethereum (Rinkeby Testnet)</option>
        <option value="polygon">Polygon (Mumbai Testnet)</option>
        <option value="solana">Solana (Devnet)</option>
        <option value="bitcoin">Bitcoin (Testnet)</option>
      </select>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Enter bet amount"
        className="px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none"
        required
      />

      <div className="flex mb-4">
        <button
          onClick={() => setSide("heads")}
          className={`px-4 py-2 rounded-lg mr-2 ${
            side === "heads" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Heads
        </button>
        <button
          onClick={() => setSide("tails")}
          className={`px-4 py-2 rounded-lg ${
            side === "tails" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Tails
        </button>
      </div>

      <button
        onClick={flipCoin}
        className="px-6 py-3 bg-green-500 text-white rounded-lg"
      >
        Flip Coin
      </button>

      {result && (
        <div className="mt-6 text-2xl font-bold">
          Result: {result === "heads" ? "Heads" : "Tails"}
        </div>
      )}
    </div>
  );
}
