import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Crypto_} from "../pages/crypto/crypto";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CryptoService extends ApiService{
  constructor() {
    super();
  }

  // private API_URL = "https://tofi.onrender.com/";
  // private apiUrl = this.API_URL
  // // private apiUrl = ""

  public override get root(): string {
    return `${this.apiConfig.root}`;
    // return "";
  }

  getCryptoCurrencyRates(): Observable<Crypto_> {
    return this.http.get<Crypto_>(`${this.root}/crypto`, { withCredentials: true })
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
