import { Form } from "./form";
import { IEvents } from "./base/events";
import { PaymentType, OrderForm } from "../types";
import { ensureElement } from "../utils/utils";

export class Order extends Form<OrderForm> {
  protected _cardMethod: HTMLButtonElement;
  protected _cashMethod: HTMLButtonElement;

  constructor(element: HTMLFormElement, events: IEvents) {
    super(element, events);
    this._cardMethod = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.element);
    this._cardMethod.addEventListener('click', () => {
      this.payment = 'card';
      
    })
    this._cashMethod = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.element);
    this._cashMethod.addEventListener('click', () => {
      this.payment = 'cash';
      
    })
  }

  set payment(value: PaymentType) {
    this.toggleClass(this._cardMethod, "card");
    this.toggleClass(this._cashMethod, "cash");
  }
}