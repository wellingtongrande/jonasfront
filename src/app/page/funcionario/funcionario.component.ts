import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FuncionarioService } from "src/app/service/funcionario.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Funcionario } from "../../models/funcionario";

@Component({
    selector: "app-funcionario",
    templateUrl: "./funcionario.component.html",
    styleUrls: ["./funcionario.component.scss"],
})
export class FuncionarioComponent implements OnInit {
    formulario: FormGroup | undefined;
    //lista de funcionario para exibir
    funcionarios: Funcionario[] = [];
    //ordem das colunas no html
    ordemColunasTabela = [
        "id",
        "nome",
        "idade",
        "telefone",
        "senha",
        "email",
        "excluir",
        "editar",
    ];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
    mensagemErros: String[] = []; //array de strings dos erros retornados do backend

    constructor(
        private funcionarioService: FuncionarioService,
        private formBilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.montarFormulario();
        this.listarFuncionarios(this.pagina, this.tamanho);
    }

    submit() {
        //pegar os dados do formulário
        const formValues = this.formulario?.value;
        // cria e adiciona no objeto
        const funcionario: Funcionario = new Funcionario(
            formValues.id,
            formValues.nome,
            formValues.idade,
            formValues.telefone,
            formValues.senha,
            formValues.email
        );

        if (formValues.id) {
            this.funcionarioService.update(funcionario).subscribe(
                (resposta) => {
                    this.listarFuncionarios(this.pagina, this.tamanho);
                    // exibir mensagem snackbar
                    this.snackBar.open(
                        "Funcionario alterado com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );
                    //limpar formulário
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
            this.funcionarioService.save(funcionario).subscribe(
                (resposta) => {
                    this.listarFuncionarios(this.pagina, this.tamanho);
                    // exibir mensagem snackbar
                    this.snackBar.open(
                        "Funcionario salvo com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );
                    //limpar formulário
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
                    [Validators.minLength(2), Validators.maxLength(50)],
                ],
                idade: [
                    null,
                    [Validators.minLength(1), Validators.maxLength(2)],
                ],
                telefone: [
                    null,
                    [Validators.minLength(1), Validators.maxLength(12)],
                ],
                senha: [
                    null,
                    [Validators.minLength(3), Validators.maxLength(20)],
                ],
                email: [
                    null,
                    [
                        Validators.minLength(4),
                        Validators.maxLength(30),
                        Validators.email,
                    ],
                ],
            });
        }, 500);
    }

    listarFuncionarios(pagina: number, tamanho: number) {
        // definir a primeira página e o tamanho inicial
        this.funcionarioService.list(pagina, tamanho).subscribe((response) => {
            this.funcionarios = response.content; // pegar o conteudo do pag
            this.totalElementos = response.totalElements; // pegar o total de elementos
            this.pagina = response.number; // pegar o numero de paginas
        });
    }

    private excluir(id: number) {
        this.funcionarioService.delete(id).subscribe(
            (response) => {
                this.ngOnInit();
                this.mensagemErros = [];
                // exibir mensagem snackbar
                this.snackBar.open(
                    "Funcionario excluido com sucesso!",
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
        this.funcionarioService.findClienteById(id).subscribe((response) => {
            // cria e adiciona no objeto
            this.formulario?.controls.id.setValue(id);
            this.formulario?.controls.nome.setValue(response.nome);
            this.formulario?.controls.idade.setValue(response.idade);
            this.formulario?.controls.telefone.setValue(response.telefone);
            this.formulario?.controls.senha.setValue(response.senha);
            this.formulario?.controls.email.setValue(response.email);
        });
    }

    //chamar a paginação
    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listarFuncionarios(this.pagina, this.tamanho);
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
