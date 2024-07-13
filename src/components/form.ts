import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IEvents } from "./base/events";

interface IForm {
  errorList: string[];
  isValid: boolean;
}

export class Form<T> extends Component<IForm> {
  protected _submitButton: HTMLButtonElement;
  protected _errorList: HTMLElement;

  constructor(element: HTMLFormElement, events: IEvents) {
    super(element, events);

    this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.element);

    this._errorList = ensureElement<HTMLElement>('.form__errors', this.element);

// отлов изменений в полях ввода

    this.element.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      const input = target.name as keyof T;
      const value = target.value;
      this.inputUpdate(input, value);
    })
    
// отлов нажатия кнопки подтверждения для перехода к следующей форме

    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(`${(this.element as HTMLFormElement).name}:submit`);
    });
  }

  inputUpdate(input: keyof T, value: string) {
    this.events.emit(`${(this.element as HTMLFormElement).name}.${String(input)}:change`, {
      input, value
    });
  }

  set errorList(value: string) {
    this.addText(this._errorList, value);
  }

  set isValid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  elementUpdate(data: Partial<T> & IForm): HTMLElement {
    const { errorList, isValid, ...inputs } = data;
    super.elementUpdate({ 
      isValid, errorList });
    Object.assign(this, inputs);
    return this.element;
  }
}