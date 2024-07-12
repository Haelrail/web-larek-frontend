import { Api, ApiListResponse } from './base/api';
import { IOrder, IOrderConfirmation, IProduct, IProjectApi } from '../types';

export class ProjectApi extends Api implements IProjectApi {

  readonly cdn : string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCard(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then((item: IProduct) => ({
      ...item,
      image: this.cdn + item.image,
    }));
  }

  getCards(): Promise<IProduct[]> {
    return this.get(`/product`).then((data: ApiListResponse<IProduct>) =>
    data.items.map((item) => ({
      ...item,
      image: this.cdn + item.image,
    })));
  }

  orderConfirm(order: IOrder): Promise<IOrderConfirmation> {
    return this.post(`/order`, order)
      .then((data: IOrderConfirmation) => data);
  }

}
