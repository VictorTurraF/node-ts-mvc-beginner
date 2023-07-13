import { randomUUID } from "crypto";
import db from "../../core/database";
import { Str } from "../../core/utils";
import deasync from "deasync";

export class Model {
  protected table: string;
  protected id: string;
  public fillable: string[];

  public constructor(jsonData?: object) {
    if (!!jsonData) this.serialize(jsonData);
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
    this.id = randomUUID();

    const inserts = new Map<string, any>([["id", String(this.id)]]);

    this.fillable.map((field) => {
      inserts.set(Str.toSnakeCase(field), this[field as keyof Model]);
    });

    const columnNames = Array.from(inserts.keys()).join(", ");
    const columnValues = Array.from(inserts.values());
    const placeholders = columnValues.map(() => "?").join(", ");

    const sqlQuery = `INSERT INTO ${this.table} (${columnNames}) VALUES (${placeholders})`;

    db.serialize(() => {
      db.run(sqlQuery, columnValues, this.handleSQLError);
    });

    return this;
  }

  public all(): this[] {
    const sqlQuery = `SELECT * FROM ${this.table}`;

    let results: this[] = null!;

    db.all(sqlQuery, [], (err: any, rows: any[]) => {
      if (err) {
        this.handleSQLError(err);
      } else {
        results = rows.map((row: any) => {
          const instance = new (this.constructor as any)(row);
          return instance;
        });
      }
    });

    deasync.loopWhile(() => results === null);

    return results;
  }

  public update(): this {
    const updates = new Map<string, any>();

    this.fillable.forEach((field) => {
      updates.set(Str.toSnakeCase(field), this[field as keyof Model]);
    });

    const updateColumns = Array.from(updates.keys())
      .map((column) => `${column} = ?`)
      .join(", ");
    
    const updateValues = Array.from(updates.values());
    updateValues.push(this.id); // Add the ID as the last value

    const sqlQuery = `UPDATE ${this.table} SET ${updateColumns} WHERE id = ?`;

    db.serialize(() => {
      db.run(sqlQuery, updateValues, this.handleSQLError.bind(this));
    });

    return this;
  }

  public delete(): void {
    
  }

  private handleSQLError(err: any) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Inserted a row into ${this.table} with id ${this.id}`);
    }
  }
}
