import {Stock} from "./stock";

export interface Store {
  id: string;
  x: number;
  y: number;
  stock: Stock[];
}
