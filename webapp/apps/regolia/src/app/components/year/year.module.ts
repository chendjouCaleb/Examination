import {NgModule} from '@angular/core';
import {YearResolver} from './year.resolver';
import {YearDepartmentResolver} from "./year-department.resolver";
import {YearLevelResolver} from "./year-level.resolver";
import {YearSpecialityResolver} from "./year-speciality.resolver";
import {YearLevelSpecialityResolver} from "./year-level-speciality.resolver";

@NgModule({
  providers: [YearResolver, YearDepartmentResolver, YearLevelResolver, YearSpecialityResolver,
    YearLevelSpecialityResolver]
})
export class YearModule {

}
