import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CryptoRates, Deposit} from "../models/models";
import {API_URL} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getCryptoCurrencyRates(): Observable<any[]> {
    return this.http.get<CryptoRates[]>(`api/api/crypto`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    alert(error.error?.error_description || 'Something went wrong; please try again later.');
    return throwError(`Something went wrong; please try again later. Error: ${error}`);
  }
}
