
import { Component, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ManpowerService } from '../../manpower.service';

@Component({
  selector: 'manpower-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerTable.scss'],
  templateUrl: './manpowerTable.html',
})
export class ManpowerTable {
  rows = [];
  timeout: any;
  totalRecords: number;

  constructor(protected service: ManpowerService) {
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
}
