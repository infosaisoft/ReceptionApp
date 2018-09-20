import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { 
      this.loginForm = this.formBuilder.group({
        'username': ['', Validators.required],
        'password': ['', Validators.required],
      });
  }

  ngOnInit() {

  }

  onSubmit(){
    this.loginService.loginUser(this.loginForm.value)
      .subscribe(resp => {
          console.log(resp);
          console.log("Login Successfull!");
          console.log(resp.headers);
        },error => {
          console.log("Login Failed!");
          console.log(error);
      });
      // .subscribe((data:any) => {
      //     console.log(data);
      //     console.log("Login Successfull!");
      //   },error => {
      //     console.log("Login Failed!");
      //     console.log(error);
      // });
  }

}
