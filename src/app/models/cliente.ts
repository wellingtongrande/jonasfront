
export class Cliente {
    id: number;
    nome: string;
    idade: number;
    telefone: string;
    senha: string;
    email: string;

    constructor(id: number, nome: string, idade: number, telefone: string, senha: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.telefone = telefone;
        this.senha = senha;
        this.email = email;
    }
}
