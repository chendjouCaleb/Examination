import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentListPage} from './list/student-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {StudentHomePage} from './home/student-home.page';
import {MomentModule} from 'ngx-moment';
import {StudentModule, StudentResolver} from 'src/app/student';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {path: '', component: StudentListPage},
  {path: ':studentId/home', component: StudentHomePage, resolve: [StudentResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, StudentModule, ExaminationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MatRippleModule, MsfTableModule,
    MsfIconModule, MsfMenuModule, MsfModalModule,
    RouterModule.forChild(routes)],
  declarations: [StudentListPage, StudentHomePage],
  providers: [StudentResolver]
})
export class StudentPageModule {

}
