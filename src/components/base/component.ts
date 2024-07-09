import { IEvents } from "./events";

export abstract class Component<T> {
  protected constructor(protected readonly element: HTMLElement, event: IEvents) {};

  toggleClass(element: HTMLElement, className: string) {
    element.classList.toggle(className);
  }

  addImage(element: HTMLImageElement, src: string) {
    element.src = src;
  }

  addText(element: HTMLElement, text: string) {
    element.textContent = text;
  }

  elementUpdate(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.element;
  }
}
