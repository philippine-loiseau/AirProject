import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AirProjectApiService } from './air-project-api.service';
import { Drone } from '../../shared/interfaces/drone';
import { Store } from '../../shared/interfaces/store';
import { Customer } from '../../shared/interfaces/customer';
import { Order } from '../../shared/interfaces/order';

describe('AirProjectApiService', () => {
  let service: AirProjectApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirProjectApiService]
    });
    service = TestBed.inject(AirProjectApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all drones', () => {
    const mockDrones: Drone[] = [{ id: '1', x: 1, y: 1, autonomy: 100 }];

    service.getAllDrones().subscribe((drones) => {
      expect(drones).toEqual(mockDrones);
    });

    const req = httpTestingController.expectOne('assets/data/drones.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockDrones);
  });

  it('should get all stores', () => {
    const mockStores: Store[] = [{ id: '1', x: 1, y: 2, stock: [] }];

    service.getAllStores().subscribe((stores) => {
      expect(stores).toEqual(mockStores);
    });

    const req = httpTestingController.expectOne('assets/data/stores.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockStores);
  });

  it('should get all customers', () => {
    const mockCustomers: Customer[] = [{ id: '1', x: 3, y: 1 }];

    service.getAllCustomers().subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpTestingController.expectOne('assets/data/customers.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should get all orders', () => {
    const mockOrders: Order[] = [{ id: '1', customerId: '1', basket: '1x Hammer' }];

    service.getAllOrders().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpTestingController.expectOne('assets/data/orders.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });
});
