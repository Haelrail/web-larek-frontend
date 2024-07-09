import { ICard } from "../types";
import { Component } from "./base/component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class Card extends Component<ICard> {
  protected _description?: HTMLElement;
  protected _image?: HTMLElement;
  protected _title: HTMLElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._description = element.querySelector(`.card__text`);
    this._image = element.querySelector(`.card__image`);
    this._title = ensureElement<HTMLElement>('.card__title');
    this._category = element.querySelector(`.card__category`);
    this._price = ensureElement<HTMLElement>('.card__price');
  }

  // id: string;
  // description: string;
  // image: string;
  // title: string;
  // category: ProductType;
  // price: number | null;
  // inBasket: boolean;

  get id(): string {
    return this.element.dataset.id;
  }

  get description(): string {
    return this._title.textContent; 
  }
}