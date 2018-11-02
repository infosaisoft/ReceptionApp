import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { AppConfig } from '../app.config';

@Injectable()
export class AppService {
  private httpOptions: any = null;

  constructor(private http: HttpClient, private appConfig:AppConfig) {
    let headers: any = { 'Authorization': 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtcmNvb2wiLCJ1c2VySWQiOiI5Iiwicm9sZSI6ImFkbWluIn0.YvfUxAwoHSibYxDHZ5ZLyLok5LQ1TvapRqfTQpHZObwK5By3hi_U3Hrqoh371-LOb1MbXgq0hDJwJnABlE93mw' };
    this.httpOptions = { headers: new HttpHeaders(headers) };
  }

  login(req: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/app/login", req, this.httpOptions)
  }

}
