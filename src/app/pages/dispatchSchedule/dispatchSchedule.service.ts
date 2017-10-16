import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchScheduleService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatchSchedules/');
  }

  getOneByDispatchScheduleNo(dispatchScheduleNo: any): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchScheduleNo/' + dispatchScheduleNo, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySalesOrder(salesOrder: any): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrder/' + salesOrder, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getComboByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'comboByCustomer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
