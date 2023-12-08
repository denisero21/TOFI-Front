import {Component, OnInit} from '@angular/core';
import {Account, CreateCreditDto, Credit, CreditInfo, Deposit, MakePaymentRequest} from "../../models/models";
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
  isCalcSumToPay: Boolean = false
  payData: MakePaymentRequest = {
    sum_to_pay: null
  }

  credit?: CreditInfo;

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
    if (this.creditData.term == ''
    || this.creditData.amount_given == null
    || this.creditData.account_id == null){
      alert("Не все данные заполнены")
    }else{
      this.creditService.createCredit(this.userId, this.creditData).subscribe(
        () => {
          console.log('Credit created successfully');
          this.loadCredits();
          alert("Кредит успешно открыт")
          this.creditData.account_id = null
          this.creditData.amount_given = null
          this.creditData.term = ''
        },
        (error) => {
          console.error('Error creating credit:', error);
        }
      )
    }
  }

  payCredit(creditId: number): void{
    const date = new Date()
      console.log("right now: ",date)
    for(let i = 0; i < this.credits.length; i++){
      const credit = this.credits[i]
        console.log("next: ",credit.next_pay_date)
      if(credit.id == creditId){
        if (date < credit!.next_pay_date){
          alert("Рановато для оплаты кредита")
        }else if(credit.status == 'PAID'){
            alert("Кредит уже выплачен")
        }else if(this.isCalcSumToPay){
            this.creditService.payCredit(creditId, this.payData).subscribe(
                () => {
                    console.log('Credit paid successfully');
                    this.loadCredits();
                    alert("Кредит успешно оплачен")
                    this.payData.sum_to_pay = null
                    this.isCalcSumToPay = false
                },
                (error) => {
                    console.error('Error paying credit:', error);
                }
            )
        }else{
            alert("Для начала рассчитайте сумму оплаты кредита")
        }
      }
    }
  }

  calcSumToPay(creditId: number){
      this.getCreditInfo(creditId)
      this.isCalcSumToPay = true
  }

  getCreditInfo(creditId: number){
    this.creditService.getCreditInfo(creditId).subscribe(
      (data: CreditInfo) => {
        console.log("creditInfo: ", data)
        this.credit = data
        this.payData.sum_to_pay = data.sum_to_pay
      },
      (error) => {
        console.error('Error paying credit:', error);
      }
    )
  }

}
