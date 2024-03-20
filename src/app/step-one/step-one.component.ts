import { NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarSelected } from '../models/carSelected';
import { CarResponse } from '../models/carResponse';
import { take } from 'rxjs';
import { CarManagmentService } from '../service/car-managment.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit, OnDestroy {

  stepOneForm!: FormGroup;
  models!: CarResponse[];
  selectedCar!: CarSelected;

  constructor(private carManagmentService: CarManagmentService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.carManagmentService.getModels().subscribe(res => {
      this.models = res;
      this.carManagmentService.selectedCar.pipe(take(1)).subscribe(res => {
        this.selectedCar = res;
        this.stepOneForm.patchValue({
          carSelect: res.code ? this.models.findIndex(x => x.code == res.code) : '',
          colorSelect: res.color
        });
      })
    });
  }

  ngOnDestroy(): void {

  }

  onChange() {
    this.selectedCar.code = this.stepOneForm.get('carSelect')?.valid ? this.models[this.stepOneForm.get('carSelect')?.value].code : '';
    this.selectedCar.color = this.stepOneForm.get('colorSelect')?.valid ? this.stepOneForm.get('colorSelect')?.value : '';
    this.carManagmentService.selectedCar.next(this.selectedCar);
  }

  onSelectModel() {
    if (this.stepOneForm.get('carSelect')?.valid){
      this.selectedCar = new CarSelected();
      this.stepOneForm.get('colorSelect')?.setValue(this.models[this.stepOneForm.get('carSelect')?.value].colors[0].code);
    }
  }

  private buildForm() {
    this.stepOneForm = new FormGroup({
      carSelect: new FormControl('', [Validators.required]),
      colorSelect: new FormControl('', [Validators.required]),
    });
  }

}
