import { Component } from '@angular/core';
import {CreateCreditDto, Credit, Deposit, MakePaymentRequest} from "../../models/models";
import {ActivatedRoute} from "@angular/router";
import {CreditService} from "../../service/credit.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent {
  userId!: number;
  credits: Credit[] = [];

  creditData: CreateCreditDto = {
    account_id: null,
    term: '',
    payment_type: 'MANUAL',
    amount_given: null,
    is_notification_enabled: false
  }

  payData: MakePaymentRequest = {
    sum_to_pay: null
  }

  credit?: Credit;

  constructor(private route: ActivatedRoute, private creditService: CreditService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadCredits();
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
