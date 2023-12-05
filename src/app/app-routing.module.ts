import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {DepositComponent} from "./pages/deposit/deposit.component";
import {AccountComponent} from "./pages/account/account.component";
import {CreditComponent} from "./pages/credit/credit.component";
import {CryptoComponent} from "./pages/crypto/crypto.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'crypto', component: CryptoComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'users/:user_id/deposit', component: DepositComponent},
  {path: 'users/:user_id/account', component: AccountComponent},
  {path: 'users/:user_id/credit', component: CreditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
