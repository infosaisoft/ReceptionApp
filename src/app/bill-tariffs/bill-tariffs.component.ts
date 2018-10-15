import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bill-tariffs',
  templateUrl: './bill-tariffs.component.html',
  styleUrls: ['./bill-tariffs.component.css']
})
export class BillTariffsComponent implements OnInit {

  tariffsForm: FormGroup;

  appointment: any;

  tariffRates: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private formBuilder: FormBuilder, private appointmentService: AppointmentService) {

    if (dialogData.hasOwnProperty("appointment"))
      this.appointment = dialogData.appointment;

      console.log(this.appointment);

    this.appointmentService.getTariffRatesByAppointment(this.appointment.id).subscribe(responsedata => {
      let data: any = responsedata;
      this.tariffRates = data.response;
    });

    this.tariffsForm = this.formBuilder.group({
      'tariff_name': ['', Validators.required],
      'service_name': ['', Validators.required],
      'category': ['', Validators.required],
      'rate': ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  setTariff(){
    let tariff = this.tariffsForm.controls["tariff_name"].value; 
    this.tariffsForm.controls["service_name"].setValue(tariff.service_name);
    this.tariffsForm.controls["category"].setValue(tariff.service_category);
    this.tariffsForm.controls["rate"].setValue(tariff.rate);
  }

}
