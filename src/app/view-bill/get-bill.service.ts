import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { GetBillData } from "./get-bill.model";


@Injectable()
export class GetBillService{

    private serviceUrl = "http://localhost:1010/ReceptionApp-WebService/viewbill";

    constructor(private _http: HttpClient){ }

    getBills(hid):Observable<GetBillData[]> {
        return this._http
            .get<GetBillData[]>(this.serviceUrl+"?hid="+hid)
                .map( (results: any )  => results) ;    
    }

}