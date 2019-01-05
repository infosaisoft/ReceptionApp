import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { AppointmentService } from '../services/appointment.service';
import { AppUtility } from '../app.utility';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SlotDialogComponent } from '../slot-dialog/slot-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

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

  private appointmentId: number;
  appointmentData: any;

  slots: any = [];

  selectedSlot: any = {
    start_time: null,
    end_time: null,
  };

  appointmentForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid: string = "hid1";
  isUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      // 'room_name': [''],
      'contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'slot': [''],
      'hid': [this.hid],
      'date': ['', Validators.required],
    });

    let auth: any = localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      if (auth.hasOwnProperty('hospital')) {
        var docReq: any = {
          "hospital_id": auth.hospital.id
        }
        this.appointmentService.getDoctorList(docReq).subscribe(responsedata => {
          let data: any = responsedata;
          this.doctorList = data.response;
        });
      }
    }

    this.route.queryParams.subscribe(params => {
      this.appointmentId = params['appointmentId'];

      if (this.appointmentId != null) {
        this.getAppointmentById(this.appointmentId);
        this.isUpdate = true;
      }
    });



  }

  openSlotDialog(): void {
    const dialogRef = this.dialog.open(SlotDialogComponent, {
      width: '280px',
      data: { slots: this.slots }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedSlot = result;
        console.log('The dialog was closed', result);
      }
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

    let refService:any = this.appointmentService.createAppointment(req);
    if(this.isUpdate){
      req["id"] = this.appointmentData.id;  
      refService = this.appointmentService.updateAppointment(req);    
    }

    console.log(req);
    refService
      .subscribe((data: any) => {
        this.appointmentForm.reset();
        this.router.navigate(['/appointments'])
        this.appointmentForm.markAsPristine();
        this.appointmentForm.markAsUntouched();
        this.appointmentForm.updateValueAndValidity();
        this.snackbar.open(data.message, "", {
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

  getAppointmentById(appointmentId: number) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe(responsedata => {
      let data: any = responsedata;
      if (data.status_code == "OK") {
        this.appointmentData = data.response;
        this.prefillData(this.appointmentData);
        //this.appointmentForm.controls["patient_name"].setValue(data.response.name);
      }

    });
  }

  prefillData(appointmentData: any) {
    this.getDepartments(appointmentData.slot.doc_dept_assoc.doctor.id);
    let dateObj;
    if (appointmentData.slot.date) {
      let tempDate = appointmentData.slot.date.split(" ");
      let finalDate = tempDate[0].split("-");
      dateObj = new Date(finalDate[0], (finalDate[1] - 1), finalDate[2]);
    }

    this.appointmentForm.patchValue({
      'doctor': appointmentData.slot.doc_dept_assoc.doctor.id,
      'department': appointmentData.slot.doc_dept_assoc.department.id,
      'patient_name': appointmentData.patient.profile.name,
      // 'room_name': appointmentData.slot.doc_dept_assoc.room_name,
      'contact': appointmentData.patient.profile.mobile,
      'slot': "",
      'hid': "",
      'date': dateObj//appointmentData.slot.date,
    });

    this.selectedSlot = appointmentData.slot;

    this.getSlots();
  }

  getPatientName(contact: any) {
    this.appointmentService.getPatientByMobile(contact).subscribe(responsedata => {
      let data: any = responsedata;
      if (data.response != null) {
        this.appointmentForm.controls["patient_name"].setValue(data.response.name);
      }

    });
  }

  getDepartments(doctor: any) {

    this.appointmentService.getDepartmentsByDoctor(doctor).subscribe(responsedata => {
      let data: any = responsedata;
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
      "department_id": this.appointmentForm.controls["department"].value,
      "doctor_id": this.appointmentForm.controls["doctor"].value,
      "from_date": date1
    }

    // let criteria = {
    //   "department_id": 9, 
    //   "doctor_id": 4,
    //   "from_date": "2018-12-28"
    // }

    this.appointmentService.getSlots(criteria).subscribe(responsedata => {
      let data: any = responsedata;
      if (data.response != null) {
        this.slots = data.response;
      }
    });
  }

}
