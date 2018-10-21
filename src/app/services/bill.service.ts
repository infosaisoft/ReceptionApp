import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class BillService {
  private httpOptions: any = null;
  private apiBaseUrl: string = "http://localhost:8090";
  private auth: any = null;

  constructor(private http: HttpClient) {
    let authdata = localStorage.getItem("auth");
    if (null != authdata) {
      let auth = JSON.parse(authdata);
      this.auth = auth;
    }
    let headers: any = { 'Authorization': 'Token ' + this.auth.authtoken };
    this.httpOptions = { headers: new HttpHeaders(headers) };
  }

  createBill(req: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/bill/create", req, this.httpOptions)
  }

  getBills(criteria: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/bill/search", criteria, this.httpOptions)
  }

}
