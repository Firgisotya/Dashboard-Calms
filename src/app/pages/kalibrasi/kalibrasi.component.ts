import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChartComponent } from "ng-apexcharts";
import { FormGroup, FormControl } from '@angular/forms';
import {Chart, registerables} from 'chart.js/auto';

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
  selector: 'app-kalibrasi',
  templateUrl: './kalibrasi.component.html',
  styleUrls: ['./kalibrasi.component.css']
})
export class KalibrasiComponent {
  public chartColumn!: Partial<ChartColumn> | any;
  public chartBar!: Partial<ChartBar> | any;

  chartPie: any;

  constructor(private appService: AppService) {
    const currentYear = new Date().getFullYear();
      for (let i = 2020; i <= currentYear; i++) {
        this.tahun_filter.push(i);
      }
  }

  getInex: any = [];
  jumInex: any = [];
  jenis: any = [];
  newjenis: any = [];

  getTh: any = [];
  jumTh: any = [];
  tahun: any = [];

  getMt: any = [];
  jumMt: any = [];
  bulan: any = [];
  selectedYear: any = [];
  tahun_filter: any = [];
  year: any = [];

  filterYear! : FormGroup;

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
      
      this.ChartBar();
    })

    this.appService.getMonth(this.selectedYear).subscribe((data: any) => {
      this.getMt = data.data[0];
      this.getMt.forEach((item: any) => {
        this.jumMt.push(item.total_data);
        this.bulan.push(item.bulan);
      })
      this.ChartColumn();
      
    })
    this.filterYear = new FormGroup({
      year: new FormControl('')
    })

    
    
   
    
  }

  filterByYear() {
    console.log(this.filterYear.value);
    
    this.bulan = [];
    this.jumMt = [];
    this.appService.getMonth(this.filterYear.value).subscribe((data: any) => {
      this.getMt = data.data[0]
      this.getMt.forEach((item: any) => {
        this.jumMt.push(item.total_data);
        this.bulan.push(item.bulan);
      })

      this.ChartColumn();

    })


  }

  ChartPie() {
    this.chartPie = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: this.newjenis,
        datasets: [{
          data: this.jumInex,
          backgroundColor: [
            'rgb(40, 255, 191)',
            'rgb(247, 230, 173)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },  
        }
      }
      }
    )
  }

  ChartColumn() {
    this.chartColumn = {
      series: [
        {
          name: "distibuted",
          data: this.jumMt
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
        categories: this.bulan,
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

  ChartBar(){
    this.chartBar = {
      series: [
        {
          name: "basic",
          data: this.jumTh
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.tahun
      }
    };
  }

}
