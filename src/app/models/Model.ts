import { randomUUID } from "crypto";
import db from "../../core/database";

export class Model {
  protected table: string;
  protected id: string;
  protected fillable: (keyof this)[];

  public constructor(jsonData: object) {
    this.serialize(jsonData);
  }

  private toCamelCase(snakeCase: string): string {
    return snakeCase.replace(/_(\w)/g, (_, c) => c.toUpperCase());
  }

  private serialize(data: object) {
    Object.entries(data).forEach(([key, value]) => {

      const camelCaseKey = this.toCamelCase(key);

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
      inserts.set(String(field), this[field])
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

  private handleSQLError (err: any) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Inserted a row into ${this.table} with id ${this.id}`);
    }
  }
}
