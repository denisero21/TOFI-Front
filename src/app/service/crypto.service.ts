import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
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
  }
}
