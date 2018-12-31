import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { AppConfig } from '../app.config';

@Injectable()
export class AppointmentService {
  private httpOptions: any = null;
  private auth: any = null;

  constructor(private http: HttpClient, private appConfig:AppConfig) {

    let authdata = localStorage.getItem("auth");
    let authtoken  = "";
    if (null != authdata) {
      let auth = JSON.parse(authdata);
      this.auth = auth;
      authtoken = this.auth.authtoken;
    }
    let headers: any = { 'Authorization': 'Token ' + authtoken };
    this.httpOptions = { headers: new HttpHeaders(headers) };
  }

  getDoctorList(criteria : any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/api/doctor/list",criteria, this.httpOptions)
  }

  getPatientByMobile(mobile: string) {
    return this.http.get<ApiResponse>(this.appConfig.API_BASE_URL + "/api/patient/mobile/" + mobile, this.httpOptions)
  }


  getDepartmentsByDoctor(doctor: number) {
    return this.http.get<ApiResponse>(this.appConfig.API_BASE_URL + "/api/doctor/" + doctor + "/departments", this.httpOptions)
  }

  getSlots(criteria: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/api/doctor/slots", criteria, this.httpOptions)
  }

  createAppointment(req: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/api/appointment/create", req, this.httpOptions)
  }

  updateAppointment(req: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/api/appointment/update", req, this.httpOptions)
  }

  searchAppointment(req: any) {
    return this.http.post<ApiResponse>(this.appConfig.API_BASE_URL + "/api/appointment/search", req, this.httpOptions)
  }

  getTariffRatesByAppointment(appointmentId: number) {
    return this.http.get<ApiResponse>(this.appConfig.API_BASE_URL + "/api/tariffs/appointment/" + appointmentId, this.httpOptions)
  }

  getAppointmentById(appointmentId: number) {
    return this.http.get<ApiResponse>(this.appConfig.API_BASE_URL + "/api/appointment/" + appointmentId, this.httpOptions)
  }


}
