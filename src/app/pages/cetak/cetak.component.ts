import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-cetak',
  templateUrl: './cetak.component.html',
  styleUrls: ['./cetak.component.css']
})
export class CetakComponent {
  p: string|number|undefined;
  constructor(private appService: AppService) {
    
  }

  data:any[] = [];
  url = "";
  id = 0;

  ngOnInit() {
    this.appService.getTrans().subscribe((data: any) => {
      this.data = data.data[0];
      console.log(this.data);
      this.data.forEach(element => {
        this.id = element['id']; 
      });   
      
    })

    this.url = "http://192.168.9.47/calms/TransKalibrasiView/"+ this.id +"?showdetail=";
  }

}
