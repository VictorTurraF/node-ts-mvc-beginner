import { Model } from "./Model";
import Order from "./Order";

export default class Car extends Model {
  protected table = "cars";

  public fillable: (keyof Car)[] = [
    "color",
    "year",
    "number",
  ]

  public color: string;
  public year: number;
  public number: string;

  public hasMany() {
    return Order;
  }
}
