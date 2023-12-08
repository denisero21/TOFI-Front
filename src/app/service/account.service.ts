import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CreateAccountDto, TransferRequest, ChangeAccountDto, Account} from '../models/models';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService{
  // private API_URL = "https://tofi.onrender.com/";
  // private API_URL = "api";
  // private apiUrl = this.API_URL + '/users';
  // private apiUrl = 'users';
  constructor() {
    super();
  }

  public override get root(): string {
    return `${this.apiConfig.root}/users`;
    // return "users";
  }

  createAccount(userId: number, accountDto: CreateAccountDto): Observable<void> {
    return this.http.post<void>(`${this.root}/${userId}/accounts`, accountDto)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUsersAccounts(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.root}/${userId}/accounts`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  addMoney(accountId: number): Observable<void> {
    return this.http.get<void>(`${this.root}/:user_id/accounts/${accountId}/add_money`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMoney(accountId: number): Observable<void> {
    return this.http.get<void>(`${this.root}/:user_id/accounts/${accountId}/no_money`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  makeTransfer(request: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.root}/:user_ud/accounts/transfer`, request, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeAccountStatus(accountId: number, isBlocked: boolean): Observable<void> {
    return this.http.patch<void>(`${this.root}/account/${accountId}/status?is_blocked=${isBlocked}`, null, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeAccount(accountId: number, dto: ChangeAccountDto): Observable<void> {
    return this.http.put<void>(`${this.root}/account/${accountId}`, dto, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    alert(Array.isArray(error.error?.error_description)
      ? error.error.error_description[0]
      : 'Уппс! Проблемы с сервером...');
    return throwError(`Something went wrong; please try again later. Error: ${error}`);
  }
}
