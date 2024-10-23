import { Cart } from "./Cart";
import { Customer } from "./Customer";

    export interface Order {
        orderId: number;
        orderDate: Date; 
        orderStatus: string;
        cart: Cart; 
        customer:Customer;
    }