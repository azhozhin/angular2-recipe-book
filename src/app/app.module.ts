import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header.component';
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {routing} from "./app.routing";
import { PageNotFoundComponent } from './page-not-found.component';
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    CoreModule,
  ],
  providers: [ShoppingListService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
