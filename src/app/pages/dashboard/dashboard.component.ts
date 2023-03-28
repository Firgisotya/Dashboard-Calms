import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChartComponent } from "ng-apexcharts";
import { FormGroup, FormControl } from '@angular/forms';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexAxisChartSeries,
  ApexGrid,
} from "ng-apexcharts";

export type ChartPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

export type ChartColumn = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: string[];
  grid: ApexGrid;
};

export type ChartBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public chartPie!: Partial<ChartPie> | any;
  public chartColumn!: Partial<ChartColumn> | any;
  public chartBar!: Partial<ChartBar> | any;

  constructor(private appService: AppService) {
    
  }

  countTemp: any = [];
  countPress: any = [];
  countMass: any = [];
  countPh: any = [];
  countConduct: any = [];
 

  dtRemainding: any = [];
  remaningDay: any;
  dtRemainExp: any = [];
  remaningDayExp: any;

  ngOnInit() {

    this.appService.count_temp().subscribe((data: any) => {
      this.countTemp = data.data[0].length
    })

    this.appService.count_press().subscribe((data: any) => {
      this.countPress = data.data[0].length
    })

    this.appService.count_mass().subscribe((data: any) => {
      this.countMass = data.data[0].length
    })

    this.appService.count_ph().subscribe((data: any) => {
      this.countPh = data.data[0].length
    })

    this.appService.count_conduct().subscribe((data: any) => {
      this.countConduct = data.data[0].length
    })




    this.appService.remainding().subscribe((data: any) => {
      this.dtRemainding = data.data[0];
      this.calculateRemainingDays();
    })

    this.appService.remaindingExp().subscribe((data: any) => {
      this.dtRemainExp = data.data[0];
      this.calculateRemainingDaysExp();
    })

    
  }

  calculateRemainingDaysExp() {
    const expirationDate = new Date(this.dtRemainExp.exp_calibration);
    const today = new Date();
    const diffTime = Math.abs(this.dtRemainExp.exp_calibration.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.remaningDayExp = diffDays;
    console.log(this.remaningDayExp);
  }
 
  calculateRemainingDays() {
    const expirationDate = new Date(this.dtRemainding.exp_calibration);
    const today = new Date();
    const diffTime = Math.abs(this.dtRemainding.exp_calibration.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.remaningDay = diffDays;
    console.log(this.remaningDay);
    
  }

  

  

}
