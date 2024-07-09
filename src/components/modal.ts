import { Component } from "./base/component";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  constructor(element: HTMLElement, events: IEvents) {
    super(element, events);
    this._content = ensureElement<HTMLElement>(".modal__content", element);
  }

  set content(element: HTMLElement) {
    this._content.replaceChildren(element);
  }

  openModal() {
    // this.element.classList.add('modal_active');
    this.toggleClass(this.element, 'modal_active');
    this.events.emit('modal:open');
  }
}