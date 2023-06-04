import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SaleComponent } from './page/sale/sale.component';
import { SalesListComponent } from './page/sales-list/sales-list.component';
import { ProdutoComponent } from './page/produto/produto.component';
import { ClienteComponent } from './page/cliente/cliente.component';
import { FuncionarioComponent } from './page/funcionario/funcionario.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'sales', component: SalesListComponent },
  { path: 'login', component: LoginComponent },
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
