import { Component } from '@angular/core';
import { AuthService} from "../../service/auth.service";
import { Login, ConfirmOtpRequest} from "../../models/models";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isTwoFactor: boolean = false
  isEnableToRefresh: boolean = false

  loginData: Login = {
    login: 'deniserochenko@gmail.com',
    password: 'password'
  };

  otpData: ConfirmOtpRequest = {
    otp_code: 0
  };

  setIsEnableToRefresh(){
    this.isEnableToRefresh = true
  }

  constructor(private router: Router,private authService: AuthService) {}

  authenticate(): void {
    this.authService.authenticate(this.loginData)
      .subscribe(
        (jwtToken) => {
          localStorage.setItem('token', jwtToken.token.toString())
          if (jwtToken.otpExpiration != null){
            localStorage.setItem('otp_exp', jwtToken.otpExpiration.toString())
          }
          console.log('Authentication successful:', jwtToken);
          const decodedToken: any = jwtDecode(jwtToken.token.toString());
          console.log('Decoded Token:', decodedToken);
          if (decodedToken.two_factor){
            alert('Код подтверждения был отправлен на почту')
            this.isTwoFactor=true
            this.startTwoMinutesCountdown()
          }else{
            alert('Успешная авторизация')
            this.loginData.login = ''
            this.loginData.password = ''
          }
        },
        (error) => {
          console.error('Authentication failed:', error);
        }
      );
  }

  confirmOtp(): void {
    this.authService.confirmOtp(this.otpData)
      .subscribe(
        (jwtToken) => {
          console.log('OTP confirmation successful:', jwtToken);
          localStorage.setItem('token', jwtToken.token.toString())
          alert('Успешная авторизация')
          this.isTwoFactor=false
          this.isEnableToRefresh=false
          this.otpData.otp_code=0;
        },
        (error) => {
          console.error('OTP confirmation failed:', error);

        }
      );
  }

  refreshOtp(): void {
    this.authService.refreshOtp()
      .subscribe(
        (jwtToken) => {
          console.log('OTP refresh successful:', jwtToken);
          alert('Код подтверждения был отправлен на почту')
          this.startTwoMinutesCountdown()
        },
        (error) => {
          console.error('OTP refresh failed:', error);
        }
      );
  }

  startTwoMinutesCountdown() {
    this.isEnableToRefresh = false;
    setTimeout(() => {
      this.setIsEnableToRefresh();
    }, 2 * 60 * 1000); // 2 минуты в миллисекундах
  }

}
