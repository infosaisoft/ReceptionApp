import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private appService: AppService,
    private snackbar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });

    let auth: any = localStorage.getItem("auth");
    
    if (auth != null) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

  }

  onSubmit() {
    this.appService.login(this.loginForm.value)
      .subscribe(resp => {
        let r: any = resp;
        localStorage.setItem("auth", JSON.stringify(r.response));
        this.router.navigate(['/']);

        console.log("Login Successfull!");
      }, error => {
        console.log("Login Failed!");
        this.snackbar.open("Invalid credentials.", "", {
          duration: 4000,
        });
      });

  }

}
