import { IEvents } from "./events";
import { ICard, IProduct, IBasket, IOrder, IProjectData, OrderForm, PaymentType } from "../../types";

export class Model {
  items: IProduct[] = [];
  basket: IBasket = {
    orderList: [],
    totalPrice: 0,
  };
  order: IOrder = {
    payment: null,
    address: '',
    email: '',
    phoneNumber: '',
    orderList: [],
    totalPrice: 0,
  };
  formErrors: Partial<Record<keyof OrderForm, string>> = {};

  constructor(protected events: IEvents) {};
  
  setItems(items: IProduct[]){};

  checkBasket(){};

  addInBasket(){};

  removeFromBasket(){};

  clearBasket(){};

  setOrder(){};

  setPayment(){};

  checkOrder(){};
}