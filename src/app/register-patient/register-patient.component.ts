import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
  providers: [PatientService]
})
export class RegisterPatientComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  patientForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  pincodePattern =  "^((\\?)|0)?[0-9]{6}$";
  emailPattern =  "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, public snackbar: MatSnackBar) {
    this.patientForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'username': [''],
      'password':['', Validators.required],
      'role':[''],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'address': [''],
      'user_type':  [''],
      'city': [''],
      'state': [''],
      'pincode': ['', Validators.compose([Validators.required, Validators.pattern(this.pincodePattern)])],
      'gender': [''],
      'age': [''],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'photo': [''],
      'hospital_id': [''],
    });
  }

  ngOnInit() {
  }

  close(reason: string) {
    this.sidenav.close();
  }

  onSubmit() {

    var patientReq = this.patientForm.value;
    patientReq['role'] = 'patient';
    patientReq['photo'] = 1;
    patientReq['username'] = patientReq['name'];
    patientReq['hospital_id'] = 1;
    patientReq['user_type'] = 3; // for user type patient  

    console.log(patientReq);

    this.patientService.createPatient(patientReq)
      .subscribe((data: any) => {

        this.patientForm.reset();

        this.patientForm.updateValueAndValidity();
        this.patientForm.markAsUntouched();
        this.patientForm.markAsPristine();

        this.snackbar.open("Patient Registered Successfully", "", {
          duration: 4000,
        });
      }, error => {
        console.log("Registration Failed");
        this.snackbar.open("Registration Failed", "", {
          duration: 4000,
        });
        console.log(error);
      });
  }


}
