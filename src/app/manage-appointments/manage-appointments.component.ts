import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentGetData } from '../book-appointment/appointment-get.model';
import { AppointmentService } from '../book-appointment/appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css'],
  providers: [ AppointmentService ]
})
export class ManageAppointmentsComponent implements OnInit {
  
  @ViewChild('sidenav') sidenav: MatSidenav;

  getAppointment: FormGroup;
  results: AppointmentGetData[];
  hid:string = "hid1";
  newdate:string;
  //newdate = new Date();
  date;
  latest_date: Date;
  latest_date1: string;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, public snackbar: MatSnackBar, public datepipe: DatePipe) { 
    this.getAppointment = this.formBuilder.group({
      'newdate': [this.newdate, Validators.required],
    });
  }

  ngOnInit() {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.newdate = latest_date.toString();
    console.log(this.newdate);
    this.getApps(this.hid, this.newdate);
  }

  onChange($event) {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.newdate = latest_date.toString();
    console.log(this.newdate);
    this.getApps(this.hid, this.newdate);
  }

  getApps(hid,newdate){
    
    this.appointmentService.getAppointments(this.hid,this.newdate)
      .subscribe( data=>{
          this.results=data;
      }, error=>{
        this.snackbar.open('Unable to fetch Appointments', '', {
          duration: 4000
        });
      });
  }

  close(reason: string) {
    this.sidenav.close();
  }
}
