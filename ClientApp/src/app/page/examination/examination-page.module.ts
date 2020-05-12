import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfCheckboxModule, MsfIconModule, MsfMenuModule, MsfTableModule} from "fabric-docs";
import {ExaminationListComponent} from "./examination-list/examination-list.component";
import {ExaminationHomeComponent} from './examination-home/examination-home.component';
import {ExaminationDeleteComponent} from './examination-delete/examination-delete.component';
import {RouterModule, Routes} from "@angular/router";
import {ExaminationStudentComponent} from './examination-student/examination-student.component';
import {ExaminationSettingsComponent} from './examination-settings/examination-settings.component';
import {ExaminationReviewsComponent} from './examination-reviews/examination-reviews.component';
import {ExaminationCalendarComponent} from './examination-calendar/examination-calendar.component';
import {ExaminationModule, ExaminationResolver} from "examination/app/examination";
import {TestModule} from "examination/app/test";
import {LayoutModule} from "examination/infrastructure";
import {OrganisationModule} from "examination/app/organisation";
import {AppFormModule, ControlModule} from "examination/controls";
import {MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MomentModule} from "ngx-moment";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";

export const routes: Routes = [
  {path: '', component: ExaminationListComponent},
  {path: 'list', redirectTo: '', pathMatch: 'full'},
  {path: ':examinationId', redirectTo: ':examinationId/home'},
  {path: ':examinationId/home', component: ExaminationHomeComponent, resolve: [ ExaminationResolver]},
  {path: ':examinationId/students', component: ExaminationStudentComponent, resolve: [ ExaminationResolver]},
  {path: ':examinationId/calendar', component: ExaminationCalendarComponent, resolve: [ ExaminationResolver]},
  {path: ':examinationId/settings', component: ExaminationSettingsComponent, resolve: [ ExaminationResolver]}
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppFormModule, MsfIconModule, MsfButtonModule, ExaminationModule, TestModule, LayoutModule, OrganisationModule,
    ControlModule, MatDialogModule, MomentModule, MsfTableModule, MsfMenuModule, MsfCheckboxModule,
    RouterModule.forChild(routes), MatRippleModule, MatDatepickerModule],
  declarations: [ExaminationListComponent, ExaminationHomeComponent, ExaminationDeleteComponent,
    ExaminationCalendarComponent, ExaminationReviewsComponent, ExaminationSettingsComponent,
    ExaminationStudentComponent]
})
export class ExaminationPageModule {

}
