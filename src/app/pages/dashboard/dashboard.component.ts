import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChartComponent } from "ng-apexcharts";
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private appService: AppService) {
    
  }

  countTemp = 0;
  countPress = 0;
  countMass = 0;
  countPh = 0;
  countConduct = 0;
  countDimensi = 0;
  countRefracto = 0;
  countEnclosure = 0;
  countThermo = 0;
 

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

    this.appService.count_dimensi().subscribe((data: any) => {
      this.countDimensi = data.data[0].length
    })

    this.appService.count_refracto().subscribe((data: any) => {
      this.countRefracto = data.data[0].length
    })

    this.appService.count_enclosure().subscribe((data: any) => {
      this.countEnclosure = data.data[0].length
    })

    this.appService.count_thermo().subscribe((data: any) => {
      this.countThermo = data.data[0].length
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
