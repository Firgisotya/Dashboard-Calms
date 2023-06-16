import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private appService: AppService) {}


  dtRemainding: any = [];
  remaningDay: any;

  currentDateTime: any;

  ngOnInit() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
    

    this.appService.remaindingExp().subscribe((data: any) => {
      this.dtRemainding = data.data[0];
      this.calculateRemainingDays();
    })
    
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
