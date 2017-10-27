import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Designation } from './designation.component';
import { DesignationTable } from './components/designationTable/designationTable.component';
import { DesignationForm } from './components/designationForm/designationForm.component';

import { routing } from './designation.routing';
import { DesignationService } from './designation.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    Designation,
    DesignationTable,
    DesignationForm
  ],
  providers: [
    DesignationService
  ]
})
export class DesignationModule { }
