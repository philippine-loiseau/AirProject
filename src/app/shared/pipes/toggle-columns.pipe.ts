import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'toggleColumns', standalone: true})
export class ToggleColumnsPipe implements PipeTransform {
  transform(displayedColumns: string[], columns: any): string[] {
    displayedColumns = columns.filter((c: any) => !!c.show).map((c: any) => c.columnDef);
    return displayedColumns;
  }
}
