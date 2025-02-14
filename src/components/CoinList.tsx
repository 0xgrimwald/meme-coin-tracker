import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import CoinCard from './CoinCard';
import { Coin } from '../types/coin';

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for now
  const mockCoins: Coin[] = [
    {
      id: 'dogecoin',
      symbol: 'doge',
      name: 'Dogecoin',
      current_price: 0.08234,
      price_change_percentage_24h: 5.42,
      market_cap: 11847293847,
      total_volume: 647382947,
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      last_updated: '2025-02-12T14:30:00Z'
    },
    {
      id: 'shiba-inu',
      symbol: 'shib',
      name: 'Shiba Inu',
      current_price: 0.000009876,
      price_change_percentage_24h: -2.34,
      market_cap: 5847293847,
      total_volume: 234782947,
      image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      last_updated: '2025-02-12T14:30:00Z'
    },
    {
      id: 'pepe',
      symbol: 'pepe',
      name: 'Pepe',
      current_price: 0.000001234,
      price_change_percentage_24h: 12.67,
      market_cap: 847293847,
      total_volume: 98782947,
      image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      last_updated: '2025-02-12T14:30:00Z'
    }
  ];

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCoins(mockCoins);
        setError(null);
      } catch (err) {
        setError('Failed to load coins. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

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
      <div className="flex items-center justify-center py-12 text-red-400">
        <AlertCircle className="mr-2" size={24} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Top Meme Coins</h2>
        <p className="text-gray-400">Track the most popular meme cryptocurrencies</p>
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