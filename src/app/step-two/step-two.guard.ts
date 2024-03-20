import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import { CarManagmentService } from '../service/car-managment.service';

export const stepTwoGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  return inject(CarManagmentService).selectedCar.pipe(
    take(1),
    map(res => {
      if (res.stepOneIsValid())
        return true;
      return router.createUrlTree(['/step-one']);
    })
  )
};