import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header.component';
import {DropdownDirective} from './dropdown.directive';
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {routing} from "./app.routing";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing,

    ShoppingListModule,
  ],
  providers: [ShoppingListService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
