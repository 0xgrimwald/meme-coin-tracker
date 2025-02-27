# 🚀 Meme Coin Tracker

A modern web application for tracking meme cryptocurrency prices, setting alerts, and managing your portfolio.

## Features

### 📊 Real-time Price Tracking
- Live price data from CoinGecko API
- Support for popular meme coins (DOGE, SHIB, PEPE, and more)
- 24-hour price change indicators
- Market cap and trading volume information

### 🔔 Price Alerts
- Set custom price alerts for any tracked coin
- Choose "above" or "below" price thresholds  
- Visual notification system for triggered alerts
- Persistent storage of alert history

### 💼 Portfolio Management
- Add coins to your personal portfolio
- Track profit/loss (P&L) in real-time
- Calculate average buy prices automatically
- View total portfolio value and performance

### 🔍 Search & Filter
- Real-time search by coin name or symbol
- Instant filtering of results
- Clean, responsive interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: CoinGecko API
- **Storage**: Browser Local Storage

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd meme-coin-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Setting Price Alerts
1. Find a coin you want to track
2. Click the bell icon (🔔) on the coin card
3. Set your target price and condition (above/below)
4. The alert will trigger when the condition is met

### Adding to Portfolio
1. Click the plus icon (➕) on any coin card  
2. Enter the amount you own and your average buy price
3. View your portfolio performance in the right panel

### Searching Coins
Use the search bar to quickly find specific coins by name or symbol.

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/         # React components
├── services/          # API services  
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── main.tsx          # Application entry point
```

## API Rate Limits

This app uses the CoinGecko free API which has rate limits. For production use, consider upgrading to a paid plan for higher limits.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.