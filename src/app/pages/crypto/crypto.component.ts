import {Component, Pipe, PipeTransform} from '@angular/core';
import {CryptoService} from "../../service/crypto.service";
import {ActivatedRoute} from "@angular/router";
import {CryptoRates, Deposit, Rate} from "../../models/models";
import {Crypto_} from "./crypto";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent {
    rates!: Crypto_;

    constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {
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

}
