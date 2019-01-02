import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { AppointmentService } from '../services/appointment.service';
import { AppUtility } from '../app.utility';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SlotDialogComponent } from '../slot-dialog/slot-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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

  slots: any = [];

  selectedSlot : any = {
    start_time : null,
    end_time : null,
  }; 

  appointmentForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid: string = "hid1";


  constructor(
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar,
    private utility: AppUtility,
    private appointmentService: AppointmentService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.appointmentForm = this.formBuilder.group({
      'doctor': ['', Validators.required],
      'department': ['', Validators.required],
      'patient_name': ['', Validators.required],
      'room_name': [''],
      'contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'slot': [''],
      'hid': [this.hid],
      'date': ['', Validators.required],
    });
    
    let auth: any = localStorage.getItem("auth");
    if(auth){
      auth = JSON.parse(auth);
      if(auth.hasOwnProperty('hospital')){
        var docReq : any ={
          "hospital_id" : auth.hospital.id
        }
        this.appointmentService.getDoctorList(docReq).subscribe(responsedata => {
          let data: any = responsedata;
          this.doctorList = data.response;    
        });
      }
    }
  }

  openSlotDialog(): void {
    const dialogRef = this.dialog.open(SlotDialogComponent, {
      width: '280px',
      data: {slots: this.slots}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedSlot = result;
      console.log('The dialog was closed',result);
    });
  }

  ngOnInit() {

  }

  close(reason: string) {
    this.sidenav.close();
  }

  createAppointment() {

    let req: any = {
      "mobile": this.appointmentForm.controls["contact"].value,
      "patient_name": this.appointmentForm.controls["patient_name"].value,
      "slot_id": this.selectedSlot.id
    }

    console.log(req);
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
      "from_date": date1
    }

    // let criteria = {
    //   "department_id": 9, 
    //   "doctor_id": 4,
    //   "from_date": "2018-12-28"
    // }

    this.appointmentService.getSlots(criteria).subscribe(responsedata => {
      let data:any = responsedata;
      if (data.response != null) {
        this.slots = data.response;
      }
    });
  }

}
