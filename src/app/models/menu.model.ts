export interface IMenu {
  id?: string;
  restaurant: string;
  name: string;
  slug?: string;
  price?: number;
  offer?: number;
  active?: boolean;
  insertAt?: Date;
}

export class NavMenu {
  constructor(
    public id: string,
    public name: string,
    public icon: string,
    public url: string
  ) {}
}
