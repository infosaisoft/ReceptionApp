import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class PatientService {

  private httpOptions: any = null;
  private apiBaseUrl: string = "http://localhost:8090";

  constructor(private http: HttpClient) {
    let headers: any = { 'Authorization': 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtcmNvb2wiLCJ1c2VySWQiOiI5Iiwicm9sZSI6ImFkbWluIn0.YvfUxAwoHSibYxDHZ5ZLyLok5LQ1TvapRqfTQpHZObwK5By3hi_U3Hrqoh371-LOb1MbXgq0hDJwJnABlE93mw' };
    this.httpOptions = { headers: new HttpHeaders(headers) };
  }

 

  createPatient(req: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/patient/create", req, this.httpOptions)
  }

}
