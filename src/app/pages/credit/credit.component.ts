import {Component, OnInit} from '@angular/core';
import {Account, CreateCreditDto, Credit, Deposit, MakePaymentRequest} from "../../models/models";
import {ActivatedRoute} from "@angular/router";
import {CreditService} from "../../service/credit.service";
import {Observable} from "rxjs";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit{
  userId!: number;
  credits: Credit[] = [];
  accounts: Account[] = []

  isPayCredit: Boolean = false
  isCreateCredit: Boolean = false

  creditData: CreateCreditDto = {
    account_id: null,
    term: '',
    payment_type: 'MANUAL',
    amount_given: null,
    is_notification_enabled: false
  }

  creditId?: number;
  payData: MakePaymentRequest = {
    sum_to_pay: null
  }

  credit?: Credit;

  constructor(private route: ActivatedRoute,
              private creditService: CreditService,
              private accountService: AccountService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadCredits();
      this.loadAccounts()
      console.log(this.credits)
    });
  }

  loadCredits(): void {
    this.creditService.getUsersCredits(this.userId).subscribe(
      (data: Credit[]) => {
        this.credits = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading credits:', error);
      }
    );
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

  openPay(){
    this.isPayCredit = !this.isPayCredit
    this.isCreateCredit = false
  }
  openCreate(){
    this.isPayCredit = false
    this.isCreateCredit = !this.isCreateCredit
  }

  createCredit(): void{
    this.creditService.createCredit(this.userId, this.creditData).subscribe(
      () => {
        console.log('Credit created successfully');
        this.loadCredits();
        alert("Кредит успешно открыт")
      },
      (error) => {
        console.error('Error creating credit:', error);
      }
    )
  }

  payCredit(creditId: number): void{
    this.creditService.payCredit(creditId, this.payData).subscribe(
      () => {
        console.log('Credit paid successfully');
        this.loadCredits();
        alert("Кредит успешно оплачен")
      },
      (error) => {
        console.error('Error paying credit:', error);
      }
    )
  }

  getCreditInfo(creditId: number){
    this.creditService.getCreditInfo(creditId).subscribe(
      () => {
        this.loadCredits();
        for (let i = 0; i < this.credits.length; i++){
          const credit = this.credits[i]
          if(credit.id === creditId){
            console.log('Credit: ', credit);
            this.credit = credit
          }
        }
      },
      (error) => {
        console.error('Error paying credit:', error);
      }
    )
  }

}
