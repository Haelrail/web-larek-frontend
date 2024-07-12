import { IOrderConfirmation } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IEvents } from "./base/events";

export class Success extends Component<IOrderConfirmation> {
  protected _totalPrice: HTMLElement;
  protected _confirmButton: HTMLButtonElement;

  constructor(element: HTMLFormElement, events: IEvents) {
    super(element, events);

    this._totalPrice = ensureElement<HTMLElement>(".order-success__description", this.element);

    this._confirmButton = ensureElement<HTMLButtonElement>(".order-success__close", this.element);

    this._confirmButton.addEventListener('click', () => {
      this.events.emit('success:close');
    })
  }

  set totalPrice(value: number) {
    this.addText(this._totalPrice, `Списано ${value} синапсов`);
  }

}