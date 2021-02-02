import {ExaminationAdd} from './add/examination-add';
import {NgModule} from '@angular/core';
import {
  MsfButtonModule,
  MsfCheckboxModule,
  MsfIconModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule,
  MsfTableModule
} from 'fabric-docs';
import {RouterModule} from '@angular/router';
import {AppFormModule, ControlModule} from 'examination/controls';
import {CommonModule} from '@angular/common';
import {ExaminationDelete} from './delete/examination-delete';
import {ExaminationResolver} from './examination.resolver';
import {ExaminationService} from './examination.service';
import {EXAMINATION_SERVICE_TOKEN} from './examination.service.contract';
import {MomentModule} from 'ngx-moment';
import {ExaminationList} from './list/examination-list';
import {ExaminationDetails} from './details/examination-details';
import {ExaminationDepartmentItem} from './department-item/examination-department-item';
import {ExaminationStudentList} from './student-list/examination-student-list';
import {ExaminationDepartmentResolver} from "./examination-department.resolver";
import {ExaminationLevelItem} from "./level-item/examination-level-item";
import {ExaminationSpecialityItem} from "./speciality-item/examination-speciality-item";
import {ExaminationLevelResolver} from "./examination-level.resolver";
import {ExaminationSpecialityResolver} from "./examination-speciality.resolver";
import {ExaminationSpecialityLevelItem} from "./speciality-level-item/examination-speciality-level-item";
import {ExaminationLevelSpecialityItem} from "./level-speciality-item/examination-level-speciality-item";
import {ExaminationStudentDetails} from "./students-details/examination-student-details";
import {PaperModule} from "examination/app/components/paper";


@NgModule({
  imports: [CommonModule, RouterModule, MsfModalModule, AppFormModule, ControlModule, MsfPersonaModule, PaperModule,
    MsfIconModule, MsfButtonModule, MsfTableModule, MsfMenuModule, MsfCheckboxModule, MomentModule],
  declarations: [ExaminationAdd, ExaminationDelete, ExaminationList, ExaminationDetails, ExaminationDepartmentItem,
    ExaminationStudentList, ExaminationLevelItem, ExaminationSpecialityItem, ExaminationSpecialityLevelItem,
    ExaminationLevelSpecialityItem, ExaminationStudentDetails],
  exports: [ExaminationAdd, ExaminationDelete, ExaminationList, ExaminationDetails, ExaminationDepartmentItem,
    ExaminationStudentList, ExaminationLevelItem, ExaminationSpecialityItem, ExaminationSpecialityLevelItem,
    ExaminationLevelSpecialityItem, ExaminationStudentDetails],
  providers: [ExaminationResolver, ExaminationService, ExaminationDepartmentResolver,
    ExaminationLevelResolver, ExaminationSpecialityResolver,
    {provide: EXAMINATION_SERVICE_TOKEN, useExisting: ExaminationService}]
})
export class ExaminationModule {

}
