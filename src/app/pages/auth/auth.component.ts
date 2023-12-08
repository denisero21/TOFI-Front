import { Component } from '@angular/core';
import { AuthService} from "../../service/auth.service";
import {Login, ConfirmOtpRequest, UserDto} from "../../models/models";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isTwoFactor: boolean = false
  isEnableToRefresh: boolean = false
  isRegister: Boolean = false

  userAuth: any = {
    user_id: null,
    password: '',
    full_name: '',
    email: '',
    phone_number: '',
    is_enabled: true,
    two_factor_auth: false
  };

  loginData: Login = {
    login: 'deniserochenko@gmail.com',
    password: 'password'
  };

  repeatPassword: String = ''
  userData: UserDto = {
    password: '',
    full_name: '',
    email: '',
    phone_number: '',
    is_enabled: true,
    two_factor_auth: false
  }

  otpData: ConfirmOtpRequest = {
    otp_code: null
  };

  setIsEnableToRefresh(){
    this.isEnableToRefresh = true
  }

  constructor(private router: Router,private authService: AuthService, private appComponent: AppComponent) {}

  authenticate(): void {
    if(this.loginData.login == ''
    || this.loginData.password == ''){
      alert("Не все данные заполнены")
    }else{
      this.authService.authenticate(this.loginData)
        .subscribe(
          (jwtToken) => {
            sessionStorage.setItem('token', jwtToken.token.toString())
            if (jwtToken.otpExpiration != null){
              sessionStorage.setItem('otp_exp', jwtToken.otpExpiration.toString())
            }
            console.log('Authentication successful:', jwtToken);
            const decodedToken: any = jwtDecode(jwtToken.token.toString());
            console.log('Decoded Token:', decodedToken);
            this.userAuth.full_name = decodedToken.full_name
            this.userAuth.two_factor_auth = decodedToken.two_factor
            this.userAuth.email = decodedToken.email
            this.userAuth.user_id = decodedToken.user_id
            this.appComponent.setUser(this.userAuth)
            if (decodedToken.two_factor){
              alert('Код подтверждения был отправлен на почту')
              this.isTwoFactor=true
              this.startTwoMinutesCountdown()
            }else{
              alert('Успешная авторизация')
              this.loginData.login = ''
              this.loginData.password = ''
              this.router.navigate([''])
            }
          },
          (error) => {
            console.error('Authentication failed:', error);
          }
        );
    }
  }

  getAuthUser(){
    return this.userAuth
  }

  confirmOtp(): void {
    if(this.otpData.otp_code == null){
      alert("Введите код подтверждения")
    }else{
      this.authService.confirmOtp(this.otpData)
        .subscribe(
          (jwtToken) => {
            console.log('OTP confirmation successful:', jwtToken);
            sessionStorage.setItem('token', jwtToken.token.toString())
            alert('Успешная авторизация')
            this.isTwoFactor=false
            this.isEnableToRefresh=false
            this.otpData.otp_code=null;
            this.router.navigate([''])
          },
          (error) => {
            console.error('OTP confirmation failed:', error);

          }
        );
    }
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

  register(){
    this.isRegister = true
  }

  login(){
    this.isRegister = false
  }

  createUser(): void{
    if (this.userData.email == ''
      || this.userData.full_name == ''
      || this.userData.password == ''
      || this.userData.phone_number == '') {
      alert("Не все данные заполнены")
    }else{
      this.authService.createUser(this.userData)
        .subscribe(
          () => {
            if (this.userData.password === this.repeatPassword){
              console.log('User created successfully');
              alert("Пользователь успешно зарегистрирован")
              this.isRegister=false
              this.userData.email = ''
              this.userData.full_name = ''
              this.userData.password = ''
              this.userData.phone_number = ''
            }else{
              alert("Пароли не совпадают")
            }
          },
          (error) => {
            console.error('User creation failed:', error);
          }
        );
    }
  }

}
