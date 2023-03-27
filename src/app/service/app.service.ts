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
  remaindingExp() {
    return this.http.get(this.baseUrl + '/remaindingExp');
  }
  count_temp() {
    return this.http.get(this.baseUrl + '/count_temp');
  }
  count_press() {
    return this.http.get(this.baseUrl + '/count_press');
  }
  count_mass() {
    return this.http.get(this.baseUrl + '/count_mass');
  }
  count_ph() {
    return this.http.get(this.baseUrl + '/count_ph');
  }
  count_conduct() {
    return this.http.get(this.baseUrl + '/count_conduct');
  }

}
