import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { ScrapCostPerKg } from './scrapCostPerKg.component';
import { ScrapCostPerKgTable } from './components/scrapCostPerKgTable/scrapCostPerKgTable.component';
import { ScrapCostPerKgForm } from './components/scrapCostPerKgForm/scrapCostPerKgForm.component';

import { routing } from './scrapCostPerKg.routing';
import { ScrapCostPerKgService } from './scrapCostPerKg.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
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
