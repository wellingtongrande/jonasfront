import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Funcionario } from "../models/funcionario";
import { PaginacaoFuncionario } from "../models";

@Injectable({
    providedIn: "root",
})
export class FuncionarioService {
    apiURL: string = environment.apiBaseUrl + "funcionario";

    constructor(private http: HttpClient) {}

    save(funcionario: Funcionario): Observable<Funcionario> {
        return this.http.post<Funcionario>(this.apiURL, funcionario);
    }

    list(page: number, size: number): Observable<PaginacaoFuncionario> {
        const params = new HttpParams()
            .set("page", page.toString())
            .set("size", size.toString());
        return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
    }

    update(funcionario: Funcionario): Observable<any> {
        return this.http.put<Funcionario>(
            `${this.apiURL}/${funcionario.id}`,
            funcionario
        );
    }

    findClienteById(id: number): Observable<Funcionario> {
        return this.http.get<any>(`${this.apiURL}/${id}`);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/${id}`);
    }
}
