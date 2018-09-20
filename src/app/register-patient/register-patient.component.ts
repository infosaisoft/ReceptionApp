import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from './patient.service';
import { MatSnackBar, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
  providers: [ PatientService ]
})
export class RegisterPatientComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  patientForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, public snackbar: MatSnackBar) {
      this.patientForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
        'aadhar': [''],
        'address': [''],
        'city': [''],
        'state': [''],
        'zip': [''],
        'gender': [''],
        'age': [''],
        'email': ['', Validators.email],
        //'photo': [''],
      });
  }

  ngOnInit() {
  }

  close(reason: string) {
    this.sidenav.close();
  }

  onSubmit(){
      console.log(this.patientForm.value);
      this.patientService.registerPatient(this.patientForm.value)
        .subscribe((data:any) => {
            console.log(JSON.stringify(data));
            console.log("Patient Registered Successfully");
            this.snackbar.open("Patient Registered Successfully", "", {
              duration: 4000,
            });
          },error => {
            console.log("Registration Failed");
            this.snackbar.open("Registration Failed", "", {
              duration: 4000,
            });
            console.log(error);          
        });
  }


}
