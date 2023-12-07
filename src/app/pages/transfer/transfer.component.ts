import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account.service";
import {AccountComponent} from "../account/account.component";
import {Account, TransferRequest} from "../../models/models";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  userId!: number;
  account?: Account;

  transferData: TransferRequest = {
    sender_id: null,
    receiver_id: null,
    sum: null,
    currency: this.account!.currency
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
    });
  }

  setAccount(account: Account){
    this.account = account
  }

  makeTransfer(){
    // this.accountService.(this.transferData).subscribe(
    //   () => {
    //     console.log('Transfer done successfully');
    //     alert("Перевод произведен")
    //     this.router.navigate(['users', this.userId, 'account'])
    //   },
    //   (error) => {
    //     console.error('Error transferring:', error);
    //   }
    // )
  }
}
