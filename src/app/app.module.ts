import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./dashboard/sidebar/sidebar.component";
import { ToggleDirective } from "./dashboard/sidebar/toggle.directive";
import { HomeComponent } from "./page/home/home.component";
///////componentes add posteriormente
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgxMaskModule } from "ngx-mask";
import { SaleComponent } from "./page/sale/sale.component";
import { SalesListComponent } from "./page/sales-list/sales-list.component";
import { ConfirmaDeleteComponent } from "./util/confirma-delete/confirma-delete.component";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ProdutoComponent } from "./page/produto/produto.component";
import { ClienteComponent } from "./page/cliente/cliente.component";
import { FuncionarioComponent } from "./page/funcionario/funcionario.component";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ToggleDirective,
        HomeComponent,
        ConfirmaDeleteComponent,
        SaleComponent,
        SalesListComponent,
        ProdutoComponent,
        ClienteComponent,
        FuncionarioComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatNativeDateModule,
        MatRadioModule,
        MatTooltipModule,
        MatRippleModule,
        MatTabsModule,
        MatDividerModule,
        MatToolbarModule,
        MatGridListModule,
        FormsModule,
        CurrencyMaskModule,
        FormsModule,
        MatDatepickerModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatBadgeModule,
        MatChipsModule,
        NgxMaskModule.forRoot({
            // não salvar a mascara
            dropSpecialCharacters: false,
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
