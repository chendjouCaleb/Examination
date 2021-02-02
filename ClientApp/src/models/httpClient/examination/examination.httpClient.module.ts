import {NgModule} from '@angular/core';

import {ExaminationDepartmentHttpClient} from './examination-department.httpClient';
import {ExaminationLevelHttpClient} from './examination-level.httpClient';
import {ExaminationLevelSpecialityHttpClient} from './examination-level-speciality.httpClient';
import {ExaminationStudentHttpClient} from './examination-student.httpClient';
import {ExaminationHttpClient} from './examination.httpClient';
import {ExaminationSpecialityHttpClient} from './examination-speciality.httpClient';

@NgModule({
  providers: [ExaminationHttpClient, ExaminationDepartmentHttpClient, ExaminationLevelHttpClient,
    ExaminationLevelSpecialityHttpClient, ExaminationSpecialityHttpClient, ExaminationStudentHttpClient]
})
export class ExaminationHttpClientModule {

}
