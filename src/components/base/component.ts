import { IEvents } from "./events";

export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement, event: IEvents) {};

  toggleClass(element: HTMLElement, className: string) {
    element.classList.toggle(className);
  }
}
