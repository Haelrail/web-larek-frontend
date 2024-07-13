import { Component } from "./base/component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IPage } from "../types";

export class Page extends Component<IPage> {

  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _basketButton: HTMLElement;
  protected _pageWrapper: HTMLElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._counter = ensureElement<HTMLElement>(".header__basket-counter");
    this._catalog = ensureElement<HTMLElement>(".gallery");
    this._basketButton = ensureElement<HTMLElement>(".header__basket");
    this._pageWrapper = ensureElement<HTMLElement>(".page__wrapper");

    this._basketButton.addEventListener('click', () => {
      this.events.emit("basket:open");
    })
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set counter(counterUpdate: number) {
    this.addText(this._counter, String(counterUpdate));
  }

  set isLocked(value: boolean) {
    if(value)
      this.toggleClass(this._pageWrapper, 'page__wrapper_locked', true);
    else
      this.toggleClass(this._pageWrapper, 'page__wrapper_locked', false);
  }
}