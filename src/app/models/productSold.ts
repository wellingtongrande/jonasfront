export class ProductSold {

    id: any;
    product: any;
    preco: any;
    quantidade: number;

    constructor(id: any, product: any, price: any, priceTotal: any, quantity: number) {
        this.id = id;
        this.product = product;
        this.preco = price;
        this.quantidade = quantity;
    }
}