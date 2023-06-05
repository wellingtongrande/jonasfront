import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Produto } from "src/app/models";
import { ProdutoService } from "src/app/service/produto.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";

@Component({
    selector: "app-produto",
    templateUrl: "./produto.component.html",
    styleUrls: ["./produto.component.scss"],
})
export class ProdutoComponent implements OnInit {
    formulario: FormGroup | undefined;
    //lista de products para exiboir
    produtos: Produto[] = [];
    //ordem das colunas no html
    ordemColunasTabela = [
        "id",
        "nome",
        "descricao",
        "preco",
        "excluir",
        "editar",
    ];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
    mensagemErros: String[] = []; //array de strings dos erros retornados do backend

    constructor(
        private produtoService: ProdutoService,
        private formBilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.montarFormulario();
        this.listarProductes(this.pagina, this.tamanho);
    }

    submit() {
        //pegar os dados do formulário
        const formValues = this.formulario?.value;
        // cria e adiciona no objeto
        const produto: Produto = new Produto(
            formValues.id,
            formValues.nome,
            formValues.descricao,
            Number(formValues.preco.toString().replace(",", "."))
        );

        if (formValues.id) {
            this.produtoService.update(produto).subscribe(
                (resposta) => {
                    this.listarProductes(this.pagina, this.tamanho);
                    // exibir mensagem snackbar
                    this.snackBar.open(
                        "Produto alterado com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );
                    this.montarFormulario();
                },
                (errorResponse) => {
                    // exibir mensagem snackbar
                    this.snackBar.open(errorResponse.error.message, "ERRO", {
                        duration: 2000,
                    });
                }
            );
        } else {
            // cria e adiciona no objeto
            this.produtoService.save(produto).subscribe(
                (resposta) => {
                    this.listarProductes(this.pagina, this.tamanho);
                    // exibir mensagem snackbar
                    this.snackBar.open(
                        "Produto salvo com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );
                    this.montarFormulario();
                },
                (errorResponse) => {
                    // exibir mensagem snackbar
                    this.snackBar.open(errorResponse.error.message, "ERRO", {
                        duration: 2000,
                    });
                }
            );
        }
    }

    montarFormulario() {
        delete this.formulario;
        setTimeout(() => {
            this.formulario = this.formBilder.group({
                //validando os dados do formulário
                id: [null, Validators.nullValidator],
                nome: [
                    null,
                    [Validators.minLength(1), Validators.maxLength(50)],
                ],
                descricao: [
                    null,
                    [Validators.minLength(1), Validators.maxLength(50)],
                ],
                preco: [
                    null,
                    [Validators.minLength(1), Validators.maxLength(6)],
                ],
            });
        }, 500);
    }

    listarProductes(pagina: number, tamanho: number) {
        // definir a primeira página e o tamanho inicial
        this.produtoService.list(pagina, tamanho).subscribe((response) => {
            this.produtos = response.content; // pegar o conteudo do pag
            this.totalElementos = response.totalElements; // pegar o total de elementos
            this.pagina = response.number; // pegar o numero de paginas
        });
    }

    private excluir(id: number) {
        this.produtoService.delete(id).subscribe(
            (response) => {
                this.ngOnInit();
                this.mensagemErros = [];
                // exibir mensagem snackbar
                this.snackBar.open(
                    "Producto excluido com sucesso!",
                    "Sucesso",
                    {
                        duration: 2000,
                    }
                );
            },
            (errorResponse) => {
                // exibe mensagem de erro da api
                this.mensagemErros = ["Erro: " + errorResponse.error.message];
            }
        );
    }

    editar(id: number) {
        this.produtoService.findProdutoById(id).subscribe((response) => {
            // cria e adiciona no objeto
            this.formulario?.controls.id.setValue(id);
            this.formulario?.controls.nome.setValue(response.nome);
            this.formulario?.controls.descricao.setValue(response.descricao);
            this.formulario?.controls.preco.setValue(
                (response.preco + "").replace(".", ",")
            );
        });
    }

    //chamar a paginação
    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listarProductes(this.pagina, this.tamanho);
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
}
