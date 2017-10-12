import { Component, Input } from '@angular/core';
import { PrintService } from '../../../../services/print.service';
import { SalesOrderService } from '../../../salesOrder/salesOrder.service';
import { DispatchScheduleService } from '../../dispatchSchedule.service';

@Component({
  selector: 'print',
  templateUrl: './print.html'
})
export class Print {

  @Input() set id(id: number) {
    if (this.id !== 0) {
      this.salesOrderService.getOne(+id).subscribe(
        (salesOrder) => {
          this.salesOrder = salesOrder;
          this.dispatchScheduleService.getBySalesOrder(+id).subscribe(
            (dispatchScheduleList) => {
              this.dispatchScheduleList = dispatchScheduleList;
              setTimeout(() => {
                let element = document.getElementById('print');
                if (element != null) {
                  this.printService.printA4(element.innerHTML);
                }
              }, 100);
            }
          );
        }
      );
    }
  }

  salesOrder: any;
  dispatchScheduleList: any;
  constructor(
    private salesOrderService: SalesOrderService,
    private dispatchScheduleService: DispatchScheduleService,
    private printService: PrintService) { }

}
