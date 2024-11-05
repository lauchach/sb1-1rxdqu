import type { Beverage, Ingredient, BeverageIngredient } from '../types';

export function checkBeverageAvailability(
  beverage: Beverage,
  ingredients: Ingredient[]
): boolean {
  return beverage.ingredients.every((beverageIngredient) => {
    const ingredient = ingredients.find((i) => i.id === beverageIngredient.ingredientId);
    return ingredient && ingredient.currentStock >= beverageIngredient.amount;
  });
}

export function updateIngredientsStock(
  beverageIngredients: BeverageIngredient[],
  currentIngredients: Ingredient[]
): Ingredient[] {
  return currentIngredients.map((ingredient) => {
    const beverageIngredient = beverageIngredients.find(
      (bi) => bi.ingredientId === ingredient.id
    );
    if (!beverageIngredient) return ingredient;

    const newStock = ingredient.currentStock - beverageIngredient.amount;
    return {
      ...ingredient,
      currentStock: newStock,
    };
  });
}