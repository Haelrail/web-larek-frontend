import { IEvents } from "./events";

export abstract class Component<T> {
  protected constructor(protected readonly element: HTMLElement, protected readonly events: IEvents) {};

  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    if (element)
      element.classList.toggle(className, force);
  }

  changeDisabled(element: HTMLElement, value: boolean) {
    if (value)
      element.setAttribute('disabled', 'disabled');
    else
      element.removeAttribute('disabled');
  }

  addImage(element: HTMLImageElement, src: string) {
    if (element)
      element.src = src;
  }

  addText(element: HTMLElement, text: string) {
    if (element)
      element.textContent = text;
  }

  elementUpdate(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.element;
  }
}
