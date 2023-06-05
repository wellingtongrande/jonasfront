import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProdutoService } from "src/app/service/produto.service";
import { Pedido, ProductSold } from "src/app/models";
import { PedidoService } from "src/app/service/pedido.service";
@Component({
    selector: "app-sale",
    templateUrl: "./sale.component.html",
    styleUrls: ["./sale.component.css"],
})
export class SaleComponent implements OnInit {
    productsSolds: ProductSold[] = [];
    formAddItem: FormGroup;
    //ordem das colunas no html
    ordemColunasTabela = ["id", "quantity", "name", "price", "priceTotal"];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
    mensagemErros: String[] = []; //array de strings dos erros retornados do backend
    statusCaixa = "Caixa Livre";
    data: any;
    pagar: any;

    constructor(
        private produtoService: ProdutoService,
        private pedidoService: PedidoService,
        private formBilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.montarFormulario();
    }

    montarFormulario() {
        this.formAddItem = this.formBilder.group({
            //validando os dados do formulário
            id: [
                null,
                [
                    Validators.required,
                    Validators.maxLength(13),
                    Validators.minLength(1),
                ],
            ],
            quantidade: [null, [Validators.required, Validators.maxLength(50)]],
        });
    }

    limparFormulario() {
        this.formAddItem.reset();
        this.productsSolds = [];
        this.statusCaixa = "Caixa Livre";
    }

    load() {
        //Session storage salva os dados como string
        (sessionStorage.refresh == "true" || !sessionStorage.refresh) &&
            location.reload();
        sessionStorage.refresh = true;
    }

    adicionarItem() {
        const formValues = this.formAddItem.value;
        this.produtoService.findProdutoById(formValues.id).subscribe(
            (response) => {
                const total = response.preco * formValues.quantidade;
                const productSold = new ProductSold(
                    null,
                    response,
                    response.preco,
                    total,
                    formValues.quantidade
                );

                this.productsSolds = this.productsSolds.concat(productSold);
                this.statusCaixa = "Venda em Aberto";
            },
            (errorResponse) => {
                // exibir mensagem snackbar
                this.snackBar.open(errorResponse.error.message, "ERRO", {
                    duration: 3000,
                });
            }
        );
    }

    getTotalCost() {
        // this.pagar = this.productsSolds.map(t => t.priceTotal).reduce((acc, value) => acc + value, 0)
        return this.pagar;
    }

    save() {
        alert("Not implementhed");
    }
}
