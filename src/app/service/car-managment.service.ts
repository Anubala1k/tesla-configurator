import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarResponse} from "../models/carResponse";
import {CarOptions} from "../models/carOptions";
import {BehaviorSubject, Subject} from "rxjs";
import {CarSelected} from "../models/carSelected";

@Injectable({
  providedIn: 'root'
})
export class CarManagmentService {

  selectedCar: BehaviorSubject<CarSelected> = new BehaviorSubject<CarSelected>(new CarSelected());

  constructor(private httpClient: HttpClient) { }

  getModels(){
    return this.httpClient.get<CarResponse[]>('/models');
  }

  getOptions(id: string){
    return this.httpClient.get<CarOptions>(`/options/${id}`);
  }
}