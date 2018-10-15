import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';

@Injectable()
export class AppointmentService {
  private httpOptions: any = null;
  private apiBaseUrl: string = "http://localhost:8090";

  constructor(private http: HttpClient) {
    let headers: any = { 'Authorization': 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtcmNvb2wiLCJ1c2VySWQiOiI5Iiwicm9sZSI6ImFkbWluIn0.YvfUxAwoHSibYxDHZ5ZLyLok5LQ1TvapRqfTQpHZObwK5By3hi_U3Hrqoh371-LOb1MbXgq0hDJwJnABlE93mw' };
    this.httpOptions = { headers: new HttpHeaders(headers) };
  }

  getDoctorList() {
    return this.http.get<ApiResponse>(this.apiBaseUrl + "/api/doctor/list", this.httpOptions)
  }

  getPatientByMobile(mobile: string) {
    return this.http.get<ApiResponse>(this.apiBaseUrl + "/api/patient/mobile/" + mobile, this.httpOptions)
  }


  getDepartmentsByDoctor(doctor: number) {
    return this.http.get<ApiResponse>(this.apiBaseUrl + "/api/doctor/" + doctor + "/departments", this.httpOptions)
  }

  getSlots(criteria: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/doctor/slots", criteria, this.httpOptions)
  }

  createAppointment(req: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/appointment/create", req, this.httpOptions)
  }

  updateAppointment(req: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/appointment/update", req, this.httpOptions)
  }

  searchAppointment(req: any) {
    return this.http.post<ApiResponse>(this.apiBaseUrl + "/api/appointment/search", req, this.httpOptions)
  }

  getTariffRatesByAppointment(appointmentId: number) {
    return this.http.get<ApiResponse>(this.apiBaseUrl + "/api/tariffs/appointment/" + appointmentId, this.httpOptions)
  }

  getAppointmentById(appointmentId: number) {
    return this.http.get<ApiResponse>(this.apiBaseUrl + "/api/appointment/" + appointmentId , this.httpOptions)
  }


}
