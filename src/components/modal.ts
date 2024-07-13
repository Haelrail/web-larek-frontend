import { Component } from "./base/component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._content = ensureElement<HTMLElement>(".modal__content", element);
    this._button = ensureElement<HTMLButtonElement>(".modal__close", element);

// закрытие по клику вне модального окна

    this.element.addEventListener('click', (event) => {
      if (event.target === this.element && !this._content.contains(event.target as Node))
        this.closeModal();
    })

    this._button.addEventListener('click', this.closeModal.bind(this));
  }

  set content(element: HTMLElement) {
    this._content.replaceChildren(element);
  }

  openModal() {
    this.toggleClass(this.element, 'modal_active', true);
    this.events.emit('modal:open');
  }

  closeModal() {
    this.toggleClass(this.element, 'modal_active', false);
    this.events.emit('modal:close');
  }
}