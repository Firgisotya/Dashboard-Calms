import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // private baseUrl = 'http://localhost:5000'
  private baseUrl = 'http://192.168.144.45:5000'

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
  count_dimensi(){
    return this.http.get(this.baseUrl + '/count_dimensi');
  }
  count_refracto(){
    return this.http.get(this.baseUrl + '/count_refracto');
  }
  count_enclosure(){
    return this.http.get(this.baseUrl + '/count_enclosure');
  }
  count_thermo(){
    return this.http.get(this.baseUrl + '/count_thermohygro');
  }
  trans_by_status(){
    return this.http.get(this.baseUrl + '/trans_by_status');
  }
  trans_by_category(){
    return this.http.get(this.baseUrl + '/trans_by_category');
  }
  table_pending(){
    return this.http.get(this.baseUrl + '/table_pending');
  }
  filter_trans_month(month: any){
    console.log("from service");
    console.log(month);
    return this.http.post(this.baseUrl + '/filter_trans_month', month);
  }
}
