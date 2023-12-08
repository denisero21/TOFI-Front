import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepositService } from '../../service/deposit.service';
import {Account, Deposit, DepositDto} from "../../models/models";
import {AccountService} from "../../service/account.service";


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
    userId!: number;
    deposits: Deposit[] = [];
    accounts: Account[] = []
    isCreateDeposit: Boolean = false

    depositData: DepositDto = {
        account_id: null,
        term: 'MONTH_3',
        amount: null,
        deposit_type: 'REVOCABLE'
    }
  constructor(private route: ActivatedRoute,
              private depositService: DepositService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadDeposits();
      this.loadAccounts()
      console.log("dep: ", this.deposits)
      console.log("acc: ", this.accounts)
    });
  }

  loadDeposits(): void {
    this.depositService.getUsersDeposits(this.userId).subscribe(
      (data: Deposit[]) => {
        this.deposits = data;
        console.log("dep: ", this.deposits)
      },
      (error) => {
        console.error('Error loading deposits:', error);
      }
    );
    this.loadAccounts()
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

  createDeposit(userId: number): void {
    if (this.depositData.account_id == null
      || this.depositData.deposit_type == ''
      || this.depositData.amount == null
      || this.depositData.term == '') {
      alert("Не все данные заполнены")
    } else {
      this.depositService.createDeposit(userId, this.depositData).subscribe(
        () => {
          console.log('Deposit created successfully');
          this.loadDeposits();
          alert("Депозит успешно открыт")
          this.isCreateDeposit = false
          this.depositData.account_id = null
          this.depositData.amount = null
        },
        (error) => {
          console.error('Error creating deposit:', error);
        }
      );
    }
  }

  openCreateDeposit(){
        this.isCreateDeposit = !this.isCreateDeposit
  }

  closeDeposit(depositId: number): void {
      this.loadDeposits();
    this.depositService.closeDeposit(depositId).subscribe(
      () => {
        console.log('Deposit closed successfully');
        this.loadDeposits();
        for(let i = 0; i < this.deposits.length; i++){
            const dep = this.deposits[i]
            if(dep.id == depositId){
                alert(`Депозит успешно закрыт`)
            }
        }
      },
      (error) => {
        console.error('Error closing deposit:', error);
      }
    );
  }
}
