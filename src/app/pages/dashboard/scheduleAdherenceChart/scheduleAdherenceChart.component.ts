import { Component } from '@angular/core';

import { ScheduleAdherenceChartService } from './scheduleAdherenceChart.service';

import 'style-loader!./scheduleAdherenceChart.scss';

@Component({
  selector: 'schedule-adherence-chart',
  templateUrl: './scheduleAdherenceChart.html'
})
export class ScheduleAdherenceChart {

  chartData: Object;

  constructor(private _scheduleAdherenceChartService: ScheduleAdherenceChartService) {
    this.chartData = this._scheduleAdherenceChartService.getData();
  }

  initChart(chart: any) {
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
