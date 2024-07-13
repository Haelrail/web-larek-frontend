import { IEvents } from "./base/events";
import { IBasket } from "../types";
import { Component } from "./base/component";
import { createElement, ensureElement } from "../utils/utils";

export class Basket extends Component<IBasket> {
  protected _orderList: HTMLElement;
  protected _totalPrice: HTMLElement;
  protected _confirmButton: HTMLElement; //

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);

    this._orderList = ensureElement<HTMLElement>('.basket__list', this.element);
    this._totalPrice = this.element.querySelector('.basket__price');
    this._confirmButton = this.element.querySelector('.button');

    // открываем форму оплаты

    this._confirmButton.addEventListener('click', () => {
      events.emit('order:open');
    })
  }

  set totalPrice(value: number) {
    this.addText(this._totalPrice, `${value} синапсов`);
  }

  set orderList(elements: HTMLElement[]) {
    if (elements) {
      this._orderList.replaceChildren(...elements)
    }
    else {
    }
  }

  manageButton(value: number) {
    if (value > 0)
      this.changeDisabled(this._confirmButton, false)
    else
      this.changeDisabled(this._confirmButton, true)
  }
}