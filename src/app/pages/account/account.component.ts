import { Component } from '@angular/core';
import {Account, CreateAccountDto, Credit, TransferRequest} from "../../models/models";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account.service";
import {TransferComponent} from "../transfer/transfer.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  userId!: number;
  accounts: Account[] = [];

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
        console.error('Error loading credits:', error);
      }
    )
  }

  createAccount(){
    this.accountService.changeAccount(this.userId, this.accountData).subscribe(
      () => {
        console.log('Account created successfully');
        this.loadAccounts();
        alert("Счет успешно открыт")
      },
      (error) => {
        console.error('Error creating account:', error);
      }
    )
  }

  // makeTransfer(account: Account){
  //   this.router.navigate(['users', this.userId, 'account', account.id, 'transfer'])
  //   this.transferComponent.setAccount(account)
  // }

  makeTransfer(account: Account){
    this.transferData.sender_id = this.userId
    this.transferData.currency = account.currency
    this.accountService.makeTransfer(this.transferData).subscribe(
      () => {
        console.log('Transfer done successfully');
        alert("Перевод произведен")
      },
      (error) => {
        console.error('Error transferring:', error);
      }
    )
  }

  addMoney(accountId: number){
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
