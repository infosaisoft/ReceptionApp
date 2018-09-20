import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginData } from "./login.model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class LoginService {

    private serviceUrl = "http://localhost:1010/ReceptionApp-WebService/login";

    constructor(private _http: HttpClient){}

    loginUser(loginData: LoginData){
        console.log(loginData);
        return this._http.post(this.serviceUrl, loginData, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'),
                observe: 'response'
        });
    }

}