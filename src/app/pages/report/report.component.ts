import { Component, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartDonut = {
  series: ApexNonAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  labels2: any;
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  public chartOptions: Partial<ChartDonut> | any;

  constructor(private appService: AppService) { }

  count_in_week = 0;
  count_ex_week = 0;
  count_reg_week = 0;
  count_rec_week = 0 ;
  count_in_month = 0;
  count_ex_month = 0;
  count_reg_month = 0;
  count_rec_month = 0 ;
  count_in_year = 0;
  count_ex_year = 0;
  count_reg_year = 0;
  count_rec_year = 0 ;

  // graf
  total_monthly: any = [];
  total_yearly: any = [];
  jenis_monthly: any = [];
  jenis_yearly: any = [];
  

  ngOnInit() {
    this.appService.count_in_or_ex_weekly().subscribe((data: any) => {
      this.count_in_week = data.data[0][0].total
      this.count_ex_week = data.data[0][1].total
    })

    this.appService.count_reg_weekly().subscribe((data: any) => {
      this.count_reg_week = data.data[0][0].total
      this.count_rec_week = data.data[0][1].total 
    })

    this.appService.count_in_or_ex_monthly().subscribe((data: any) => {
      this.count_in_month = data.data[0][0].total
      this.count_ex_month = data.data[0][1].total
    })

    this.appService.count_reg_monthly().subscribe((data: any) => {
      this.count_reg_month = data.data[0][0].total
      this.count_rec_month = data.data[0][1].total 
    })

    this.appService.count_in_or_ex_yearly().subscribe((data: any) => {
      this.count_in_year = data.data[0][0].total
      this.count_ex_year = data.data[0][1].total
    })

    this.appService.count_reg_yearly().subscribe((data: any) => {
      this.count_reg_year = data.data[0][0].total
      this.count_rec_year = data.data[0][1].total 
    })

    this.appService.graf_monthly().subscribe((data: any) => {
      
      
    })

    this.appService.graf_yearly().subscribe((data: any) => {
      data.data.forEach((element: any) => {
        this.total_yearly.push(element.total)
        this.jenis_yearly.push(element.jenis)
      })
      
      this.ChartDonut();
    })


  }

  ChartDonut(){
    this.chartOptions = {
      series: this.total_monthly,
      series2: this.total_yearly,
      chart: {
        type: "donut",
        height: 400
      },
      labels: this.jenis_monthly,
      labels2: this.jenis_yearly,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
              
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

}
