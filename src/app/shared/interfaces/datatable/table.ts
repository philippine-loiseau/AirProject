export interface Table {
  name: string;
  columns: string[];
  columnsDef: string[];
  data: any;
  actions: Array<string>;
}
