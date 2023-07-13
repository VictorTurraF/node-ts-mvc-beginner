import { HttpRequest } from "../../core/type";
import Order from "../models/Order";
import { View } from "../views/View";

class OrderController {
  constructor() {
    console.log("order controller");
  }

  public index() {
    console.log("index");
  }

  public create(request: HttpRequest) {
    const order = new Order(request.body);

    const createdOrder = order.save()

    return View.json(createdOrder);
  }

  public update() {
    console.log("update");
  }

  public delete() {
    console.log("delete");
  }
}

export default OrderController;
