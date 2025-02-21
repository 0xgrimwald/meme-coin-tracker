import React from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { Coin } from '../types/coin';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CoinCardProps {
  coin: Coin;
  onSetAlert?: (coin: Coin) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onSetAlert }) => {
  const isPriceUp = coin.price_change_percentage_24h >= 0;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-coin.png';
            }}
          />
          <div>
            <h3 className="font-bold text-lg">{coin.name}</h3>
            <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${isPriceUp ? 'text-green-400' : 'text-red-400'}`}>
            {isPriceUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="font-semibold">
              {formatPercentage(coin.price_change_percentage_24h)}
            </span>
          </div>
          {onSetAlert && (
            <button
              onClick={() => onSetAlert(coin)}
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="Set price alert"
            >
              <Bell size={18} />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Price:</span>
          <span className="font-semibold">{formatPrice(coin.current_price)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Market Cap:</span>
          <span className="font-semibold">{formatMarketCap(coin.market_cap)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Volume:</span>
          <span className="font-semibold">{formatMarketCap(coin.total_volume)}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;