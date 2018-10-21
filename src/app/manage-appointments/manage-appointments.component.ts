import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSidenav, MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentGetData } from '../book-appointment/appointment-get.model';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { AppUtility } from '../app.utility';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css'],
  providers: [AppointmentService]
})
export class ManageAppointmentsComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  searchAppointmentForm: FormGroup;
  results: any;
  hid: string = "hid1";
  newdate: string;
  doctor: any;
  //newdate = new Date();
  date;
  latest_date: Date;
  latest_date1: string;
  doctorList: any;

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private appointmentService: AppointmentService, private utility: AppUtility, public snackbar: MatSnackBar, public datepipe: DatePipe) {
    this.searchAppointmentForm = this.formBuilder.group({
      'date': ["", Validators.required],
      'doctor': ["", Validators.required],
    });


    this.appointmentService.getDoctorList().subscribe(responsedata => {
      let data: any = responsedata;
      this.doctorList = data.response;

    });
  }

  ngOnInit() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.newdate = latest_date.toString();
    console.log(this.newdate);
    //this.getApps(this.hid, this.newdate);
  }

  onChange($event) {


    // this.date=new Date();
    // let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    // this.newdate = latest_date.toString();
    // console.log(this.newdate);
    // this.getApps(this.hid, this.newdate);
  }

  onSubmit() {
    let date1 = this.utility.formatDate(this.searchAppointmentForm.controls["date"].value);
    let req: any = {
      "date": date1,
      "doctor_id": this.searchAppointmentForm.controls["doctor"].value.id
    }

    this.appointmentService.searchAppointment(req)
      .subscribe((data: any) => {
        this.results = data.response;
      }, error => {

        console.log(error);
      });
  }

  closeAppointment(appointment: any) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: "Close the Appointment", confirmMsg: 'Do you really want to close the appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result) {
        let req = { id: appointment.id, status: 2 }
        //this.helpers.loading("submit-video-activity");
        this.appointmentService.updateAppointment(req).subscribe(data => {
          //this.helpers.unloading("submit-video-activity");
          this.onSubmit();
          let snackBarRef = this.snackbar.open("Appointment has been closed successfully! ", "", { duration: 3000 });

        })
      }
      console.log('The dialog was closed', result);

    });

  }


  close(reason: string) {
    this.sidenav.close();
  }

  goToPaymentPage(appointment: any) {
    this.router.navigate(['accept-bill'], { queryParams: { appointment_id: appointment.id } });
    console.log(appointment);
  }
}
