import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import CoinCard from './CoinCard';
import { Coin } from '../types/coin';
import { coinGeckoApi } from '../services/coinGeckoApi';

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCoins = async () => {
    try {
      setLoading(true);
      setError(null);
      const coinData = await coinGeckoApi.getMemeCoins();
      setCoins(coinData);
    } catch (err) {
      setError('Failed to load coins. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading meme coins...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-400">
        <AlertCircle className="mb-2" size={32} />
        <span className="mb-4 text-center">{error}</span>
        <button 
          onClick={loadCoins}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Top Meme Coins</h2>
          <p className="text-gray-400">Track the most popular meme cryptocurrencies</p>
        </div>
        <button 
          onClick={loadCoins}
          disabled={loading}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={loading ? 'animate-spin' : ''} size={16} />
          <span>Refresh</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default CoinList;