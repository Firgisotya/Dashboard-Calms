import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000'

  getInex() {
    return this.http.get(this.baseUrl + '/jenis');
  }
  getTh() {
    return this.http.get(this.baseUrl + '/tahun');
  }
  getMonth(year: any) {
    console.log("from service");
    console.log(year);
    return this.http.post(this.baseUrl + '/bulan' , year);
  }
  remainding() {
    return this.http.get(this.baseUrl + '/remainding');
  }


}
