import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Drone} from "../../shared/interfaces/drone";
import {Store} from "../../shared/interfaces/store";
import {Customer} from "../../shared/interfaces/customer";
import {Order} from "../../shared/interfaces/order";

@Injectable({
  providedIn: 'root'
})
export class AirProjectApiService {

  constructor(private _httpClient: HttpClient) { }

  getAllDrones(): Observable<Drone[]> {
    return this._httpClient.get<Drone[]>('assets/data/drones.json');
  }

  getAllStores(): Observable<Store[]> {
    return this._httpClient.get<Store[]>('assets/data/stores.json');
  }

  getAllCustomers(): Observable<Customer[]> {
    return this._httpClient.get<Store[]>('assets/data/customers.json');
  }

  getAllOrders(): Observable<Order[]> {
    return this._httpClient.get<Order[]>('assets/data/orders.json');
  }

}
