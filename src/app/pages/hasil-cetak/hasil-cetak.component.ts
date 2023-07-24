import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';


@Component({
  selector: 'app-hasil-cetak',
  templateUrl: './hasil-cetak.component.html',
  styleUrls: ['./hasil-cetak.component.css']
})
export class HasilCetakComponent {
  
    constructor(private appService: AppService, private route: Router) { }


    data:any;
    link = ""

    params = this.route.url.split('/')[2];
  
    ngOnInit(): void {
      this.appService.cetak(this.params).subscribe((data: any) => {
        this.data = data.data[0][0];
        console.log(this.data);
        this.link = `http://192.168.9.47/calms/TransKalibrasiView/${this.data.id}?showdetail=`;
      });

      
    }
}
