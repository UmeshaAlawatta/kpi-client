import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { LocationService } from '../../location.service';

@Component({
  selector: 'location-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./locationTable.scss'],
  templateUrl: './locationTable.html'
})
export class LocationTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  pageSize = 20;

  constructor(
    protected service: LocationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any) {
    this.service
      .getPage(event.first / event.rows, event.rows)
      .subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/location/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/location/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: 'info',
            summary: 'Deleted',
            detail: 'Delete success'
          });
          this.loadData();
        });
      }
    });
  }
}
