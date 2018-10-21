import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bill-tariffs',
  templateUrl: './bill-tariffs.component.html',
  styleUrls: ['./bill-tariffs.component.css']
})
export class BillTariffsComponent implements OnInit {

  tariffsForm: FormGroup;

  tariffs: any;

  tariffRates: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<BillTariffsComponent>, private formBuilder: FormBuilder, private appointmentService: AppointmentService) {

    if (dialogData.hasOwnProperty("tariffs")) {
      this.tariffRates = dialogData.tariffs;
    }

    this.tariffsForm = this.formBuilder.group({
      'tariff_name': ['', Validators.required],
      'service_name': ['', Validators.required],
      'service_category': ['', Validators.required],
      'rate': ['', Validators.required],
      "tariff_rate_id": [""]
    });

  }

  ngOnInit() {
  }

  setTariff() {
    let tariff = this.tariffsForm.controls["tariff_name"].value;
    this.tariffsForm.controls["service_name"].setValue(tariff.service_name);
    this.tariffsForm.controls["service_category"].setValue(tariff.service_category);
    this.tariffsForm.controls["rate"].setValue(tariff.rate);
    this.tariffsForm.controls["tariff_rate_id"].setValue(tariff.tariff_rate_id);
  }

  onSubmit() {
    let selectedTariff = this.tariffsForm.value;
    selectedTariff.tariff_name = selectedTariff.tariff_name.tariff_name;
    this.dialogRef.close({ "tariff": selectedTariff });
  }

}
