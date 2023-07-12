import CarController from "../app/controllers/CarController";
import OrderController from "../app/controllers/OrderController";
import { HttpRequest } from "./type";

export default class Router {
  private methodBinds = new Map([
    ["GET", "index"],
    ["POST", "create"],
    ["PUT", "udpate"],
    ["DELETE", "delete"],
  ]);

  public routeBinds = new Map([
    ["/cars", { controller: CarController, isResource: true }],
    ["/orders", { controller: OrderController, isResource: true }],
  ]);

  public handle(request: HttpRequest) {
    const { httpVerb, urlPath } = request;
    
    const controllerMethod = this.methodBinds.get(httpVerb);
    const contollerConfig = this.routeBinds.get(urlPath)

    if (!contollerConfig)
      return

    const ControllerClass = contollerConfig.controller;
    const controllerInstance = new ControllerClass();

    if (controllerMethod) {
      controllerInstance[controllerMethod](request);
    }
  }
}
