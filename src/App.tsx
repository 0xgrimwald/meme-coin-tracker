import React from 'react'
import CoinList from './components/CoinList'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🚀 Meme Coin Tracker</h1>
          <p className="text-gray-400">Track your favorite meme coins in real-time</p>
        </header>
        
        <CoinList />
      </div>
    </div>
  )
}

export default App