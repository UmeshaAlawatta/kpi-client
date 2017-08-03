import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { ScrapCostPerKg } from './scrapCostPerKg.component';
import { ScrapCostPerKgService } from '../../services/scrapCostPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { ScrapCostPerKgTable } from './components/scrapCostPerKgTable/scrapCostPerKgTable.component';
import { ScrapCostPerKgForm } from './components/scrapCostPerKgForm/scrapCostPerKgForm.component';

import { routing } from './scrapCostPerKg.routing';


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
    ScrapCostPerKg,
    ScrapCostPerKgTable,
    ScrapCostPerKgForm
  ],
  providers: [ScrapCostPerKgService]
})
export class ScrapCostPerKgModule { }