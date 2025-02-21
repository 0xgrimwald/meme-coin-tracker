import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { Coin } from '../types/coin';
import { AlertFormData } from '../types/alert';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: Coin | null;
  onCreateAlert: (alertData: AlertFormData) => void;
}

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ 
  isOpen, 
  onClose, 
  coin,
  onCreateAlert 
}) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  if (!isOpen || !coin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    onCreateAlert({
      coinId: coin.id,
      coinName: coin.name,
      coinSymbol: coin.symbol,
      targetPrice: price,
      condition
    });

    setTargetPrice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <Bell className="mr-2" size={20} />
            Set Price Alert
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold">{coin.name}</p>
              <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            Current price: ${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Alert me when price goes:
            </label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Target Price ($)
            </label>
            <input
              type="number"
              step="any"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="0.00"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceAlertModal;