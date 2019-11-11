import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './ipenapp.routing';
import { ConceptComponent } from '../ipenapp/concept/concept.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
/* components */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConceptlogsComponent } from '../ipenapp/conceptlogs/conceptlogs.component';
import { CompaniesComponent } from './companies/companies.component';
import { LogoutComponent } from './logout/logout.component';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ConceptComponent,
    ConceptlogsComponent,
    CompaniesComponent,
    LogoutComponent,
    TestComponent,
  ]
})
export class IpenappModule { }
