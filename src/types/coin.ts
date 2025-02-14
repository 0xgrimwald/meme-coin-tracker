export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  last_updated: string;
}

export interface CoinListResponse {
  data: Coin[];
  status: string;
}