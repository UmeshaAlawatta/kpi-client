
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { MailConfigurationService } from '../../mailConfiguration.service';

@Component({
  selector: 'mail-configuration-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mailConfigurationTable.scss'],
  templateUrl: './mailConfigurationTable.html',
})

export class MailConfigurationTable {
  rows = [];
  timeout: any;
  totalRecords: number;

  constructor(protected service: MailConfigurationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
    this.loadData();
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any) {
    this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
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

  onRowDblclick(data: any): void {
    window.open('/#/pages/mailConfiguration/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/mailConfiguration/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          this.loadData();
        }
        );
      }
    });
  }
}
