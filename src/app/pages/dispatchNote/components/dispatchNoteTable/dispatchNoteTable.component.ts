
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { DispatchNoteService } from "../../dispatchNote.service";
import { PrintService } from '../../../../services/print.service';

@Component({
  selector: 'dispatch-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchNoteTable.scss'],
  templateUrl: './dispatchNoteTable.html',
})
export class DispatchNoteTable {

  dispatchNote = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  dispatchNoteId: number = 0;

  constructor(protected service: DispatchNoteService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private printService: PrintService,
    private sharedService: SharedService) {
    this.loadData();
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  selected(data: any) {
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/dispatchNote/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/dispatchNote/form/' + id]);
  }

  print(id: number) {
    this.dispatchNoteId = id;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          //this.msgs.push();
          this.loadData()
        }
        );
      }
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
}