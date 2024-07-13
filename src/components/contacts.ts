import { OrderForm } from "../types";
import { Form } from "./form";
import { IEvents } from "./base/events";

export class Contacts extends Form<OrderForm> {
  constructor(element: HTMLFormElement, events: IEvents) {
    super(element, events);
  }

  set email(value: string) {
    ((this.element as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value = value;
  }

  set phone(value: string) {
    ((this.element as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value = value;
  }
}
