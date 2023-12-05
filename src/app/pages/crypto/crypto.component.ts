import { Component } from '@angular/core';
import {CryptoService} from "../../service/crypto.service";
import {ActivatedRoute} from "@angular/router";
import {CryptoRates, Deposit} from "../../models/models";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent {
  rates: CryptoRates[] = []
  constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {
  }

  getRates(): void {
    this.cryptoService.getCryptoCurrencyRates().subscribe(
      (data: CryptoRates[]) => {
        this.rates = data;
        console.log(data)
      },
      (error) => {
        console.error('Error loading rates:', error);
      });
  }
}
