# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Используемые данные

### Интерфейсы

Данные, получаемые с сервера

```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductType;
  price: number | null;
}
```

Интерфейс карточки товара

```
interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductType;
  price: number | null;
  inBasket: boolean;
}
```

Интерфейс главной страницы

```
interface IPage {
  catalog: HTMLElement[];
  orderCounter: number;
  locked: boolean;
}
```

Список товаров в корзине и их общую стоимость

```
interface IBasket {
  orderList: string[];
  totalPrice: number;
}
```

Поля для оформления заказа

```
interface IOrder {
  payment: PaymentType;
  address: string;
  email: string;
  phoneNumber: string;
  orderList: string[];
  totalPrice: number;
}
```

Подтверждение заказа

```
interface IOrderConfirmation {
  totalPrice: number;
}
```

Интерфейс получения данных с сервера

```
interface IProjectApi {
  getCards: () => Promise<IProduct[]>;
  getCard: (id: string) => Promise<IProduct>;
  orderConfirm: (order: IOrder) => Promise<IOrderConfirmation>;
}
```

### Типы данных

Категория товара

```
type ProductType =
  | 'хард-скил'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'другое';
```

Тип для проверки данных пользователя

```
type OrderForm = Omit<IOrder, 'orderList' | 'totalPrice'>;
```

Метод оплаты

```
type PaymentType = 'online' | 'cash';
```


## Архитектура проекта

### Базовые классы

#### Класс API

```
Класс для работы с API. Обладает стандартными методами запросов к серверу и обработки ответов.
```

#### EventEmitter

```
Является посредником между классами отображения и хранения данных. Управляет обработчиками событий и реакцией на их срабатывание.
```

#### Component

```
Абстрактный класс, предназначенный для работы с DOM - элементами. Получает на вход HTML контейнер и связывается с брокером событий через IEvents.
Обладает методами изменения контента внутри HTML-элементов
```

#### Model

```
Класс, хранящий данные и управляющий ими.
Обладает методами управления корзиной:
    Проверка, добавление и убирание товаров, очистка,
  сохранения данных покупателя и параметров товаров в каталоге.
```

### Производные классы

#### ProjectApi

```
Наследует класс API по интерфейсу IProjectApi. Выполняет запросы списка товаров и данных о конкретном товаре.
```

#### Modal

```
Класс для отрисовки модалок, наследует Component
Открывает и закрывает модалки, меняет содержимое внутри окна
```

#### Form

```
Класс для управления формами, наследует Component
Принимает вводимые данные, отображает ошибки
```

#### PaymentForm

```
Класс для формы выбора оплаты и адреса, наследует Form
```

#### ContactsForm

```
Класс для формы заполнения почты и телефона, наследует Form
```

#### Basket

```
Класс для управления и отображения корзины, наследует Component
```

#### Confirmation

```
Класс для окна подтверждения покупки, наследует Modal
```

#### Card

```
Класс для отображения карточки товара, наследует Component
Устанавливает и возвращает значения параметров карточки
```

#### Page

```
Класс для управления главной страницей магазина, наследует Component
Обновляет счетчик товаров, заполняет каталог
```