import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatSidenav } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SubBillData } from './sub-bill';
import { BillService } from './bill.service';

@Component({
  selector: 'app-accept-bill',
  templateUrl: './accept-bill.component.html',
  styleUrls: ['./accept-bill.component.css'],
  providers: [ BillService ]
})
export class AcceptBillComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  billingForm: FormGroup;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  hid:string = "hid1";

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
  sub_bill: Array<SubBillData>;

  modes: String[] = [ 'Cash', 'Cheque', 'Online' ];
  
  constructor(private formBuilder: FormBuilder, private billService: BillService, public snackbar: MatSnackBar) {

   // this.sub_bill = [];

    this.billingForm = this.formBuilder.group({
        'patient_name': ['', Validators.required],
        'patient_contact': ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
        //'myControl1': ['', Validators.required],
        // 'sub_bill': this.formBuilder.group({
        //     'tariff_name': ['', Validators.required],
        //     'service_name': ['', Validators.required],
        //  }),
        'tariff_name': ['', Validators.required],
        'service_name': ['', Validators.required],
        'category': ['', Validators.required],
        'rate': ['', Validators.required],
        'add_charge': [''],
        'discount': [''],
        'net_amount': [''],
        'amount_paid': [''],
        'balance_amt': [''],
        'payment_mode': [''],
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onClickAdd(tarName, servName){
    let subBill = new SubBillData(tarName, servName);
    this.sub_bill.push(subBill);
  }

  onSubmit(){
    console.warn(this.billingForm.value);
    this.billService.registerBill(this.billingForm.value)
        .subscribe((data:any) => {
          console.log(JSON.stringify(data));
          console.log("Bill Generated Successfully");
          this.snackbar.open("Bill Generated Successfully", "", {
            duration: 4000,
          });
        },error => {
          console.log("Bill Generation Failed");
          this.snackbar.open("Bill Generation Failed", "", {
            duration: 4000,
          });
          console.log(error);          
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

}
