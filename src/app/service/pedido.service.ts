import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PaginacaoPedido, Pedido } from "../models";

@Injectable({
    providedIn: "root",
})
export class PedidoService {
    apiURL: string = environment.apiBaseUrl + "pedido";

    constructor(private http: HttpClient) {}

    save(Pedido: Pedido): Observable<Pedido> {
        return this.http.post<Pedido>(this.apiURL, Pedido);
    }

    list(page: number, size: number): Observable<PaginacaoPedido> {
        const params = new HttpParams()
            .set("page", page.toString())
            .set("size", size.toString());
        return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/${id}`);
    }

    somaTotal(): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/somatotal`);
    }

    totalVendas(): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/count`);
    }

    PedidosLimit(): Observable<any> {
        return this.http.get<any>(`${this.apiURL}/limit`);
    }
}
