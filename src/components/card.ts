import { ICard, IProduct, ProductType } from "../types";
import { Component } from "./base/component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class Card extends Component<ICard> {
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;
  protected _inBasket: boolean;
  protected _button: HTMLButtonElement;
  private item?: ICard;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._description = element.querySelector(`.card__text`);
    this._image = element.querySelector(`.card__image`);
    // this._title = ensureElement<HTMLElement>('.card__title');
    this._title = element.querySelector(`.card__title`);
    this._category = element.querySelector(`.card__category`);
    // this._price = ensureElement<HTMLElement>('.card__price');
    this._price = element.querySelector(`.card__price`);
    this._inBasket = false;
    element.addEventListener('click', () => {
      if (this.item)
        events.emit('card:open', this.item);
    });
    this._button = element.querySelector(`.card__button`);
  }

  // id: string;
  // description: string;
  // image: string;
  // title: string;
  // category: ProductType;
  // price: number | null;
  // inBasket: boolean;

  //методы для полей image, category и description ???

  get id(): string {
    return this.element.dataset.id;
  }

  set id(id: string) {
    this.element.dataset.id = id;
  }

  get description(): string {
    return this._description.textContent;
  }

  set description(description: string) {
    this.addText(this._description, description);
  }

  set image(image: string) {
    this.addImage(this._image, image);
  }

  get title(): string {
    return this._title.textContent;
  }

  set title(title: string) {
    this.addText(this._title, title);
  }

  get category(): string {
    return this._category.textContent;
  }

  set category(category: string) {
    this.addText(this._category, category);
  }

  get price(): string {
    return this._price.textContent;
  }

  set price(price: string) {
    if (price)
      this.addText(this._price, `${price} синапсов`);
    else
    this.addText(this._price, price);
  }

  get inBasket(): boolean {
    return this.inBasket;
  }

  set inBasket(value: boolean) {
    this.inBasket = value;
  }

  elementUpdate(data?: Partial<ICard>): HTMLElement {
    Object.assign(this as object, data ?? {});
    if(data)
      this.item = data as ICard;
    return this.element;
  }
}