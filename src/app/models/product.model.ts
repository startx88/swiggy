import { ICategory } from './category.model';
import { ICuisine } from './cuisine.model';

export interface IProduct {
  id?: string;
  category: string;
  cuisine: string;
  title: string;
  recipeType: string;
  cuisineType: string;
  image: string;
  price: number;
  slug?: string;
  offer?: number;
  description: string;
  active?: boolean;
  insert?: Date;
}
