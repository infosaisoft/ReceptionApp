import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { PatientData } from "./patient.model";

@Injectable()
export class PatientService{

    private serviceUrl = "http://localhost:1010/ReceptionApp-WebService/registration";

    constructor(private _http: HttpClient){ }

    registerPatient(patient: PatientData){
        console.log(patient);
        return this._http.post(this.serviceUrl, patient)
    }

}