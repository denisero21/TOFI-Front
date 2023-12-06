import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepositService } from '../../service/deposit.service';
import {Deposit, DepositDto} from "../../models/models";


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  userId!: number;
  deposits: Deposit[] = [];

  depositData: DepositDto = {
    account_id: 1,
    term: 'MONTH_3',
    amount: 10,
    deposit_type: 'REVOCABLE'
  }
  constructor(private route: ActivatedRoute, private depositService: DepositService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadDeposits();
      console.log(this.deposits)
    });
  }

  loadDeposits(): void {
    this.depositService.getUsersDeposits(this.userId).subscribe(
      (data: Deposit[]) => {
        this.deposits = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading deposits:', error);
      }
    );
  }

  createDeposit(): void {
    this.depositService.createDeposit(this.userId, this.depositData).subscribe(
      () => {
        console.log('Deposit created successfully');
        this.loadDeposits();
        alert("Депозит успешно открыт")
      },
      (error) => {
        console.error('Error creating deposit:', error);
      }
    );
  }


  closeDeposit(depositId: number): void {
    this.depositService.closeDeposit(depositId).subscribe(
      () => {
        console.log('Deposit closed successfully');
        this.loadDeposits();
        alert("Депозит успешно закрыт")
      },
      (error) => {
        console.error('Error closing deposit:', error);
      }
    );
  }
}
