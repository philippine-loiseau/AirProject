import {Drone} from "./drone";
import {Store} from "./store";
import {Customer} from "./customer";

export interface Plans {
  drones: Drone[];
  products: Array<string>;
  stores: Store[];
  customers: Customer[]
}
