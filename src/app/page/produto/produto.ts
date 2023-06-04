
export class Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;


    constructor(id: number, nome: string, descricao: string, preco: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
}

