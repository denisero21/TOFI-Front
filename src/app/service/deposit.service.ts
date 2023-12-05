import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import {Deposit} from "../models/models";
import {API_URL} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  createDeposit(userId: number, depositData: any): Observable<any> {
    return this.http.post(`api/api/users/${userId}/deposit`, depositData, { withCredentials: true });
  }

  closeDeposit(depositId: number): Observable<any> {
    return this.http.post(`api/api/users/deposit/${depositId}/close`, {}, { withCredentials: true });
  }

  getUsersDeposits(userId: number): Observable<Deposit[]> {
    return this.http.get<any[]>(`api/api/users/${userId}/deposit`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
