import { Component } from "@angular/core";
import { Pedido } from "src/app/models";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    totalVendas: number;
    valorVendas: number;
    produtosCadastrados: number;
    produtosAtivos: number;
    sales: Pedido[] = [];
    ordemColunasTabela = [
        "id",
        "amount",
        "amountPaid",
        "difference",
        "payment",
    ];
    mensagemErros: String[] = [];
}
