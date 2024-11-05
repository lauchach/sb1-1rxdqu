export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Ingredient {
  id: string;
  name: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
}

export interface BeverageIngredient {
  ingredientId: string;
  amount: number;
}

export interface Beverage {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: BeverageIngredient[];
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  beverageId: string;
  userId: string;
  status: 'preparing' | 'completed' | 'failed';
  timestamp: number;
}