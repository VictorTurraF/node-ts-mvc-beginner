import db from "./database";
import Router from "./router";
import { HttpRequest } from "./type";

export class Kernel {
  private router: Router;  

  public constructor() {
    this.router = new Router()
    this.initDatabase()
  }

  public handle(request: HttpRequest) {
    this.router.handle(request);
  }

  public static create() {
    return new Kernel();
  }

  private initDatabase() {
    console.log("initing db");
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS cars (
          id UUID PRIMARY KEY, 
          color TEXT, 
          year INTEGER,
          number TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS orders (
          id UUID PRIMARY KEY,
          car_id INT,
          start_date DATE,
          end_date DATE
        );
      `)
    });
  }
}
