import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { Pedido, ProductSold } from "src/app/models";
import { PedidoService } from "src/app/service/pedido.service";

@Component({
    templateUrl: "./sales-list.component.html",
    styleUrls: ["./sales-list.component.scss"],
    animations: [
        trigger("detailExpand", [
            state(
                "collapsed",
                style({ height: "0px", minHeight: "0", visibility: "hidden" })
            ),
            state("expanded", style({ height: "*", visibility: "visible" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            ),
        ]),
    ],
})
export class SalesListComponent implements OnInit {
    sales: Array<Pedido | { defailRow?: boolean; element?: Pedido }>;
    ordemColunasTabela = ["id", "amount", "payment"];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
    mensagemErros: String[] = []; //array de strings dos erros retornados do backend
    expandedElement: any;
    constructor(
        private pedidoService: PedidoService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.listSales(this.pagina, this.tamanho);
    }

    listSales(pagina: number, tamanho: number) {
        this.pedidoService.list(pagina, tamanho).subscribe((response) => {
            this.sales = [];
            response.content.forEach((element) =>
                this.sales.push(element, { detailRow: true, element } as any)
            );
            this.totalElementos = response.totalElements;
            this.pagina = response.number;
        });
    }

    openDialog(id: number) {
        const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
        dialogRef.afterClosed().subscribe((result) => {
            // se clicar em ok chama evento de excluir
            if (result) {
                this.excluir(id);
            }
        });
    }

    private excluir(id: number) {
        this.pedidoService.delete(id).subscribe(
            (response) => {
                this.ngOnInit();
                this.mensagemErros = [];
                // exibir mensagem snackbar
                this.snackBar.open("Venda excluida com sucesso!", "Sucesso", {
                    duration: 2000,
                });
            },
            (errorResponse) => {
                // exibe mensagem de erro da api
                this.mensagemErros = ["Erro: " + errorResponse.error.message];
            }
        );
    }

    //chamar a paginação
    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listSales(this.pagina, this.tamanho);
    }

    productQuantity(row: any): number {
        return row.quantidade;
    }

    isExpansionDetailRow = (i: number, row: Object) =>
        row.hasOwnProperty("detailRow");

    getTotal(itens: Array<ProductSold>): number {
        return itens.reduce(
            (sum, item) => (sum += item.preco * item.quantidade),
            0
        );
    }

    expand(row: any) {
        if (this.expandedElement && this.expandedElement.id === row.id) {
            delete this.expandedElement;
        } else {
            this.expandedElement = row;
        }
    }
}
