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

  document.addEventListener('click', (evt) => {
    const target = evt.target as Element;
    if (target.matches('.modal_active')) {
      this.closeModal();
    }
  })

    this._button.addEventListener('click', this.closeModal.bind(this));
  }

  set content(element: HTMLElement) {
    this._content.replaceChildren(element);
  }

  openModal() {
    this.element.classList.add("modal_active");
    // this.toggleClass(this.element, 'modal_active');
    this.events.emit('modal:open');
  }

  closeModal() {
    this.element.classList.remove("modal_active");
    // this.toggleClass(this.element, 'modal_active');
    this.events.emit('modal:close');
  }

  // elementUpdate(data?: Partial<IModal>): HTMLElement {
  //   Object.assign(this as object, data ?? {});
  //   return this.element;
  // }
}