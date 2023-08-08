import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive, EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef
} from "@angular/core";
import {DatatableComponent} from "../components/datatable/datatable.component";

@Directive({
  selector: '[dynamicDatatable]',
  standalone: true,
})
export class DynamicDatatableDirective implements AfterViewInit, OnDestroy, AfterViewChecked {

  @Input() config!: any;
  @Input() update: boolean = false;
  @Output() action: EventEmitter<string> = new EventEmitter();

  private _componentRef!: ComponentRef<DatatableComponent>;

  private _tableColumns: Array<{ columnDef: string; header: string }> = [];
  constructor(private resolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef, private _changeDetectorRef: ChangeDetectorRef) {
  }
  async ngAfterViewInit() {
    await this._createComponent(this.config.table)
    this._changeDetectorRef.detectChanges();
  }

  async ngAfterViewChecked() {
    if(this.update) {
      this._tableColumns = []
      await this._createComponent(this.config.table)
    }
    this.update = false;
  }

  private async _createTableColumns(table: any): Promise<Array<{ columnDef: string; header: string }>> {
    table.columnsDef.map((cdef: string, i: any) => {
      this._tableColumns.push({
        columnDef: cdef,
        header: this.config.table.columns[i]
      })
    })
    return this._tableColumns;
  }

  private async _createComponent(table: any): Promise<void> {
    const factory = this.resolver.resolveComponentFactory(DatatableComponent);
    this.viewContainerRef.clear();
    this._componentRef = this.viewContainerRef.createComponent(factory);
    this._componentRef.instance.name = table.name;
    this._componentRef.instance.data = table.data;
    this._componentRef.instance.columns = await this._createTableColumns(table)
    this._componentRef.instance.actions = table.actions;
    this._componentRef.instance.action.subscribe(() => {
      this.action.next('addPlan')
    })
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this._componentRef.destroy();
  }
}
