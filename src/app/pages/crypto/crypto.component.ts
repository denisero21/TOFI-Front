import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {CryptoService} from "../../service/crypto.service";
import {ActivatedRoute} from "@angular/router";
import {Crypto_} from "./crypto";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit, OnDestroy{
    rates!: Crypto_;
    private timerSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private cryptoService: CryptoService) {
        const timerInterval = 30 * 1000; // 30 секунд
        this.timerSubscription = interval(timerInterval).subscribe(() => {
            this.getRates()
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getRates();
        });
    }

  getRates(): void {
    this.cryptoService.getCryptoCurrencyRates().subscribe(
      (data: Crypto_) => {
        this.rates = data;
        console.log(this.rates)
      },
      (error) => {
        console.error('Error loading rates:', error);
      });
  }

  ngOnDestroy() {
      if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
      }
  }

}
