import { Component } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {
p: string|number|undefined;

  constructor(private appService: AppService) { }


  dataPending: any = [];

  ngOnInit() {
    this.appService.table_pending().subscribe((data: any) => {
      this.dataPending = data.data[0];
      console.log(this.dataPending);
    })
  }


}
