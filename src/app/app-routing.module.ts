import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { AcceptBillComponent } from './accept-bill/accept-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-patient', component: RegisterPatientComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },  
  { path: 'appointments', component: ManageAppointmentsComponent },  
  { path: 'accept-bill', component: AcceptBillComponent },  
  { path: 'view-bill', component: ViewBillComponent },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
