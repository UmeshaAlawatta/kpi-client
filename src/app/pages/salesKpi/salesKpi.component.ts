import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../theme';
import 'style-loader!./chartistJs.scss';

@Component({
  selector: 'salesKpi',
  styleUrls: ['./salesKpi.scss'],
  templateUrl: './salesKpi.html'
})
export class SalesKpi {

  selectedTabIndex: number = 0;
  handleChange(e) {
    this.selectedTabIndex = e.index;
  }
  
  constructor(private baConfig: BaThemeConfigProvider) {
  }

}
