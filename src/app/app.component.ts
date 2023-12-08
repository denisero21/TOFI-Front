import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthComponent} from "./pages/auth/auth.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tofi';

  userAuth: any = {
    user_id: null,
    password: '',
    full_name: '',
    email: '',
    phone_number: '',
    is_enabled: true,
    two_factor_auth: false
  };

  isRoutingAvailable: Boolean = true
  constructor(private router: Router) {
  }

  ngOnInit(): void{
    const token = sessionStorage.getItem('token')
    if(token){
      const decodedToken: any = jwtDecode(token);
      this.userAuth.full_name = decodedToken.full_name
      this.userAuth.two_factor_auth = decodedToken.two_factor
      this.userAuth.email = decodedToken.email
    }
  }

  setUser(obj: Object){
    this.userAuth = obj
  }

  ToHome(){
    this.router.navigate([''])
  }

  ToAccounts(){
    this.checkUser()
    if (this.isRoutingAvailable){
      this.router.navigate(['users', this.userAuth.user_id, 'account'])
    }
  }

  ToDeposits(){
    this.checkUser()
    if (this.isRoutingAvailable){
      this.router.navigate(['users', this.userAuth.user_id, 'deposit'])
    }
  }

  ToCredits(){
    this.checkUser()
    if (this.isRoutingAvailable){
      this.router.navigate(['users', this.userAuth.user_id, 'credit'])
    }
  }

  ToAuth(){
    this.router.navigate(['auth'])
  }

  ToCrypto(){
    this.router.navigate(['crypto'])
  }

  checkUser(){
    if (this.userAuth.user_id === null){
      alert("Для начала требуется авторизация")
      this.isRoutingAvailable = false
      this.router.navigate(['auth'])
    }
    else{
      this.isRoutingAvailable = true
    }
  }

  logOut(){
    sessionStorage.removeItem('token')
    this.userAuth.user_id = null
    this.router.navigate([''])
  }

}
