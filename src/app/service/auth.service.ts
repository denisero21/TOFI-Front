import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import {JwtToken, Login, ConfirmOtpRequest, UserDto} from "../models/models";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{
  // private API_URL = "api/"
  // // private API_URL = "https://tofi.onrender.com/";
  // private apiUrl = this.API_URL + 'auth';
  constructor() {
    super();
  }

  public override get root(): string {
    return `${this.apiConfig.root}/auth`;
    // return "auth";
  }


  authenticate(loginData: Login): Observable<JwtToken> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.post<JwtToken>(`${this.root}/login`, loginData, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmOtp(otpData: ConfirmOtpRequest): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.root}/confirm_otp`, otpData)
      .pipe(
        catchError(this.handleError)
      );
  }

  refreshOtp(): Observable<JwtToken> {
    return this.http.get<JwtToken>(`${this.root}/refresh_otp`)
      .pipe(
        catchError(this.handleError)
      );
  }

  validateToken(): Observable<any> {
    return this.http.get<any>(`${this.root}/validateToken`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: UserDto): Observable<any>{
    return this.http.post<void>(`${this.root}/register`, user)
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
