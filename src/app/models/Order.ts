import Car from "./Car";

export default class Order {
    public id: string;
    public carId: string;
    public car: Car;
    public startDate: Date;
    public endDate: Date;

    public hasOne() {
        return Car
    }
}