import { Str } from "../../core/utils";
import { Model } from "../models/Model";

export class View {
  public static json(model: Model) {
    const fields = [
      'id',
      ...model.fillable
    ]

    const deserialized: any = {}

    fields.forEach(field => {
      const snakeCaseField = Str.toSnakeCase(field);
      deserialized[snakeCaseField] = model[field as keyof Model]
    })

    return deserialized
  }

  
}