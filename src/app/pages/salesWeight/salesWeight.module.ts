import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { SalesWeight } from './salesWeight.component';
import { SalesWeightService } from '../../services/salesWeight.service';
import { LabourSourceService } from '../../services/labourSource.service';
import { LossTypeService } from '../../services/lossType.service';
import { SalesWeightTable } from './components/salesWeightTable/salesWeightTable.component';
import { SalesWeightForm } from './components/salesWeightForm/salesWeightForm.component';

import { routing } from './salesWeight.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule,
    SharedModule,
    PanelModule,
    routing
  ],
  declarations: [
    SalesWeight,
    SalesWeightTable,
    SalesWeightForm
  ],
  providers: [SalesWeightService, LabourSourceService]
})
export class SalesWeightModule { }
