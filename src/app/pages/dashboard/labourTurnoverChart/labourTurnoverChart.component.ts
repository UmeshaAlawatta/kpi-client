import { Component } from '@angular/core';

import { LabourTurnoverChartService } from './labourTurnoverChart.service';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./labourTurnoverChart.scss';

@Component({
  selector: 'labour-turnover-chart',
  templateUrl: './labourTurnoverChart.html'
})
export class LabourTurnoverChart {

  amChart: any;

  constructor(private _labourTurnoverChartService: LabourTurnoverChartService, private chartService: ChartService) {
    
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var startDateText = startDate.getFullYear()+"-"+((startDate.getMonth()+1)<10?"0"+startDate.getMonth()+1:startDate.getMonth()+1)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyLabourTurnover(startDateText, endDateText).then((data) => {
      var chartData = this._labourTurnoverChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("labourturnoverchartdiv",chartData);
    });
  }

  initChart(chart: any) {
    let zoomChart = () => {
      //chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}