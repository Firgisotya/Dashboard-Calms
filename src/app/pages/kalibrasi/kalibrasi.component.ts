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

      const currentMonth = new Date().getMonth();
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      for (let i = 0; i <= currentMonth; i++) {
        this.month_filter.push(monthNames[i]);
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

  getTransStatus: any = [];
  getStatus: any = [];
  jumStatus: any = [];

  getTransCategory: any = [];
  getCategory: any = [];
  jumCategory: any = [];

  getTransType: any = [];
  getType: any = [];
  getMonth: any = [];
  jumType: any = [];
  selectedMonth: any = [];
  monthnm: any = [];
  month_filter: any = [];


  filterYear! : FormGroup;
  filterMonth! : FormGroup;

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
          case 3:
            return 'Verification  ';
          default:
            return '';    
        }
      })
      this.ChartPie();
      
    });
    this.ChartBar();
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

    this.appService.trans_by_status().subscribe((data: any) => {
      this.getTransStatus = data.data[0];
      
      this.getTransStatus.forEach((item: any) => {
        this.getStatus.push(item.status);
        this.jumStatus.push(item.total);
      })
      this.ChartStatus();
    })
    
    this.appService.trans_by_category().subscribe((data: any) => {
      this.getTransCategory = data.data[0];
      
      this.getTransCategory.forEach((item: any) => {
        this.getCategory.push(item.category);
        this.jumCategory.push(item.category_count);
      })
      this.ChartCategory();
    })

    this.appService.filter_trans_month(this.selectedMonth).subscribe((data: any) => {
      this.getTransType = data.data[0];
      
      this.getTransType.forEach((item: any) => {
        this.getType.push(item.category);
        this.jumType.push(item.total_data);
      })
    });

    this.filterMonth = new FormGroup({
      month: new FormControl('')
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

  filterByMonth() {
    console.log(this.filterMonth.value);

    this.getType = [];
    this.jumType = [];
    this.appService.filter_trans_month(this.filterMonth.value).subscribe((data: any) => {
      this.getTransType = data.data[0];

      this.getTransType.forEach((item: any) => {
        this.getType.push(item.category);
        this.jumType.push(item.total_data);
        
        
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
            'rgb(247, 230, 173)',
            'rgb(255, 99, 132)',
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
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
          name: "Total",
          data: this.jumMt
        }
      ],
      seriesType: [
        {
          name: "Total",
          data: this.jumType
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
      },
      xaxisType: {
        categories: this.getType,
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
          name: "Total",
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

  ChartStatus() {
    this.chartPie = new Chart('transStatus', {
      type: 'doughnut',
      data: {
        labels: this.getStatus,
        datasets: [{
          data: this.jumStatus,
          backgroundColor: [
            'rgb(0, 227, 150)',
            'rgb(255, 69, 96)',
            'rgb(254, 176, 25)',
            'rgb(149, 165, 166)',

          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },  
        }
      }
      }
    )
  }

  ChartCategory() {
    this.chartPie = new Chart('transCategory', {
      type: 'doughnut',
      data: {
        labels: this.getCategory,
        datasets: [{
          data: this.jumCategory,
          backgroundColor: [
            'rgb(0, 227, 150)',
            'rgb(255, 69, 96)',
            'rgb(254, 176, 25)',
            '	RGB(6, 56, 82)',
            '	RGB(152, 71, 86)',
            'RGB(196, 188, 140)',
            '	RGB(75, 44, 68)',
            '	RGB(12, 164, 132)',
            'RGB(86, 164, 172)',
            'RGB(255, 112, 67)',
            'RGB(179, 64, 64)',
            'RGB(122, 172, 88)',
            '	RGB(184, 200, 204)'


          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },  
        }
      }
      }
    )
  }

}
