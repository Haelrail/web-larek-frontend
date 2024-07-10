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
  actualCard: ICard;
  formErrors: Partial<Record<keyof OrderForm, string>> = {};

  constructor(protected events: IEvents) {};
  
  setItems(items: IProduct[]){
    this.items = items;
    // console.log(this.items);
    this.events.emit('catalog:fill', this.items);
  };

  openCard(card: ICard) {
    this.actualCard = card;
    // console.log(this.actualCard);
    // this.events.emit('card:open');
  };

  checkBasket(card: ICard) {
    return this.basket.orderList.includes(card.id);
  };

  addInBasket(card: ICard) {
    this.basket.orderList.push(card.id);
    this.basket.totalPrice += card.price;
    console.log(this.basket.orderList); //
    console.log(this.basket.totalPrice); //
  };

  removeFromBasket(card: ICard) {
    this.basket.totalPrice -= card.price;
    const index = this.basket.orderList.findIndex((id) => id === card.id);
    if (index >= 0)
      this.basket.orderList.splice(index, 1);
    console.log(this.basket.orderList); //
    console.log(this.basket.totalPrice); //
  };

  clearBasket(){};

  setOrder(){};

  setPayment(){};

  checkOrder(){};
}