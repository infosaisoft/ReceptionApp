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
import { AuthGuard } from './guards/AuthGuard';
import { UploaderComponent } from './uploader/uploader.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register-patient', component: RegisterPatientComponent ,canActivate: [AuthGuard] },
  { path: 'book-appointment', component: BookAppointmentComponent ,canActivate: [AuthGuard]},  
  { path: 'appointments', component: ManageAppointmentsComponent ,canActivate: [AuthGuard]},  
  { path: 'accept-bill', component: AcceptBillComponent ,canActivate: [AuthGuard]},  
  { path: 'view-bill', component: ViewBillComponent ,canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
