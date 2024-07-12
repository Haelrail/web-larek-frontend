export type ProductType =
  'хард-скил'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'другое';

export type OrderForm = Omit<IOrder, 'items' | 'total'>;

export type PaymentType = 'card' | 'cash';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductType;
  price: number | null;
}

export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductType;
  price: number | null;
  inBasket: boolean;
}

export interface IPage {
  catalog: HTMLElement[];
  orderCounter: number;
  locked: boolean;
}

export interface IBasket {
  orderList: string[];
  totalPrice: number;
}

export interface IOrder {
  payment: PaymentType;
  address: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
}

export interface IOrderConfirmation {
  id: string;
  totalPrice: number;
}

export interface IProjectApi {
  getCards: () => Promise<IProduct[]>;
  getCard: (id: string) => Promise<IProduct>;
  orderConfirm: (order: IOrder) => Promise<IOrderConfirmation>;
}

export interface IProjectData {
  items: IProduct[];
  basket: IBasket;
  order: IOrder;
  formErrors: Partial<Record<keyof OrderForm, string>>;
}
