import { HttpRequest } from "../../core/type"
import Car from "../models/Car"

class CarController {
  constructor() {
    console.log("car controller")
  }
  
  public index() {
    console.log("index")
  }

  public create(request: HttpRequest) {
    const car = new Car(request.body)

    const createdCar = car.save()

    return
  }

  public update() {
    console.log("update")
  }

  public delete() {
    console.log("delete")
  }

}

export default CarController
