import {
  Component, EventEmitter,
  Input,
  NO_ERRORS_SCHEMA, OnInit, Output,
  ViewChild
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule, UpperCasePipe} from "@angular/common";
import {HighlightPipe} from "../../pipes/highlight.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ToggleColumnsPipe} from "../../pipes/toggle-columns.pipe";
import {CdkTableModule} from "@angular/cdk/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

interface Column {
  columnDef: string;
  header: string;
}

@Component({
  selector: 'datatable',
  standalone: true,
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  imports: [CommonModule, MatTableModule, MatSelectModule, HighlightPipe, MatTooltipModule, ToggleColumnsPipe, UpperCasePipe, CdkTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
  providers: [UpperCasePipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DatatableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @Input() columns!: Array<Column>;
  @Input() data: Array<any> = [];
  @Input() name!: string;
  @Input() actions: Array<string> = [];
  @Output() action: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns:string[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

  emitAction(action: string): void {
    this.action.emit(action)
  }

}
