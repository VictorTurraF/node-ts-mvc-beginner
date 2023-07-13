import Car from "./Car";
import { Model } from "./Model";

export default class Order extends Model {
  protected table = "orders";

  public fillable = [
    'carId',
    'startDate',
    'endDate'
  ];

  public carId: string;
  public car: Car;
  public startDate: Date;
  public endDate: Date;

  public hasOne() {
    return Car;
  }
}
