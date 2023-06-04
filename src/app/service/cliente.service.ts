import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../page/cliente/cliente';
import { PaginacaoCliente } from '../page/cliente/paginacaoCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = environment.apiBaseUrl + 'cliente';

  constructor(private http: HttpClient) { }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  list(page: number, size: number): Observable<PaginacaoCliente> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  findClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  findClienteByIdActive(id: number): Observable<Cliente> {
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
