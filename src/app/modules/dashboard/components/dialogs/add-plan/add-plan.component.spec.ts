import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPlanComponent} from './add-plan.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('AddPlanComponent', () => {
  let component: AddPlanComponent;
  let fixture: ComponentFixture<AddPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlanComponent],
      imports: [MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
        {
          provide: MAT_DIALOG_DATA,
          useValue: []
        }], schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    });
    fixture = TestBed.createComponent(AddPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
