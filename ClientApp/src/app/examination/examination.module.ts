import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfIconModule} from "fabric-docs";
import {LayoutModule} from "src/infrastructure/public_api";
import {ExaminationListComponent} from "./examination-list/examination-list.component";
import {ExaminationHomeComponent} from './examination-home/examination-home.component';
import {ExaminationAddComponent} from './examination-add/examination-add.component';
import {ExaminationDeleteComponent} from './examination-delete/examination-delete.component';
import {RouterModule, Routes} from "@angular/router";
import {ExaminationLayoutModule} from "./examination-layout/examination-layout.module";

;
import {ExaminationStudentComponent} from './examination-student/examination-student.component'
  ;
import {ExaminationSettingsComponent} from './examination-settings/examination-settings.component'
  ;
import {ExaminationReviewsComponent} from './examination-reviews/examination-reviews.component'
  ;
import {ExaminationCalendarComponent} from './examination-calendar/examination-calendar.component'

export const routes: Routes = [
  {path: 'add', component: ExaminationAddComponent},
  {path: '', component: ExaminationListComponent},
  {path: 'list', redirectTo: '', pathMatch: 'full'},
  {path: ':examinationId', component: ExaminationHomeComponent},
  {path: ':examinationId/home', component: ExaminationHomeComponent},
  {path: ':examinationId/students', component: ExaminationStudentComponent},
  {path: ':examinationId/calendar', component: ExaminationCalendarComponent},
  {path: ':examinationId/settings', component: ExaminationSettingsComponent}
];

@NgModule({
  imports: [MsfIconModule, MsfButtonModule, LayoutModule, ExaminationLayoutModule, RouterModule.forChild(routes)],
  declarations: [ExaminationListComponent, ExaminationHomeComponent, ExaminationAddComponent, ExaminationDeleteComponent,
    ExaminationCalendarComponent, ExaminationReviewsComponent, ExaminationSettingsComponent, ExaminationStudentComponent]
})
export class ExaminationModule {

}
