export interface PortfolioHolding {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  amount: number;
  avgBuyPrice: number;
  totalInvested: number;
  addedAt: string;
}

export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
}