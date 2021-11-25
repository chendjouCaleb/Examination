import {NgModule} from '@angular/core';
import {SemesterLevelResolver} from "./semester-level.resolver";
import {SemesterLevelSpecialityResolver} from "./semester-level-speciality.resolver";
import {SemesterSpecialityResolver} from "./semester-speciality.resolver";
import {SemesterDepartmentResolver} from "./semester-department.resolver";
import {SemesterResolver} from "./semester.resolver";

@NgModule({
  providers: [SemesterResolver, SemesterDepartmentResolver, SemesterLevelResolver, SemesterSpecialityResolver,
    SemesterLevelSpecialityResolver]
})
export class SemesterModule {

}
