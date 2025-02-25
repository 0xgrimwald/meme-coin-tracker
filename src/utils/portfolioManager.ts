import { PortfolioHolding, PortfolioSummary } from '../types/portfolio';
import { Coin } from '../types/coin';

const PORTFOLIO_STORAGE_KEY = 'meme-coin-portfolio';

export const portfolioManager = {
  getHoldings(): PortfolioHolding[] {
    try {
      const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading portfolio:', error);
      return [];
    }
  },

  saveHoldings(holdings: PortfolioHolding[]): void {
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(holdings));
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  },

  addHolding(coinId: string, coinName: string, coinSymbol: string, amount: number, buyPrice: number): PortfolioHolding {
    const holdings = this.getHoldings();
    
    // Check if we already have this coin
    const existingIndex = holdings.findIndex(h => h.coinId === coinId);
    
    if (existingIndex !== -1) {
      // Update existing holding with average price calculation
      const existing = holdings[existingIndex];
      const totalAmount = existing.amount + amount;
      const totalValue = existing.totalInvested + (amount * buyPrice);
      const avgPrice = totalValue / totalAmount;
      
      holdings[existingIndex] = {
        ...existing,
        amount: totalAmount,
        avgBuyPrice: avgPrice,
        totalInvested: totalValue,
        addedAt: new Date().toISOString()
      };
      
      this.saveHoldings(holdings);
      return holdings[existingIndex];
    } else {
      // Create new holding
      const holding: PortfolioHolding = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        coinId,
        coinName,
        coinSymbol,
        amount,
        avgBuyPrice: buyPrice,
        totalInvested: amount * buyPrice,
        addedAt: new Date().toISOString()
      };
      
      holdings.push(holding);
      this.saveHoldings(holdings);
      return holding;
    }
  },

  removeHolding(holdingId: string): void {
    const holdings = this.getHoldings();
    const filteredHoldings = holdings.filter(h => h.id !== holdingId);
    this.saveHoldings(filteredHoldings);
  },

  updateHolding(holdingId: string, amount: number, avgBuyPrice: number): void {
    const holdings = this.getHoldings();
    const holdingIndex = holdings.findIndex(h => h.id === holdingId);
    
    if (holdingIndex !== -1) {
      holdings[holdingIndex].amount = amount;
      holdings[holdingIndex].avgBuyPrice = avgBuyPrice;
      holdings[holdingIndex].totalInvested = amount * avgBuyPrice;
      this.saveHoldings(holdings);
    }
  },

  calculateSummary(holdings: PortfolioHolding[], currentPrices: { [coinId: string]: number }): PortfolioSummary {
    let totalInvested = 0;
    let currentValue = 0;

    holdings.forEach(holding => {
      totalInvested += holding.totalInvested;
      const currentPrice = currentPrices[holding.coinId] || 0;
      currentValue += holding.amount * currentPrice;
    });

    const totalPnL = currentValue - totalInvested;
    const totalPnLPercentage = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      totalPnL,
      totalPnLPercentage
    };
  }
};