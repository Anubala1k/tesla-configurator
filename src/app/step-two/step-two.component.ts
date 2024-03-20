import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarSelected } from '../models/carSelected';
import { take } from 'rxjs';
import { CarOptions } from '../models/carOptions';
import { CarManagmentService } from '../service/car-managment.service';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})

export class StepTwoComponent implements OnInit {

  stepTwoForm!: FormGroup;
  selectedCar!: CarSelected;
  optionsCar!: CarOptions;

  constructor(private carManagmentService: CarManagmentService) {}

  ngOnInit(): void {

    this.carManagmentService.selectedCar.pipe(take(1)).subscribe(res => {
      this.selectedCar = res;
      this.carManagmentService.getOptions(res.code).subscribe(options => {
        this.optionsCar = options;
        this.buildForm(res);
      })
    });
  }

  onChange() {
    let selected = new CarSelected();
    selected.code = this.selectedCar.code;
    selected.color = this.selectedCar.color;
    selected.config = this.stepTwoForm.get('configSelect')?.valid ? this.stepTwoForm.get('configSelect')?.value : '';
    selected.tow = this.optionsCar.towHitch ? this.stepTwoForm.get('includeTow')?.value : false;
    selected.yoke = this.optionsCar.yoke ? this.stepTwoForm.get('includeYoke')?.value : false;
    this.carManagmentService.selectedCar.next(selected);
  }

  private buildForm(data: CarSelected) {
    this.stepTwoForm = new FormGroup({
      configSelect: new FormControl('', [Validators.required])
    });

    this.stepTwoForm.patchValue({
      configSelect: data.config ? data.config : ''
    });

    if (this.optionsCar.towHitch) {
      this.stepTwoForm.addControl('includeTow', new FormControl('', Validators.required));
      this.stepTwoForm.patchValue({
        includeTow: data.tow
      });
    }

    if (this.optionsCar.yoke) {
      this.stepTwoForm.addControl('includeYoke', new FormControl('', Validators.required));
      this.stepTwoForm.patchValue({
        includeYoke: data.yoke
      });
    }
  }
}
