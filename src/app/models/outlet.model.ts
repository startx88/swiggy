import { FoodType } from '../utility/enums/food-type.enum';
import { IAddress } from './address.model';
import { IMenu } from './menu.model';

interface IContactInfo {
  name: string;
  email: string;
  mobile: string;
}

interface IOutlet {
  id?: string;
  user: string;
  name: string;
  mobile: string;
  landline: string;
  image: string;
  owner: IContactInfo;
  manager: IContactInfo;
  restaurantType: FoodType;
  servingType: string;
  yearOfBirth: string;
  cuisines: string[];
  openTime: string;
  closeTime: string;
  daysOpenInWeek: string[];
  menuImage?: string;
  costFor?: number;
  isOpen: boolean;
  isClose: boolean;
  address: IAddress;
  menu?: IMenu[];
}
interface IOutletReponse {
  id?: string;
  message?: string;
  data: IOutlet[];
}

/**
 * Export
 */
export { IMenu, IOutlet, IOutletReponse };
