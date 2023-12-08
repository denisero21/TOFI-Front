import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import {JwtToken, Login, ConfirmOtpRequest, UserDto} from "../models/models";
// import {API_URL} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private API_URL = "api/"
  private API_URL = "https://tofi.onrender.com/";
  private apiUrl = this.API_URL + 'auth';

  constructor(private http: HttpClient) { }


  authenticate(loginData: Login): Observable<JwtToken> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Skip-Token', 'true')
    return this.http.post<JwtToken>(`${this.apiUrl}/login`, loginData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmOtp(otpData: ConfirmOtpRequest): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.apiUrl}/confirm_otp`, otpData)
      .pipe(
        catchError(this.handleError)
      );
  }

  refreshOtp(): Observable<JwtToken> {
    return this.http.get<JwtToken>(`${this.apiUrl}/refresh_otp`)
      .pipe(
        catchError(this.handleError)
      );
  }

  validateToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validateToken`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: UserDto): Observable<any>{
    return this.http.post<void>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    if(error.error?.error_description == "error.otp.not_exp_code"){
      alert('Ошибка отправки кода')
    }else {
      alert(Array.isArray(error.error?.error_description)
        ? error.error.error_description[0]
        : 'Уппс! Проблемы с сервером...');
    }
    return throwError(`Something went wrong; please try again later. Error: ${error}`);
  }
}
