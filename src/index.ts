import './scss/styles.scss';

import { ProjectApi } from './components/projectapi';
import './scss/styles.scss';
import { ProductType,  OrderForm, PaymentType, IProduct, ICard, 
  IPage, IBasket, IOrder, IOrderConfirmation, IProjectApi } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import { Model } from './components/base/model';
import { Page } from './components/page';

const api = new ProjectApi(CDN_URL, API_URL);
const events = new EventEmitter();
const model = new Model(events);
const page = new Page(document.body, events);

api.getCards()
  .then(model.setItems)
  .catch((err) => console.log(err));



// реализовать базовые интерфейсы и типы данных из доки +
// реализовать получение стартовых даных от сервера и их хранение
// реализовать отрисовку стартовой страницы
