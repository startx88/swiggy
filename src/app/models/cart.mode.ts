export interface ICartProduct {
  id?: string;
  name: string;
  image: string;
  product: string;
  price: number;
  quantity: number;
}
export interface ICart {
  user: string;
  restaurant: string;
  items: ICartProduct[];
  total: number;
}

export class Cart implements ICartProduct {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public product: string,
    public price: number,
    public quantity: number
  ) {}
}
