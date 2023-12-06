import {Component, Pipe, PipeTransform} from '@angular/core';
import {CryptoService} from "../../service/crypto.service";
import {ActivatedRoute} from "@angular/router";
import {CryptoRates, Deposit, Rate} from "../../models/models";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent {
    cryptoRatesList: CryptoRates[] = []

    constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getRates();
        });
    }

    getRates(): void {
        this.cryptoService.getCryptoCurrencyRates().subscribe(
            (data: CryptoRates[]) => {
                this.cryptoRatesList = data;
                console.log(this.cryptoRatesList)
            },
            (error) => {
                console.error('Error loading rates:', error);
            });
    }
}
