import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { BillData } from "./bill.model";

@Injectable()
export class BillService{

    private serviceUrl = "http://localhost:1010/ReceptionApp-WebService/bill";

    constructor(private _http: HttpClient){ }

    registerBill(bill: BillData){
        console.log(bill);
        return this._http.post(this.serviceUrl, bill)
    }

}