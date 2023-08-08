import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {AddPlanComponent} from './components/dialogs/add-plan/add-plan.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {DynamicDatatableDirective} from "../../shared/directives/dynamic-datatable.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    DashboardComponent,
    AddPlanComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    DynamicDatatableDirective,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DashboardModule {
}
