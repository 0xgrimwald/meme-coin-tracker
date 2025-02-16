import axios from 'axios';
import { Coin } from '../types/coin';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const coinGeckoApi = {
  async getMemeCoins(): Promise<Coin[]> {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: 'dogecoin,shiba-inu,pepe,floki,bonk,dogwifhat,book-of-meme,cat-in-a-dogs-world,popcat,mog-coin',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h'
        }
      });

      return response.data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h || 0,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        image: coin.image,
        last_updated: coin.last_updated
      }));
    } catch (error) {
      console.error('Error fetching meme coins:', error);
      throw new Error('Failed to fetch coin data');
    }
  },

  async getCoinById(id: string): Promise<Coin | null> {
    try {
      const response = await api.get(`/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });

      const coin = response.data;
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.market_data.current_price.usd,
        price_change_percentage_24h: coin.market_data.price_change_percentage_24h || 0,
        market_cap: coin.market_data.market_cap.usd,
        total_volume: coin.market_data.total_volume.usd,
        image: coin.image.large,
        last_updated: coin.last_updated
      };
    } catch (error) {
      console.error(`Error fetching coin ${id}:`, error);
      return null;
    }
  }
};