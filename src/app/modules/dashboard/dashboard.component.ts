import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AirProjectApiService} from "../../core/services/air-project-api.service";
import {forkJoin, Observable, throwError} from "rxjs";
import {Drone} from "../../shared/interfaces/drone";
import {Customer} from "../../shared/interfaces/customer";
import {Store} from "../../shared/interfaces/store";
import {Order} from "../../shared/interfaces/order";
import {Stock} from "../../shared/interfaces/stock";
import {map, catchError, tap} from "rxjs/operators";
import {Basket} from "../../shared/interfaces/basket";
import {AddPlanComponent} from "./components/dialogs/add-plan/add-plan.component";
import {MatDialog} from "@angular/material/dialog";
import {Plans} from "../../shared/interfaces/plans";
import {Tile} from "../../shared/interfaces/datatable/tile";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  component!: ViewContainerRef;
  tiles: Tile[] = [
    {name: 'Plans', cols: 2, rows: 4},
    {name: 'Orders', cols: 2, rows: 2},
    {name: 'Stocks', cols: 1, rows: 2},
    {name: 'Drones', cols: 1, rows: 2},
  ];

  private _tableConfigs: { [key: string]: any } = {}
  protected updateTable: boolean = false
  private _orders: Order[] = [];
  private _drones: Drone[] = [];
  private _customers: Customer[] = [];
  private _stocks: any = [];
  private _stores: Store[] = [];
  private _products: string[] = [];
  private _plans: Plans[] = [];

  get orders(): Order[] {
    return this._orders;
  }

  set orders(value: Order[]) {
    this._orders = value;
  }

  get drones(): Drone[] {
    return this._drones;
  }

  set drones(value: Drone[]) {
    this._drones = value;
  }

  get customers(): Customer[] {
    return this._customers;
  }

  set customers(value: Customer[]) {
    this._customers = value;
  }

  get stocks(): any {
    return this._stocks;
  }

  set stocks(value: any) {
    this._stocks = value;
  }

  get stores(): Store[] {
    return this._stores;
  }

  set stores(value: Store[]) {
    this._stores = value;
  }

  get products(): string[] {
    return this._products;
  }

  set products(value: string[]) {
    this._products = value;
  }

  get plans(): Plans[] {
    return this._plans;
  }

  set plan(value: Plans[]) {
    this._plans = value;
  }

  constructor(private _airProjectApiService: AirProjectApiService, private _dialog: MatDialog) {
  }

  ngOnInit() {
    this._init().subscribe({
      next: () => {
        this.tiles.forEach(async (tile) => {
          await this.getSources(tile);
        });
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  private _init(): Observable<any> {
    return forkJoin([
      this._getAllDrones(),
      this._getAllStocks(),
      this._getAllCustomers(),
      this._getAllOrders()
    ]).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public getSources(tile: Tile): Tile {
    this._tableConfigs = {
      Plans: {
        name: tile.name,
        data: this.plans,
        columns: ['Drones', 'Stores', 'Products', 'Customers'],
        columnsDef: ['drone', 'store', 'product', 'customer'],
        actions: ['addPlan']
      },
      Orders: {
        name: tile.name,
        data: this.orders,
        columns: ['#', 'Customers', 'Products'],
        columnsDef: ['id', 'customerId', 'basket']
      },
      Drones: {
        name: tile.name,
        data: this.drones,
        columns: ['Drones', 'Autonomy', 'X', 'Y'],
        columnsDef: ['id', 'autonomy', 'x', 'y']
      },
      Stocks: {
        name: tile.name,
        data: this.stocks,
        columns: ['Products', ...this.stores.map((s: Store) => s.id)],
        columnsDef: ['product', ...this.stores.map((s: Store) => s.id)]
      }
    };

    if (tile.name in this._tableConfigs) {
      tile.table = this._tableConfigs[tile.name];
    }
    return tile;
  }

  private _getAllOrders(): Observable<any> {
    return this._airProjectApiService.getAllOrders().pipe(
      map((value) => {
        return value.map((order: any) => {
          const formattedBasket = order.basket.map(
            (item: Basket) => `${item.quantity}x ${item.productId}`
          );
          return {
            id: order.id,
            customerId: order.customerId,
            basket: formattedBasket.join(', ')
          };
        });
      }),
      tap((formattedOrders) => {
        this.orders = formattedOrders;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private _getAllDrones(): Observable<Drone[] | void> {
    return this._airProjectApiService.getAllDrones().pipe(
      tap((value) => {
        this.drones = value;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private _getAllCustomers(): Observable<Customer[] | void> {
    return this._airProjectApiService.getAllCustomers().pipe(
      tap((value) => {
        this.customers = value;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private _getAllStocks(): Observable<any> {
    return this._airProjectApiService.getAllStores().pipe(
      map((stores) => {
        this.stores = stores;
        const result = [];
        const products = Array.from(
          new Set(stores.flatMap((item) =>
            item.stock.map((stockItem) => stockItem.productId)
          ))
        );
        this.products = products;
        for (const product of products) {
          const productStock = {product} as any;
          for (const data of stores) {
            const stockItem = data.stock.find(
              (item: Stock) => item.productId === product
            );
            productStock[data.id] = stockItem ? stockItem.quantity : 0;
          }
          result.push(productStock);
        }
        return result;
      }),
      tap((result) => {
        this.stocks = result;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public manageActions(action: string) {
    if(action == 'addPlan') {
      this._openAddPlanDialog()
    }
  }

  protected _openAddPlanDialog(): void {
    const dialogRef = this._dialog.open(AddPlanComponent, {
      width: '45vw',
      data: {
        stores: this.stores,
        customers: this.customers,
        products: this.products,
        drones: this.drones
      }
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this._addPlan(result)
      }
    });
  }

  private _addPlan(result: any) {
    this.plans.push(result)
    this._updateDatable()
  }

  private _updateDatable() {
    this.updateTable = true
    this.tiles.forEach(async (tile) => {
      await this.getSources(tile);
    });
  }
}
