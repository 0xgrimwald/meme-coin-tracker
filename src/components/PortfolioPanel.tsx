import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Trash2, DollarSign } from 'lucide-react';
import { PortfolioHolding, PortfolioSummary } from '../types/portfolio';
import { portfolioManager } from '../utils/portfolioManager';
import { formatPrice, formatPercentage } from '../utils/formatters';

interface PortfolioPanelProps {
  currentPrices: { [coinId: string]: number };
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ currentPrices }) => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [summary, setSummary] = useState<PortfolioSummary>({
    totalInvested: 0,
    currentValue: 0,
    totalPnL: 0,
    totalPnLPercentage: 0
  });

  const loadPortfolio = () => {
    const portfolioHoldings = portfolioManager.getHoldings();
    setHoldings(portfolioHoldings);
    
    const portfolioSummary = portfolioManager.calculateSummary(portfolioHoldings, currentPrices);
    setSummary(portfolioSummary);
  };

  useEffect(() => {
    loadPortfolio();
  }, [currentPrices]);

  const handleRemoveHolding = (holdingId: string) => {
    portfolioManager.removeHolding(holdingId);
    loadPortfolio();
  };

  const calculateHoldingPnL = (holding: PortfolioHolding) => {
    const currentPrice = currentPrices[holding.coinId] || 0;
    const currentValue = holding.amount * currentPrice;
    const pnl = currentValue - holding.totalInvested;
    const pnlPercentage = holding.totalInvested > 0 ? (pnl / holding.totalInvested) * 100 : 0;
    return { pnl, pnlPercentage, currentValue };
  };

  const isProfitable = summary.totalPnL >= 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Wallet className="mr-2" size={20} />
        Portfolio
      </h3>

      {/* Portfolio Summary */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Invested</p>
            <p className="font-bold text-lg">${summary.totalInvested.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Current Value</p>
            <p className="font-bold text-lg">${summary.currentValue.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-600">
          <div className={`flex items-center space-x-2 ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
            {isProfitable ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="font-semibold">
              {summary.totalPnL >= 0 ? '+' : ''}${summary.totalPnL.toFixed(2)}
            </span>
            <span className="font-semibold">
              ({formatPercentage(summary.totalPnLPercentage)})
            </span>
          </div>
        </div>
      </div>

      {/* Holdings */}
      {holdings.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
          <p>No holdings yet</p>
          <p className="text-sm">Click the + icon on any coin to add it to your portfolio</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold mb-3">Holdings ({holdings.length})</h4>
          {holdings.map(holding => {
            const { pnl, pnlPercentage, currentValue } = calculateHoldingPnL(holding);
            const isHoldingProfitable = pnl >= 0;
            
            return (
              <div key={holding.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{holding.coinName}</span>
                      <span className="text-gray-400 text-sm uppercase">({holding.coinSymbol})</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      {holding.amount.toLocaleString()} tokens
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveHolding(holding.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                    title="Remove holding"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400">Avg Buy Price</p>
                    <p className="font-semibold">{formatPrice(holding.avgBuyPrice)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current Value</p>
                    <p className="font-semibold">${currentValue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-600">
                  <div className={`flex items-center justify-between ${isHoldingProfitable ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="flex items-center space-x-1">
                      {isHoldingProfitable ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="font-semibold text-sm">
                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                      </span>
                    </div>
                    <span className="font-semibold text-sm">
                      {formatPercentage(pnlPercentage)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortfolioPanel;