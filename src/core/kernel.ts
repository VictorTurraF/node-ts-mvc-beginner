import Router from "./router";
import { HttpRequest } from "./type";

export class Kernel {
  private router: Router;  

  public constructor() {
    this.router = new Router()
  }

  public handle(request: HttpRequest) {
    this.router.handle(request);
  }

  public static create() {
    return new Kernel();
  }
}
