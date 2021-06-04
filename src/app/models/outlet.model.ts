import { FoodType } from '../utility/enums/food-type.enum';
import { IAddress } from './address.model';
import { ICategory } from './category.model';

interface IContactInfo {
  name: string;
  email: string;
  mobile: string;
}

interface IOutlet {
  id?: string;
  user: string;
  name: string;
  email: string;
  website: string;
  mobile: string;
  landline: string;
  image: string;
  owner: IContactInfo;
  manager: IContactInfo;
  restaurantType: FoodType;
  servingType: string;
  yearOfBirth: string;
  cuisines: string[];
  from: string;
  to: string;
  daysOpenInWeek: string[];
  menuImage?: string;
  costForTwo?: number;
  isClosed: boolean;
  address: IAddress;
  category?: ICategory[];
}
interface IOutletReponse {
  id?: string;
  message?: string;
  data: IOutlet[];
}

/**
 * Export
 */
export { IOutlet, IOutletReponse };
