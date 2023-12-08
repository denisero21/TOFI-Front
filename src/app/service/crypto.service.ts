import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Crypto_} from "../pages/crypto/crypto";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor(private http: HttpClient) { }

  private API_URL = "https://tofi.onrender.com/";
  private apiUrl = this.API_URL
  // private apiUrl = ""

  getCryptoCurrencyRates(): Observable<Crypto_> {
    return this.http.get<Crypto_>(`${this.apiUrl}/crypto`, { withCredentials: true })
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
