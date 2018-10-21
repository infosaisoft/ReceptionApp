import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubBillData } from './sub-bill';
import { BillService } from "../services/bill.service";
import { BillTariffsComponent } from '../bill-tariffs/bill-tariffs.component';
import { AppointmentService } from '../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accept-bill',
  templateUrl: './accept-bill.component.html',
  styleUrls: ['./accept-bill.component.css'],
  providers: [BillService]
})
export class AcceptBillComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  billingForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid: string = "hid1";

  appointment: any;
  tariffRates: any = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  sub_bill: Array<SubBillData>;

  modes: String[] = ['Cash', 'Cheque', 'Online'];

  appliedTariffs: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private billService: BillService, private appointmentService: AppointmentService, private snackbar: MatSnackBar) {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.appointment_id) {
        this.appointmentService.getAppointmentById(params.appointment_id).subscribe(responsedata => {
          let data: any = responsedata;
          this.appointment = data.response;

          this.billingForm.controls["patient_name"].setValue(this.appointment.patient.name);
          this.billingForm.controls["patient_contact"].setValue(this.appointment.patient.contact);

          //fetching tariff rates.
          this.appointmentService.getTariffRatesByAppointment(this.appointment.id).subscribe(responsedata => {
            let data: any = responsedata;
            this.prepareTariffData(data.response);
            //this.tariffRates = data.response;
          });

        });



      }
    });

    this.billingForm = this.formBuilder.group({
      'patient_name': ['', Validators.required],
      'patient_contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
      'add_charge': [''],
      'discount': [''],
      'net_amount': ['', Validators.required],
      'amount_paid': [''],
      'balance_amt': [''],
      'payment_mode': [''],
    });



  }

  prepareTariffData(tariffRates: any) {

    tariffRates.forEach(element => {
      let obj = { tariff_rate_id: element.id, tariff_name: element.tariff.name, service_name: element.service_name, service_category: element.service_category, rate: element.rate };
      if (element.is_mandatory) {
        this.applyTariff(obj);
      } else {
        this.tariffRates.push(obj);
      }
    });
    this.calculateNetAmount();
  }

  applyTariff(obj: any) {
    this.appliedTariffs.push(obj);
    this.calculateNetAmount();
  }

  applyMandatoryTariffs(tariffRates: any) {
    tariffRates.forEach(element => {
      if (element.is_mandatory) {
        let obj = { tariff_name: element.tariff.name, service_name: element.service_name, service_category: element.service_category, rate: element.rate };
        this.appliedTariffs.push(obj);


      }
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  calculateNetAmount() {
    let netAmount = 0;
    this.appliedTariffs.forEach(element => {
      netAmount += element.rate;
    })

    let addCharge = this.billingForm.controls["add_charge"].value;
    let discount = this.billingForm.controls["discount"].value;

    if (addCharge > 0) {
      netAmount += addCharge;
    }

    if (discount > 0) {
      netAmount -= discount;
    }


    let paidAmt = this.billingForm.controls["amount_paid"].value;

    let remaining = netAmount - paidAmt;

    this.billingForm.controls["balance_amt"].setValue(remaining);

    this.billingForm.controls["net_amount"].setValue(netAmount);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onClickAdd(tarName, servName) {
    let subBill = new SubBillData(tarName, servName);
    this.sub_bill.push(subBill);
  }

  onSubmit() {

    let req = {
      "appointment_id": this.appointment.id,
      "additional_charges": this.billingForm.controls["add_charge"].value,
      "discount_amount": this.billingForm.controls["discount"].value,
      "net_amount": this.billingForm.controls["net_amount"].value,
      "paid_amount": this.billingForm.controls["amount_paid"].value,
      "payment_mode": this.billingForm.controls["payment_mode"].value,
      "bill_tariffs": []
    }

    this.appliedTariffs.forEach(element => {
      req.bill_tariffs.push({ amount: element.rate, tariff_rate_id: element.tariff_rate_id, remark: '' });
    });


    this.billService.createBill(req)
      .subscribe((data: any) => {

        this.router.navigate(['view-bill']);
        this.snackbar.open("Bill Generated Successfully", "", {
          duration: 4000,
        });
      }, error => {
        this.snackbar.open("Bill Generation Failed", "", {
          duration: 4000,
        });
      });
  }

  // valuechange(newValue) {
  //   this.ratemodel = newValue;
  //   console.log(newValue)
  // }
  // chargechange(newValue) {
  //   this.chargemodel = newValue;
  //   console.log(newValue)
  // }

  close(reason: string) {
    this.sidenav.close();
  }

  addTariffs() {
    let dialogRef = this.dialog.open(BillTariffsComponent, {
      width: '800px',
      data: { tariffs: this.tariffRates }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);

      if (result)
        this.applyTariff(result.tariff);


    });

  }

  onAddChargeChange() {
    this.calculateNetAmount();
  }

  onDiscountChange() {
    this.calculateNetAmount();
  }

  onAmtPaidChange() {
    this.calculateNetAmount();


  }

}
