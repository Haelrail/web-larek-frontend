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
    phone: '',
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

  setField(field: keyof OrderForm, input: string) {
    if (field === 'payment')
      this.setPaymentMethod(input as PaymentType);
    else
      this.order[field] = input; //
    this.checkOrder();
  };

  setPaymentMethod(value: PaymentType) {
    this.order.payment = value;
  };

  checkOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address)
      errors.address = "Введите адрес";
    if (!this.order.email)
      errors.email = "Введите Email";
    if (this.order.email && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.order.email))
      errors.email = "Введите корректный Email";
    if (!this.order.phone)
      errors.phone = "Введите номер телефона";
    if (this.order.phone && !/^\+?[0-9]{10,14}$/.test(this.order.phone))
      errors.phone = "Введите корректный номер телефона";
    this.formErrors = errors;
    this.events.emit('errors:change', this.formErrors);
  };
}