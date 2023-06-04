import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoProduto } from '../page/produto/paginacaoProduto';
import { Produto } from '../page/produto/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiURL: string = environment.apiBaseUrl + 'produto';

  constructor(private http: HttpClient) { }

  save(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiURL, produto);
  }

  list(page: number, size: number): Observable<PaginacaoProduto> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  update(produto: Produto): Observable<any> {
    return this.http.put<Produto>(`${this.apiURL}/${produto.id}`, produto);
  }

  findProdutoById(id: number): Observable<Produto> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  findProdutoByIdActive(id: number): Observable<Produto> {
    return this.http.get<any>(`${this.apiURL}/active/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

   totalProdutos(): Observable<any>{
     return this.http.get<any>(`${this.apiURL}/count`);
   }

   totalProdutosAtivos(): Observable<any>{
     return this.http.get<any>(`${this.apiURL}/active`);
   }
}
