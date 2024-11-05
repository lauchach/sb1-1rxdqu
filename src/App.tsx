import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BeverageCard } from './components/BeverageCard';
import { StockManagement } from './components/StockManagement';
import { UserProfile } from './components/UserProfile';
import type { Beverage, Ingredient, User, Order } from './types';
import { checkBeverageAvailability, updateIngredientsStock } from './utils/stock';
import { Toaster, toast } from 'react-hot-toast';

// Mock data
const mockBeverages: Beverage[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich and bold single shot espresso',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800',
    ingredients: [
      { ingredientId: '1', amount: 18 }, // 18g coffee beans
    ],
    price: 2.99,
    available: true
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Classic Italian coffee with steamed milk foam',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
    ingredients: [
      { ingredientId: '1', amount: 18 }, // 18g coffee beans
      { ingredientId: '2', amount: 180 }, // 180ml milk
    ],
    price: 4.49,
    available: true
  },
  {
    id: '3',
    name: 'Matcha Latte',
    description: 'Japanese green tea with steamed milk',
    image: 'https://images.unsplash.com/photo-1536013455962-2168bfcc7baf?w=800',
    ingredients: [
      { ingredientId: '3', amount: 2 }, // 2g matcha powder
      { ingredientId: '2', amount: 200 }, // 200ml milk
    ],
    price: 4.99,
    available: true
  }
];

const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Coffee Beans', currentStock: 1000, minimumStock: 500, unit: 'g' },
  { id: '2', name: 'Milk', currentStock: 2000, minimumStock: 1000, unit: 'ml' },
  { id: '3', name: 'Matcha Powder', currentStock: 300, minimumStock: 200, unit: 'g' }
];

function App() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [beverages, setBeverages] = useState<Beverage[]>(mockBeverages);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Update beverage availability based on ingredient stock
    const updatedBeverages = beverages.map(beverage => ({
      ...beverage,
      available: checkBeverageAvailability(beverage, ingredients)
    }));
    setBeverages(updatedBeverages);
  }, [ingredients]);

  const handleOrder = async (beverage: Beverage) => {
    if (!beverage.available) {
      toast.error('This beverage is currently unavailable');
      return;
    }

    // Create new order
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      beverageId: beverage.id,
      userId: user.id,
      status: 'preparing',
      timestamp: Date.now()
    };

    setOrders(prev => [...prev, order]);

    // Update stock
    const updatedIngredients = updateIngredientsStock(beverage.ingredients, ingredients);
    setIngredients(updatedIngredients);

    // Show success message
    toast.success(`Preparing your ${beverage.name}!`);

    // Simulate preparation time
    setTimeout(() => {
      setOrders(prev =>
        prev.map(o =>
          o.id === order.id ? { ...o, status: 'completed' } : o
        )
      );
      toast.success(`Your ${beverage.name} is ready!`);
    }, 3000);
  };

  const handleUpdateStock = (id: string, amount: number) => {
    setIngredients(ingredients.map(ingredient => {
      if (ingredient.id === id) {
        const newStock = ingredient.currentStock + amount;
        if (newStock < 0) {
          toast.error("Cannot reduce stock below 0!");
          return ingredient;
        }
        if (newStock <= ingredient.minimumStock) {
          toast.warning(`Low stock alert for ${ingredient.name}!`);
        }
        return { ...ingredient, currentStock: newStock };
      }
      return ingredient;
    }));
  };

  const handleUpdateProfile = (data: Partial<User>) => {
    setUser(prev => ({ ...prev, ...data }));
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {beverages.map((beverage) => (
            <BeverageCard
              key={beverage.id}
              beverage={beverage}
              onOrder={handleOrder}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StockManagement
            ingredients={ingredients}
            onUpdateStock={handleUpdateStock}
          />
          <UserProfile
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </main>
    </div>
  );
}

export default App;