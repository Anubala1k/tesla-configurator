import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";
import { CarManagmentService } from '../service/car-managment.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './homepage-dashboard.component.html',
  styleUrl: './homepage-dashboard.component.scss'
})
export class HomepageDashboardComponent implements OnInit, OnDestroy {

  accessToStepTwo: boolean = false;
  accessToStepThree: boolean = false;

  sub!: Subscription;

  constructor(private carManagmentService: CarManagmentService) {
  }

  ngOnInit() {
    this.sub = this.carManagmentService.selectedCar.subscribe(res => {
      this.accessToStepTwo = res.stepOneIsValid();
      this.accessToStepThree = res.stepTwoIsValid();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}