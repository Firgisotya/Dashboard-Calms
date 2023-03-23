import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChartComponent } from "ng-apexcharts";

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public chartPie!: Partial<ChartPie> | any;
  public chartColumn!: Partial<ChartColumn> | any;

  constructor(private appService: AppService) {}

  getInex: any = [];
  jumInex: any = [];
  jenis: any = [];
  newjenis: any = [];

  getTh: any = [];
  jumTh: any = [];
  tahun: any = [];

  ngOnInit() {
    this.appService.getInex().subscribe((data: any) => {
      this.getInex = data.data;
      this.getInex.forEach((item: any) => {
        this.jumInex.push(item.in_or_ex);
        this.jenis.push(item.jenis);
      })

      this.newjenis = this.jenis.map((item: any) => {
        switch(item){
          case 1:
            return 'Internal';
          case 2:
            return 'External';
          default:
            return 'Kosong';    
        }
      })
      this.ChartPie();
      
    });

    this.appService.getTh().subscribe((data: any) => {
      this.getTh = data.data[0];
      this.getTh.forEach((item: any) => {
        this.jumTh.push(item.total_data);
        this.tahun.push(item.tahun);
      })
      console.log(this.tahun);
      
      this.ChartColumn();
    })
    
    
   
    
  }

  ChartPie() {
    this.chartPie = {
      series: this.jumInex,
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        position: "right",
      },
      labels: this.newjenis,
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

  ChartColumn() {
    this.chartColumn = {
      series: [
        {
          name: "distibuted",
          data: this.jumTh
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
         
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.tahun,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }

}
