import React from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import type { Ingredient } from '../types';

interface StockManagementProps {
  ingredients: Ingredient[];
  onUpdateStock: (id: string, amount: number) => void;
}

export function StockManagement({ ingredients, onUpdateStock }: StockManagementProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Stock Management</h2>
        <Package className="h-6 w-6 text-purple-600" />
      </div>
      <div className="space-y-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{ingredient.name}</span>
                {ingredient.currentStock <= ingredient.minimumStock && (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                Current: {ingredient.currentStock} {ingredient.unit}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateStock(ingredient.id, -1)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <button
                onClick={() => onUpdateStock(ingredient.id, 1)}
                className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}