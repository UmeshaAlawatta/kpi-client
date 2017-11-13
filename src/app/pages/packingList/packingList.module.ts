import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule, DialogModule } from 'primeng/primeng';
import { PackingList } from './packingList.component';
import { PackingListTable } from './components/packingListTable/packingListTable.component';
import { PackingListForm } from './components/packingListForm/packingListForm.component';

import { routing } from './packingList.routing';
import { PackingListService } from './packingList.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { MaterialModule } from '@angular/material';
import { DispatchService } from '../../services/dispatch.service';
import { PortService } from '../port/port.service';
import { ContainerSizeService } from '../containerSize/containerSize.service';
import { CountryService } from '../country/country.service';
import { InvoiceService } from '../invoice/invoice.service';

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
    MaterialModule,
    DialogModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    PackingList,
    PackingListTable,
    PackingListForm
  ],
  providers: [
    PackingListService,
    DispatchNoteService,
    PortService,
    ContainerSizeService,
    CountryService,
    InvoiceService,
    DispatchService


  ]
})
export class PackingListModule { }