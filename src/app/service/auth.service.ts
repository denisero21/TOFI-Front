import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import { JwtToken, Login, ConfirmOtpRequest } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api/api/auth';

  constructor(private http: HttpClient) { }


  authenticate(loginData: Login): Observable<JwtToken> {
    const headers = new HttpHeaders().set('Skip-Token', 'true');
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    if(error.error?.error_description == "error.otp.not_exp_code"){
      alert('Ошибка отправки кода')
    }else {
      alert(error.error?.error_description || 'Something went wrong; please try again later.');
    }
    return throwError(`Something went wrong; please try again later. Error: ${error}`);
  }
}
