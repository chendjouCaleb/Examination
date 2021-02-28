import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlModule, MsfSelectModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfCheckboxModule, MsfRadioModule} from 'fabric-docs';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
import {CourseHourList} from './list/course-hour-list';
import {RouterModule} from '@angular/router';
import {CourseHourService} from './course-hour.service';
import {COURSE_HOUR_SERVICE_TOKEN} from './course-hour.service.interface';

@NgModule({
  imports: [ CommonModule, RouterModule, ControlModule, FormsModule, ReactiveFormsModule, MsButtonModule, MsTableModule,
    MsfCheckboxModule, MsfRadioModule, MsfSelectModule],

  declarations: [ CourseHourList ],
  exports: [ CourseHourList ],
  providers: [ CourseHourService, { provide: COURSE_HOUR_SERVICE_TOKEN, useExisting: CourseHourService}]
})
export class CourseHourModule {

}
