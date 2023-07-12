import { HttpRequest } from "../../core/type"

class CarController {
  constructor() {
    console.log("car controller")
  }
  
  public index() {
    console.log("index")
  }

  public create(request: HttpRequest) {
    
  }

  public update() {
    console.log("update")
  }

  public delete() {
    console.log("delete")
  }

}

export default CarController
