import { IProduct } from './product.model';

export interface ICategory {
  restaurant?: string;
  id?: string;
  title: string;
  slug?: string;
  image?: string;
  description?: string;
  active?: boolean;
  products?: IProduct[];
  insert?: Date;
}
