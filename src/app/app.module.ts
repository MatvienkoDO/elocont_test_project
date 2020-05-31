import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { TableComponent } from './components/table/table.component';
import { TableDataInterceptor } from './interceptors/table-data.interceptor';
import { RowComponent } from './components/row/row.component';
import { CellComponent } from './components/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TableComponent,
    RowComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TableDataInterceptor }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
