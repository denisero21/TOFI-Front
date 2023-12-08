import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import {CreateCreditDto, Credit, CreditInfo, MakePaymentRequest} from "../models/models";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  constructor(private http: HttpClient) { }

  createCredit(userId: number, creditData: CreateCreditDto): Observable<any> {
    return this.http.post(`api/users/${userId}/credit`, creditData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsersCredits(userId: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`api/users/${userId}/credit`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  payCredit(creditId: number, paymentRequest: MakePaymentRequest): Observable<any> {
    return this.http.post(`api/users/:user_id/credit/${creditId}/pay`, paymentRequest, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCreditInfo(creditId: number){
    return this.http.get<CreditInfo>(`api/users/:user_id/credit/${creditId}`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    alert(Array.isArray(error.error?.error_description)
      ? error.error.error_description[0] == "Not enough money on bank account ( Иди работай бомжара)"
        ? "Недостаточно средств на балансе счета" : error.error.error_description[0]
      : 'Уппс! Проблемы с сервером...');
    return throwError(`Something went wrong; please try again later. Error: ${error}`);
  }
}
