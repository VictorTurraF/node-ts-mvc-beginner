import { randomUUID } from "crypto";
import db from "../../core/database";
import { Str } from "../../core/utils";

export class Model {
  protected table: string;
  protected id: string;
  public fillable: string[];

  public constructor(jsonData: object) {
    this.serialize(jsonData);
  }

  private serialize(data: object) {
    Object.entries(data).forEach(([key, value]) => {

      const camelCaseKey = Str.toCamelCase(key);

      Object.defineProperty(this, camelCaseKey, {
        value: value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
  }

  public save() {
    console.log("tt", this.table);
    this.id = randomUUID()

    const inserts = new Map<string, any>([
      ["id", String(this.id)]
    ])
    
    this.fillable.map(field => {
      inserts.set(Str.toSnakeCase(field), this[field as keyof Model])
    })

    const columnNames = Array.from(inserts.keys()).join(", ")
    const columnValues = Array.from(inserts.values())
    const placeholders = columnValues.map(() => "?").join(", ")
    
    const sqlQuery = `INSERT INTO ${this.table} (${columnNames}) VALUES (${placeholders})`

    db.serialize(() => {
      db.run(sqlQuery, columnValues, this.handleSQLError)
    })

    return this
  }

  public static all() {
    
  }

  private handleSQLError (err: any) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Inserted a row into ${this.table} with id ${this.id}`);
    }
  }
}
