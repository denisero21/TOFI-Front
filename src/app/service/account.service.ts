import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CreateAccountDto, TransferRequest, ChangeAccountDto, Account} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'api/users';

  constructor(private http: HttpClient) { }

  createAccount(userId: number, accountDto: CreateAccountDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/accounts`, accountDto)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUsersAccounts(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/${userId}/accounts`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  addMoney(accountId: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/:user_id/accounts/${accountId}/add_money`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMoney(accountId: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/:user_id/accounts/${accountId}/no_money`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  makeTransfer(request: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/:user_ud/accounts/transfer`, request, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeAccountStatus(accountId: number, isBlocked: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/account/${accountId}/status?is_blocked=${isBlocked}`, null, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeAccount(accountId: number, dto: ChangeAccountDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/account/${accountId}`, dto, { withCredentials: true })
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
