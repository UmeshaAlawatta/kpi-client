import { Component, ViewEncapsulation } from '@angular/core';
import * as Papa from 'papaparse/papaparse.min.js';
import { Subject } from "rxjs/Subject";
import { EmployeeService } from "../../employee.service";
import { Router } from "@angular/router";
import { SharedService } from "../../../../services/shared.service";

@Component({
  selector: '',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./employeeImport.scss'],
  templateUrl: './employeeImport.html',
})

export class EmployeeImport {


  dataSubject: Subject<any> = new Subject<any>();

  jsonData: any[] = [];
  cols: any[];

  constructor(protected service: EmployeeService,
    private router: Router,
    private sharedService: SharedService) {

  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'code', header: 'Employee ID' },
      { field: 'callingName', header: 'Calling Name' }
    ];
    this.dataSubject.subscribe(data => {
      this.jsonData = data;
    });
  }

  uploadHandler(event) {
    this.service.saveMany(this.jsonData).subscribe(
      (data) => {
        this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
        this.router.navigate(['/pages/employee/table/']);
      }
    );
  }

  onSelect(event) {
    let file = event.files[0];
    let ds = this.dataSubject;
    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        ds.next(results.data);
      }
    });
  }

}
