import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { SaleService } from 'src/app/service/sale.service';
import { Produto } from '../produto/produto';
import { Sale } from '../sale/sale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalVendas: number;
  valorVendas: number;
  produtosCadastrados: number;
  produtosAtivos: number;
  sales: Sale[] = [];
  ordemColunasTabela = ['id', 'amount', 'amountPaid', 'difference', 'payment'];
  mensagemErros: String[] = [];


  constructor(
    private saleService: SaleService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.somarVendas();
    this.totalDeVendas();
    this.totalProdutos();
    this.totalProdutosAtivos();
    this.listSales();
  }

  somarVendas() {
    this.saleService.somaTotal().subscribe((response) => {
      this.valorVendas = response;
    })
  }

  totalDeVendas() {
    this.saleService.totalVendas().subscribe((response) => {
      this.totalVendas = response;
    })
  }

  totalProdutos() {
    this.produtoService.totalProdutos().subscribe((response) => {
      this.produtosCadastrados = response;
    })
  }

  totalProdutosAtivos() {
    this.produtoService.totalProdutosAtivos().subscribe((response) => {
      this.produtosAtivos = response;
    })
  }

  listSales() {
    this.saleService.salesLimit().subscribe((response) => {
      this.sales = response;
    });
  }
}
