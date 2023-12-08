import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import {Deposit, DepositDto} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private http: HttpClient) { }

  private API_URL = "https://tofi.onrender.com";
  private apiUrl = this.API_URL
  // private apiUrl = ""

  createDeposit(userId: number, depositData: DepositDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/deposit`, depositData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  closeDeposit(depositId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/:user_id/deposit/${depositId}/close`, {}, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsersDeposits(userId: number): Observable<Deposit[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/deposit`, { withCredentials: true })
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
