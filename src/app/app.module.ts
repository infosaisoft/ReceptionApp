import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AppSidenavComponent } from './app-sidenav/app-sidenav.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { AcceptBillComponent } from './accept-bill/accept-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { AppointmentService } from './services/appointment.service';
import { AppUtility } from './app.utility';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BillTariffsComponent } from './bill-tariffs/bill-tariffs.component';
import { BillService } from './services/bill.service';
import { AppService } from './services/app.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './guards/AuthGuard';
import { AppConfig } from './app.config';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterPatientComponent,
    BookAppointmentComponent,
    AppSidenavComponent,
    ManageAppointmentsComponent,
    AcceptBillComponent,
    ViewBillComponent,
    ConfirmDialogComponent,
    BillTariffsComponent,
    LogoutComponent
    // AppGlobals,
    // AppConfig
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
    // AppGlobals,
    // AppConfig
  ],
  providers: [DatePipe, AppointmentService, AppUtility, BillService, AppService, AuthGuard, AppConfig],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    BillTariffsComponent

  ],
})
export class AppModule { }
