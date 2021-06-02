export interface ISubCategory {
  id?: string;
  category: string;
  title: string;
  slug?: string;
  image?: string | File;
  description?: string;
  active?: boolean;
  insert?: Date;
}
