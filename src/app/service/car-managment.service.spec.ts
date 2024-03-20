import { TestBed } from '@angular/core/testing';

import { CarManagmentService } from './car-managment.service';

describe('CarManagmentService', () => {
  let service: CarManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
