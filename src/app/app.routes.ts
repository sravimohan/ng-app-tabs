import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'address/:context', component: AddressFormComponent },
    { path: 'table/:context', component: TableComponent },
    { path: 'dashboard/:context', component: DashboardComponent },
  ];