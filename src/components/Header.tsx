import React from 'react';
import { Coffee, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Coffee className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Keyoss</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#beverages" className="hover:text-blue-200 transition-colors">
              Beverages
            </a>
            <a href="#stock" className="hover:text-blue-200 transition-colors">
              Stock Management
            </a>
            <button className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-all">
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}