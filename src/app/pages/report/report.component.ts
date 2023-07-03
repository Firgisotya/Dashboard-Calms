import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  constructor(private appService: AppService) { }

  count_in_week = 0;
  count_ex_week = 0;
  count_reg_week = 0;
  count_rec_week = 0 ;
  count_in_month = 0;
  count_ex_month = 0;
  count_reg_month = 0;
  count_rec_month = 0 ;
  

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
  }

}
