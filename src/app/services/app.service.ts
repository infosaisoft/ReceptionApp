import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { AppConfig } from '../app.config';

@Injectable()
export class AppService {
  private httpOptions: any = null;

  constructor(private http: HttpClient, private appConfig:AppConfig) {
    let headers: any = { "device-id":1};
    //this.httpOptions = { headers: new HttpHeaders(headers) };

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'device-id': "1" 
      })
    };
  }

  login(req: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/app/login", req, this.httpOptions)
  }

}
