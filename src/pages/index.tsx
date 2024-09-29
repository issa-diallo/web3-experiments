import { useEffect, useState } from 'react';
import { ethers, BlockParams, TransactionResponseParams } from 'ethers';

const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL;
const provider = new ethers.JsonRpcProvider(providerUrl);

export default function Home() {
  const [blockchain, setBlockchain] = useState<BlockParams | null>(null);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        if (block && block.transactions.length > 0) {
          setBlockchain(block);
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
      {blockchain ? (
        <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-teal-600">Block Information</h2>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Block Number:</span> {blockchain.number}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Block Hash:</span> {blockchain.hash}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Miner:</span> {blockchain.miner}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Gas Used:</span> {blockchain.gasUsed.toString()}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Gas Limit:</span> {blockchain.gasLimit.toString()}</p>
            <p className='text-teal-900'><span className="font-bold text-teal-200">Timestamp:</span> {new Date(blockchain.timestamp * 1000).toLocaleString()}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-teal-600">Transactions ({blockchain.transactions.length})</h2>
            <ul className="list-disc list-inside">
              {blockchain?.transactions.map((tx: TransactionResponseParams | string, index: number) => (
                <ol key={index} className="mb-2">
                  <p className='text-teal-900'>
                    <span className="font-bold text-teal-200">Transaction {index + 1} : </span> 
                    {typeof tx === 'string' ? tx : tx.hash}
                  </p>
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
