import { HttpRequest } from "../../core/type";
import Order from "../models/Order";
import { View } from "../views/View";

class OrderController {

  public index() {
    const order = new Order()
  
    const allOrders = order.all()

    return allOrders.map(order => View.json(order))
  }

  public create(request: HttpRequest) {
    const order = new Order(request.body);

    const createdOrder = order.save()

    return View.json(createdOrder);
  }

  public update(request: HttpRequest) {
    const order = new Order(request.body);

    const updatedOrder = order.update();

    return View.json(updatedOrder);
  }

  public delete() {
  }
}

export default OrderController;
