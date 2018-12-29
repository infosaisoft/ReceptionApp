import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { AppointmentService } from '../services/appointment.service';
import { AppUtility } from '../app.utility';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  providers: [AppointmentService]
})
export class BookAppointmentComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  doctorList: any;

  departmentList: any;

  slots: any;

  appointmentForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid: string = "hid1";


  constructor(private formBuilder: FormBuilder, public snackbar: MatSnackBar, private utility: AppUtility, private appointmentService: AppointmentService, public snackBar: MatSnackBar) {
    this.appointmentForm = this.formBuilder.group({
      'doctor': ['', Validators.required],
      'department': ['', Validators.required],
      'patient_name': ['', Validators.required],
      'room_name': [''],
      'contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'slot': ['', Validators.required],
      'hid': [this.hid],
      'date': ['', Validators.required],
    });




    this.appointmentService.getDoctorList().subscribe(responsedata => {
      let data:any = responsedata;
      if (data.response.length == 0) {
        let snackBarRef = this.snackBar.open("Doctor list is empty.", "", { duration: 3000 });
      }
      console.log(data.response);
      this.doctorList = data.response;

    });
  }

  ngOnInit() {

  }

  close(reason: string) {
    this.sidenav.close();
  }

  onSubmit() {

    let req: any = {
      "mobile": this.appointmentForm.controls["contact"].value,
      "patient_name": this.appointmentForm.controls["patient_name"].value,
      "slot_id": this.appointmentForm.controls["slot"].value.id,
    }


    this.appointmentService.createAppointment(req)
      .subscribe((data: any) => {
        this.appointmentForm.reset();

        this.appointmentForm.markAsPristine();
        this.appointmentForm.markAsUntouched();
        this.appointmentForm.updateValueAndValidity();

        console.log(JSON.stringify(data));
        console.log("Appointment Booked Successfully");
        this.snackbar.open("Appointment Booked Successfully", "", {
          duration: 4000,
        });
      }, error => {
        console.log("Appointment Booking Failed");
        this.snackbar.open("Appointment Booking Failed", "", {
          duration: 4000,
        });
        console.log(error);
      });
  }

  getAppointments() {

  }

  getPatientName(contact: any) {
    this.appointmentService.getPatientByMobile(contact).subscribe(responsedata => {
      let data:any = responsedata;
      if (data.response != null) {
        this.appointmentForm.controls["patient_name"].setValue(data.response.name);
      }

    });
  }

  getDepartments(doctor: any) {

    this.appointmentService.getDepartmentsByDoctor(doctor.id).subscribe(responsedata => {
      let data:any = responsedata;
      if (data.response != null) {
        this.departmentList = data.response;
      }

    });
  }

  getRoom(department: any) {
    this.appointmentForm.controls["room_name"].setValue(department.room_name);
  }

  getSlots() {
    console.log("getSlots", this.appointmentForm.controls["date"].value);

    let date: Date = this.appointmentForm.controls["date"].value;
    let date1 = this.utility.formatDate(date);

    let criteria = {
      "department_id": this.appointmentForm.controls["department"].value.department.id,
      "doctor_id": this.appointmentForm.controls["doctor"].value.id,
      "date": date1
    }

    this.appointmentService.getSlots(criteria).subscribe(responsedata => {
      let data:any = responsedata;
      if (data.response != null) {
        this.slots = data.response;
      }

    });
  }



}
