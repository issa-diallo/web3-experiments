import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL;
const provider = new ethers.JsonRpcProvider(providerUrl);

export default function Home() {
  const [block, setBlock] = useState<any>(null);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        if (block && block.transactions.length > 0) {
          setBlock(block);
        }
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    }
    fetchBlock();
  }, []);

  return (
    <div className=" min-h-screen p-10 text-black">
      <h1 className="text-3xl text-teal-600 font-bold text-center mb-10">Latest Ethereum Block Details</h1>
      {block ? (
        <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-teal-600">Block Information</h2>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Block Number:</span> {block.number}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Block Hash:</span> {block.hash}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Miner:</span> {block.miner}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Gas Used:</span> {block.gasUsed.toString()}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Gas Limit:</span> {block.gasLimit.toString()}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Timestamp:</span> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-teal-600">Transactions ({block.transactions.length})</h2>
            <ul className="list-disc list-inside">
              {block.transactions.map((tx: string, index: number) => (
                <ol key={index} className="mb-2">
                  <p className='text-teal-900'><span className="font-bold text-teal-200">Transaction {index + 1} Hash:</span> {tx}</p>
                </ol>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading block and transactions...</p>
      )}
    </div>
  );
}
