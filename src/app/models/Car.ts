import Order from "./Order";

export default class Car {
    public id: string;
    public color: string;
    public year: number;
    public number: string;

    public hasMany() {
        return Order;
    }
}
