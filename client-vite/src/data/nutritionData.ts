import type { Nutrition } from '../types/nutrition';

export const nutritionData: Nutrition[] = [
  {
    id: '1',
    date: '2024-01-22',
    meal: 'breakfast',
    name: 'Avena con proteina',
    calories: 350,
    protein: 25,
    carbs: 45,
    fat: 8,
    fiber: 6,
    notes: 'Con platano y miel'
  },
  {
    id: '2',
    date: '2024-01-22',
    meal: 'lunch',
    name: 'Pollo a la plancha con arroz',
    calories: 450,
    protein: 35,
    carbs: 55,
    fat: 12,
    fiber: 4,
    notes: 'Con ensalada de vegetales'
  },
  {
    id: '3',
    date: '2024-01-22',
    meal: 'dinner',
    name: 'Salmon con quinoa',
    calories: 380,
    protein: 30,
    carbs: 40,
    fat: 15,
    fiber: 5,
    notes: 'Con brocoli al vapor'
  },
  {
    id: '4',
    date: '2024-01-22',
    meal: 'snack',
    name: 'Batido de proteina',
    calories: 200,
    protein: 20,
    carbs: 15,
    fat: 5,
    fiber: 2,
    notes: 'Post-entrenamiento'
  }
]; 