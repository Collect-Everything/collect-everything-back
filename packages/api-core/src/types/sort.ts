import { Order } from "sequelize";

export interface ISort {
  [key: string]: Order;
}
