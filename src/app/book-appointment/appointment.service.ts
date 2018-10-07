import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient } from "@angular/common/http";
import { AppointmentData } from "./appointment.model";
import { AppointmentGetData } from "./appointment-get.model";

@Injectable()
export class AppointmentService{

    private serviceUrl = "http://localhost:8080/ReceptionApp-WebService/appointment";


    constructor(private _http: HttpClient){ }

    addAppointment(appointment: AppointmentData){
        console.log(appointment);
        return this._http.post(this.serviceUrl, appointment)
    }

    getAppointments(hid,latest_date):Observable<AppointmentGetData[]> {
        return this._http
            .get<AppointmentGetData[]>(this.serviceUrl+"?hid="+hid+"&appdate="+latest_date)
                .map( (results: any )  => results) ;    
    }
}