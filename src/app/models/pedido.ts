import { ProductSold } from "./productSold";

export class Pedido {
    id: any;
    amount: any;
    amountPaid: any;
    difference: any;
    payment: any;
    itens: Array<ProductSold>;
    momentoPedido: string;
    constructor(
        id: any,
        amount: any,
        amountPaid: any,
        difference: any,
        payment: any,
        itens: Array<ProductSold>
    ) {
        this.id = id;
        this.amount = amount;
        this.amountPaid = amountPaid;
        this.difference = difference;
        this.payment = payment;
        this.itens = itens;
    }
}
