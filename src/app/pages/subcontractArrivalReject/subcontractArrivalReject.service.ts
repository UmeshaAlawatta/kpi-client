import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubcontractArrivalRejectService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractArrivalRejects/');
  }
  getSubcontractArrivalReject(subcontractor, job, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractArrivalReject?subcontractor=' + subcontractor + '&job=' + job +'&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
  getBySubcontractor(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractor/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
