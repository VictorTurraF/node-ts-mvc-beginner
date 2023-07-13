export class Str {
  public static toSnakeCase(key: string): string {
    return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  public static toCamelCase(snakeCase: string): string {
    return snakeCase.replace(/_(\w)/g, (_, c) => c.toUpperCase());
  }
}
