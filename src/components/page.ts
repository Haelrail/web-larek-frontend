import { Component } from "./base/component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";
import { IPage } from "../types";

export class Page extends Component<IPage> {
  // counter: number;
  // catalog: HTMLElement[];
  // locked: boolean;

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
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set counter(counterUpdate: number) {
    this.addText(this._counter, String(counterUpdate));
  }

  set isLocked(value: boolean) {
    // if(value)
    //   this._pageWrapper.classList.add("page__wrapper_locked");
    // else
    // this._pageWrapper.classList.remove("page__wrapper_locked");
    this.toggleClass(this._pageWrapper, 'page__wrapper_locked');
  }
}