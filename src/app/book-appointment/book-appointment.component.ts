import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { AppointmentService } from './appointment.service';
import { AppointmentGetData } from './appointment-get.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  providers: [ AppointmentService ]
})
export class BookAppointmentComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  appointmentForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid:string = "hid1";
  

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, public snackbar: MatSnackBar) {
    this.appointmentForm = this.formBuilder.group({
      'patient_name': ['', Validators.required],
      'contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'time': ['', Validators.required],
      'hid': [this.hid],
      'date': ['', Validators.required],
    });
  }

  ngOnInit() {
    
  }

  close(reason: string) {
    this.sidenav.close();
  }

  onSubmit(){
    console.log(this.appointmentForm.value);
    this.appointmentService.addAppointment(this.appointmentForm.value)
      .subscribe((data:any) => {
          console.log(JSON.stringify(data));
          console.log("Appointment Booked Successfully");
          this.snackbar.open("Appointment Booked Successfully", "", {
            duration: 4000,
          });
        },error => {
          console.log("Appointment Booking Failed");
          this.snackbar.open("Appointment Booking Failed", "", {
            duration: 4000,
          });
          console.log(error);          
      });
  }

  getAppointments(){

  }

}
