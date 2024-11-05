import React from 'react';
import { Coffee, AlertCircle } from 'lucide-react';
import type { Beverage } from '../types';

interface BeverageCardProps {
  beverage: Beverage;
  onOrder: (beverage: Beverage) => void;
}

export function BeverageCard({ beverage, onOrder }: BeverageCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden relative">
        {beverage.image ? (
          <img
            src={beverage.image}
            alt={beverage.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Coffee className="w-12 h-12 text-gray-400" />
          </div>
        )}
        {!beverage.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-full flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-medium">Currently Unavailable</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{beverage.name}</h3>
        <p className="text-gray-600 mb-4">{beverage.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-purple-600">
            ${beverage.price.toFixed(2)}
          </span>
          <button
            onClick={() => onOrder(beverage)}
            disabled={!beverage.available}
            className={`px-4 py-2 rounded-lg transition-all ${
              beverage.available
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}