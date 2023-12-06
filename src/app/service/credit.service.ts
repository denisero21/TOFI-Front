import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import { CreateCreditDto, Credit, MakePaymentRequest } from "../models/models";
import { API_URL } from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  constructor(private http: HttpClient) { }

  createCredit(userId: number, creditData: CreateCreditDto): Observable<any> {
    return this.http.post(`api/api/users/${userId}/credit`, creditData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsersCredits(userId: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`api/api/users/${userId}/credit`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  payCredit(creditId: number, paymentRequest: MakePaymentRequest): Observable<any> {
    return this.http.post(`api/api/users/:userId/credit/${creditId}/pay`, paymentRequest, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
