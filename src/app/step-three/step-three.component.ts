import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarSelected } from '../models/carSelected';
import { CarResponse } from '../models/carResponse';
import { CarOptions } from '../models/carOptions';
import { CarManagmentService } from '../service/car-managment.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})

export class StepThreeComponent implements OnInit, OnDestroy {

  selectedCar!: CarSelected;
  carResponse!: CarResponse;
  carOptions!: CarOptions;

  constructor(private carManagmentService: CarManagmentService) {
  }

  ngOnInit(): void {
    this.carManagmentService.selectedCar.pipe(take(1)).subscribe(res => {
      this.selectedCar = res;
      this.carManagmentService.getOptions(res.code).subscribe(options => {
        this.carOptions = options;
      });
      this.carManagmentService.getModels().subscribe(
        models => {
          this.carResponse = models.findIndex(x => x.code == this.selectedCar.code) >= 0 ? models[models.findIndex(x => x.code == this.selectedCar.code)] : new CarResponse();
        }
      )
    });
  }

  ngOnDestroy(): void {
  }

  getColor() {
    return this.carResponse.colors[this.carResponse.colors.findIndex(x => x.code == this.selectedCar.color)]
  }

  getTotal() {
    let total = this.carOptions.configs[+this.selectedCar.config].price +
      this.getColor().price;
    if (this.selectedCar.tow)
      total += 1000;
    if (this.selectedCar.yoke)
      total += 1000;
    return total;
  }

}