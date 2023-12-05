import { Component } from '@angular/core';
import {Credit, Deposit} from "../../models/models";
import {ActivatedRoute} from "@angular/router";
import {CreditService} from "../../service/credit.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent {
  userId!: number;
  deposits: Credit[] = [];

  constructor(private route: ActivatedRoute, private creditService: CreditService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +this.route.snapshot.paramMap.get('user_id')!;
      this.loadCredits();
      console.log(this.deposits)
    });
  }

  loadCredits(): void {
    this.creditService.getUsersCredits(this.userId).subscribe(
      (data: Credit[]) => {
        this.deposits = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading credits:', error);
      }
    );
  }

}
