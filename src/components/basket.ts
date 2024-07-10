import { IEvents } from "./base/events";
import { IBasket } from "../types";
import { Component } from "./base/component";
import { ensureElement } from "../utils/utils";

export class Basket extends Component<IBasket> {
  protected _orderList: HTMLElement;
  protected _totalPrice: HTMLElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._orderList = ensureElement<HTMLElement>('.basket__list', this.element);
    this._totalPrice = this.element.querySelector('.basket__price');
  }
}