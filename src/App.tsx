import React, { useState } from 'react'
import CoinList from './components/CoinList'
import AlertsPanel from './components/AlertsPanel'
import PortfolioPanel from './components/PortfolioPanel'

function App() {
  const [refreshAlerts, setRefreshAlerts] = useState(0);
  const [refreshPortfolio, setRefreshPortfolio] = useState(0);
  const [currentPrices, setCurrentPrices] = useState<{ [coinId: string]: number }>({});

  const handleAlertCreated = () => {
    setRefreshAlerts(prev => prev + 1);
  };

  const handleHoldingAdded = () => {
    setRefreshPortfolio(prev => prev + 1);
  };

  const handlePricesLoaded = (prices: { [coinId: string]: number }) => {
    setCurrentPrices(prices);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🚀 Meme Coin Tracker</h1>
          <p className="text-gray-400">Track your favorite meme coins in real-time</p>
        </header>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <CoinList 
              onAlertCreated={handleAlertCreated}
              onHoldingAdded={handleHoldingAdded}
              onPricesLoaded={handlePricesLoaded}
            />
          </div>
          <div className="xl:col-span-1 space-y-8">
            <PortfolioPanel currentPrices={currentPrices} key={refreshPortfolio} />
            <AlertsPanel key={refreshAlerts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App