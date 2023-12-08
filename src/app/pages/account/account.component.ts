import {Component, OnInit} from '@angular/core';
import {Account, CreateAccountDto, Credit, TransferRequest} from "../../models/models";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account.service";
import {TransferComponent} from "../transfer/transfer.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  userId!: number;
  accounts: Account[] = [];
  isMakeTransfer: Boolean = false
  isOpenAccount: Boolean = false

  accountData: CreateAccountDto = {
    name: '',
    currency: ''
  }

  transferData: TransferRequest = {
    sender_id: null,
    receiver_id: null,
    sum: null,
    currency: ''
  }
  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadAccounts();
      console.log(this.accounts)
    });
  }

  loadAccounts(){
    this.accountService.getUsersAccounts(this.userId).subscribe(
      (data: Account[]) => {
        this.accounts = data;
        console.log(this.accounts)
      },
      (error) => {
        console.error('Error loading accounts:', error);
      }
    )
  }

  openAccount(){
    this.isOpenAccount= !this.isOpenAccount
    this.isMakeTransfer= false
  }

  createAccount(){
    if(this.accountData.name == ''
    || this.accountData.currency == ''){
      alert("Не все данные заполнены")
    }else{
      this.accountService.createAccount(this.userId, this.accountData).subscribe(
        () => {
          console.log('Account created successfully');
          this.loadAccounts();
          alert("Счет успешно открыт")
          this.isOpenAccount = false
          this.accountData.currency = ''
          this.accountData.name = ''
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      )
    }
  }

  openMakeTransfer(){
    this.isMakeTransfer = !this.isMakeTransfer
    this.isOpenAccount= false
  }

  makeTransfer(accountId: number){
    if(this.transferData.sum == null
    || this.transferData.sender_id == null
    || this.transferData.receiver_id == null
    || this.transferData.currency == ''){
      alert("Не все данные заполнены")
    }else{
      this.loadAccounts()
      for(let i = 0; i < this.accounts.length; i++){
        const acc = this.accounts[i]
        if(acc.id == accountId){
          if(!acc.is_blocked){
            this.accountService.makeTransfer(this.transferData).subscribe(
              () => {
                console.log('Transfer done successfully');
                alert("Перевод успешно произведен")
                this.isMakeTransfer = false
                this.transferData.currency = ''
                this.transferData.sender_id = null
                this.transferData.receiver_id = null
                this.transferData.sum = null
              },
              (error) => {
                console.error('Error transferring:', error);
              }
            )
          }else{
            alert("Перевод невозможен, Ващ аккаунт заблокирован")
          }
        }
      }
    }
  }

  addMoney(accountId: number){
    this.accountService.addMoney(accountId).subscribe()
    this.accountService.addMoney(accountId).subscribe(
      () => {
        console.log('Money added successfully');
        this.loadAccounts();
        alert("Деньги успешно зачислены на счет")
      },
      (error) => {
        console.error('Error adding money:', error);
      }
    )
  }

  deleteMoney(accountId:number){
    this.accountService.deleteMoney(accountId).subscribe(
      () => {
        console.log('Money cashed out successfully');
        this.loadAccounts();
        alert("Деньги успешно сняты со счета")
      },
      (error) => {
        console.error('Error cashing out money:', error);
      }
    )
  }

}
