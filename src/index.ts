import './scss/styles.scss';

import { ProjectApi } from './components/projectapi';
import './scss/styles.scss';
import { ProductType,  OrderForm, PaymentType, IProduct, ICard, 
  IPage, IBasket, IOrder, IOrderConfirmation, IProjectApi } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import { Model } from './components/base/model';
import { Page } from './components/page';
import { Card } from './components/card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/modal';
import { Basket } from './components/basket';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalTemplate = ensureElement<HTMLElement>('#modal-container')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const api = new ProjectApi(CDN_URL, API_URL);
const events = new EventEmitter();
const model = new Model(events);
const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

api.getCards()
  .then((data) => model.setItems(data))
  .catch((err) => console.log(err));

console.log(model.basket.orderList); //////
console.log(model.basket.totalPrice); /////

events.on("catalog:fill", (catalog: ICard[]) => {
  page.catalog = catalog.map((item) => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), events);
    return card.elementUpdate(item);
  });
});

events.on("card:open", (item: ICard) => {
  const card = new Card(cloneTemplate(cardPreviewTemplate), events);
  model.openCard(item);

  // if (model.checkBasket(item))
  //   card.inBasket = true;
  // else
  //   card.inBasket = false;

  if (model.checkBasket(item))
    card.button = 'Удалить из корзины';
  else
    card.button = 'В корзину';

  modal.elementUpdate({
    content: card.elementUpdate(item)
  });
  modal.openModal();
});

events.on("modal:open", () => {
  page.isLocked = true;
});

events.on("modal:close", () => {
  page.isLocked = false;
});

events.on("basket:open", () => {

  basket.orderList = model.basket.orderList.map((id) => {
    const item = model.items.find((item) => item.id === id);
    if (item) {
    const card = new Card(cloneTemplate(cardBasketTemplate), events);
    return card.elementUpdate(item);
    }
  })

  modal.elementUpdate({
    content: basket.elementUpdate()
  });
  modal.openModal();
})

events.on("basket:change", (item: ICard) => {
  if (!model.checkBasket(item))
    model.addInBasket(item);
  else
    model.removeFromBasket(item);
  page.counter = model.basket.orderList.length;
  basket.totalPrice = model.basket.totalPrice;
})

// console.log(model.items);
// console.log (page.catalog);

// const i = document.querySelector(`.header__basket-counter`);
// i.textContent = '1';

// привести в требуемый вид документацию
// реализовать базовые интерфейсы и типы данных из доки +
// реализовать получение стартовых даных от сервера и их хранение +
// реализовать отрисовку стартовой страницы +
// исправить цвета категорий товаров в каталоге
// реализовать открывание карточки товара по нажатию (подключение модалки и работы с ней) +
// добавить закрытие модалки +
// корректное отображение данных на открытой карточке +
// реализовать корзину +
// добавить на открытую карточку работающую кнопку добавления в корзину +
// добавить открытие корзины по нажатию кнопки +
// корректное отображение интерфейса корзины +
// настроить удаление карточки из окна корзины при нажатии на кнопку
// подключить формы
