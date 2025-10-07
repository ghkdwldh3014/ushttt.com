'use client';

import React, { useState } from 'react';
import { SHOP_ITEMS } from '@/lib/subscription';

export default function ShopPage() {
  const [userPoints, setUserPoints] = useState(100000000); // Oganesson118's points

  const handlePurchase = (itemId: string, cost: number) => {
    if (userPoints >= cost) {
      setUserPoints(prev => prev - cost);
      alert('Purchase successful!');
    } else {
      alert('Not enough points!');
    }
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Point Shop</h1>
          <div className="flex items-center gap-4">
            <div className="text-2xl">
              Your Points: <span className="text-yellow-400 font-bold">{userPoints.toLocaleString()}</span>
            </div>
          </div>
        </header>

        {/* Shop Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHOP_ITEMS.map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <h3 className="text-xl font-semibold mb-2">{item.nameKo}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.name}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-yellow-400">{item.cost.toLocaleString()}</span>
                <span className="text-sm text-gray-400">points</span>
              </div>

              {item.dailyLimit && (
                <div className="text-xs text-gray-500 mb-3">
                  Daily limit: {item.dailyLimit}
                </div>
              )}

              <button
                onClick={() => handlePurchase(item.id, item.cost)}
                disabled={userPoints < item.cost}
                className={`
                  w-full py-2 rounded font-semibold transition-colors
                  ${userPoints >= item.cost 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {userPoints >= item.cost ? 'Purchase' : 'Not Enough Points'}
              </button>
            </div>
          ))}
        </div>

        {/* Point Packages */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Buy Points</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { price: 5, points: 15000, mileage: 500 },
              { price: 10, points: 33000, mileage: 1000 },
              { price: 20, points: 67500, mileage: 2000 },
              { price: 50, points: 200000, mileage: 5000 },
              { price: 100, points: 450000, mileage: 10000 },
              { price: 200, points: 1000000, mileage: 20000 },
            ].map(pkg => (
              <div key={pkg.price} className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">${pkg.price}</div>
                <div className="text-xl text-yellow-400 mb-1">{pkg.points.toLocaleString()}</div>
                <div className="text-xs text-gray-300 mb-3">+{pkg.mileage} mileage</div>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors">
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
