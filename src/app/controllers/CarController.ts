import { HttpRequest } from "../../core/type";
import Car from "../models/Car";
import { View } from "../views/View";

class CarController {
  public index() {
    const car = new Car();
    const cars = car.all();

    return cars.map((car) => View.json(car));
  }

  public create(request: HttpRequest) {
    const car = new Car(request.body);

    const createdCar = car.save();

    return View.json(createdCar);
  }

  public update(request: HttpRequest) {
    const car = new Car(request.body);

    const updatedCar = car.update()

    return View.json(updatedCar);
  }

  public delete() {
  }
}

export default CarController;
