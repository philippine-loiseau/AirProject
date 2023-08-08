import {Table} from "./table";

export interface Tile {
  cols: number;
  rows: number;
  name: string;
  table?: Table
}
