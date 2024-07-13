import { Form } from "./form";
import { IEvents } from "./base/events";
import { PaymentType, OrderForm } from "../types";
import { ensureElement } from "../utils/utils";

export class Order extends Form<OrderForm> {
  protected _cardMethod: HTMLButtonElement;
  protected _cashMethod: HTMLButtonElement;
  // protected _address: HTMLInputElement;
  // protected _email: HTMLInputElement;
  // protected _phone: HTMLInputElement;

  constructor(element: HTMLFormElement, events: IEvents) {
    super(element, events);

    this._cardMethod = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.element);

    this._cardMethod.addEventListener('click', () => {
      this.payment = 'card';
      this.inputUpdate('payment', 'card');
    })

    this._cashMethod = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.element);

    this._cashMethod.addEventListener('click', () => {
      this.payment = 'cash';
      this.inputUpdate('payment', 'cash');
    })
    // this._address = this.element.elements.namedItem('address') as HTMLInputElement;
  }

  set payment(value: PaymentType) {
    if (value === 'card') {
      this.toggleClass(this._cardMethod, "button_alt-active", true);
      this.toggleClass(this._cashMethod, "button_alt-active", false);
    }
    else {
      this.toggleClass(this._cardMethod, "button_alt-active", false);
      this.toggleClass(this._cashMethod, "button_alt-active", true);
    }

  }

  set address(value: string) {
    ((this.element as HTMLFormElement).elements.namedItem('address') as HTMLInputElement).value = value;
  }

  // set email(value: string) {
  //   ((this.element as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value = value;
  // }

  // set phone(value: string) {
  //   ((this.element as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value = value;
  // }
}