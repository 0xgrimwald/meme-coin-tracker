import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Coin } from '../types/coin';

interface AddHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin: Coin | null;
  onAddHolding: (coinId: string, coinName: string, coinSymbol: string, amount: number, buyPrice: number) => void;
}

const AddHoldingModal: React.FC<AddHoldingModalProps> = ({
  isOpen,
  onClose,
  coin,
  onAddHolding
}) => {
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  if (!isOpen || !coin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(buyPrice);
    
    if (isNaN(amountNum) || isNaN(priceNum) || amountNum <= 0 || priceNum <= 0) {
      alert('Please enter valid amount and price values');
      return;
    }

    onAddHolding(coin.id, coin.name, coin.symbol, amountNum, priceNum);
    setAmount('');
    setBuyPrice('');
    onClose();
  };

  const totalInvestment = parseFloat(amount) * parseFloat(buyPrice);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <Plus className="mr-2" size={20} />
            Add to Portfolio
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
              Amount ({coin.symbol.toUpperCase()})
            </label>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Buy Price ($)
            </label>
            <input
              type="number"
              step="any"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="0.00"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {amount && buyPrice && !isNaN(totalInvestment) && (
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-300">
                Total Investment: <span className="font-semibold text-white">${totalInvestment.toFixed(2)}</span>
              </p>
            </div>
          )}

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
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              Add Holding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHoldingModal;