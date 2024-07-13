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
  protected categoryPossible = <Record<string, string>>{
    'софт-скил': '_soft',
    'другое': '_other',
    'дополнительное': '_additional',
    'кнопка': '_button',
    'хард-скил': '_hard'
  };
  protected _index: HTMLElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);

    this._description = element.querySelector(`.card__text`);
    this._image = element.querySelector(`.card__image`);
    this._title = element.querySelector(`.card__title`);
    this._category = element.querySelector(`.card__category`);
    this._price = element.querySelector(`.card__price`);
    this._index = element.querySelector(`.basket__item-index`);
    // this._inBasket = false;

    // Открываем карточку нажатием в каталоге

    element.addEventListener('click', () => {
      if (this.item && this._image)
        events.emit('card:open', this.item);
    });

    // добавляем/убираем карточку в/из корзины нажатием кнопки

    this._button = element.querySelector(`.card__button`);
    if (this._button) {
      this._button.addEventListener('click', () => {
        if (this.item) {
          events.emit('basket:change', this.item);
        }
      })
    }
  }

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

  // выбор цвета для категорий товаров в каталоге и превью

  set category(value: string) {
    this.addText(this._category, value);
    this.toggleClass(this._category, 'card__category_soft', false);
    this.toggleClass(this._category, 'card__category_other', false);
    this.toggleClass(this._category, `card__category${this.categoryPossible[value]}`, true);
  }

  get price(): string {
    return this._price.textContent;
  }

  set price(price: string) {
    if (price)
      this.addText(this._price, `${price} синапсов`);
    else {
      this.addText(this._price, 'Бесценно');
      if (this._button)
        this.changeDisabled(this._button, true);
    }
  }

  get inBasket(): boolean {
    return this.inBasket;
  }

  elementUpdate(data?: Partial<ICard>): HTMLElement {
    Object.assign(this as object, data ?? {});
    if(data)
      this.item = data as ICard;
    return this.element;
  }

  set button(text: string) {
    this.addText(this._button, text);
  }

  get index() {
    if(this._index)
      return this._index.textContent;
    else
      return '';
  }

  set index(value: string) {
    if (this._index)
    this.addText(this._index, value);
  }
}
