import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { AccountComponent } from './pages/account/account.component';
import { CreditComponent } from './pages/credit/credit.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./token.interceptor";
import {RouterModule} from "@angular/router";
import { CryptoComponent } from './pages/crypto/crypto.component';

@NgModule({
  declarations: [
    AppComponent,
    DepositComponent,
    AccountComponent,
    CreditComponent,
    AuthComponent,
    HomeComponent,
    TransferComponent,
    CryptoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
