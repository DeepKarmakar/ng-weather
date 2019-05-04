import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../service/api.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnInit {

  foreCastFiveDay: any = {};
  weatherDate = [];
  weatherTemp = [];
  chartData: any = [];

  constructor(private apiService: ApiService) { }

  public options: any = {
    chart: {
      height: 280,
      type: 'line',
      marginTop: 100,
      spacing: [0, 0, 0, 0],
      backgroundColor: 'transparent',
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [],
      lineWidth: 0,
      labels: {
        style: {
          fontSize: '16px',
          color: '#fff'
        }
      }
      // plotBands: [{ // visualize the weekend
      //   from: 4.5,
      //   to: 6.5,
      //   color: 'rgba(68, 170, 213, .2)'
      // }]
    },
    yAxis: {
      visible: false
    },
    tooltip: {
      shared: true,
      valueSuffix: ' units'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        labels: {
          formatter: function () {
            return this.value + ' deg';
          }
        },
        enableMouseTracking: false
      },
      series: {
        marker: {
          enabled: false
        },
        color: '#fff'
      }
    },
    series: [{
      showInLegend: false,
      name: 'John',
      data: [],
      dataLabels: [{
        format: '{y}°'
      }],
    }]
  };

  ngOnInit() {

    this.apiService.currentforeCast.subscribe(res => {
      setTimeout(() => {
        this.foreCastFiveDay = res;
        this.chartData = this.foreCastFiveDay[0]['data'];

        function pad(d) {
          return (d < 10) ? '0' + d.toString() : d.toString();
        }
        const CurrentDate = new Date();
        const getYear = CurrentDate.getFullYear();
        const getMonth = pad(CurrentDate.getMonth() + 1);
        const getDate = pad(CurrentDate.getDate());

        const getCurrentForecasrtTime = `${getYear}-${getMonth}-${getDate}`;

        if (this.chartData) {
          this.chartData.filter(item => {
            const dataTime = item.dt_txt;
            let getCurrentHr = dataTime.split(' ')[1].split(':')[0];
            if (getCurrentHr - 12 < 0) {
              getCurrentHr = getCurrentHr.replace(/^0+/, '') + 'am';
            } else if (getCurrentHr - 12 === 0) {
              getCurrentHr = getCurrentHr + 'pm';
            } else {
              getCurrentHr = (getCurrentHr - 12) + 'pm';
            }
            if (dataTime.split(' ')[0] === getCurrentForecasrtTime) {
              this.weatherDate.push(getCurrentHr);
              this.weatherTemp.push(parseInt(item.main.temp));
            }
          });

          this.options.xAxis.categories = this.weatherDate;
          this.options.series[0].data = this.weatherTemp;

          this.weatherDate = [];
          this.weatherTemp = [];

          Highcharts.chart('container', this.options);

        }
      }, 100);
    });

  }

}
