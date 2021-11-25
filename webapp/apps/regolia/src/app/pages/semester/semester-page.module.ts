import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {
  YearDepartmentResolver,
  YearLevelResolver,
  YearLevelSpecialityResolver,
  YearSpecialityResolver
} from "../../components/year";
import {
  SemesterDepartmentResolver,
  SemesterLevelResolver,
  SemesterLevelSpecialityResolver,
  SemesterSpecialityResolver
} from "../../components/semester";

const routes: Routes = [
  {path: '', loadChildren: () => import('./school/semester-school.page.module').then(m => m.SemesterSchoolPageModule)},
  {
    path: 'departments/:semesterDepartmentId', resolve: [SemesterDepartmentResolver],
    loadChildren: () => import('./department/semester-department.page.module').then(m => m.SemesterDepartmentPageModule)
  },
  {
    path: 'departments/:semesterDepartmentId/levels/:yearLevelId',
    resolve: [SemesterDepartmentResolver, SemesterLevelResolver],
    loadChildren: () => import('./level/SemesterLevel.page.module').then(m => m.SemesterLevelPageModule)
  },
  {
    path: 'departments/:semesterDepartmentId/specialities/:semesterSpecialityId',
    resolve: [SemesterDepartmentResolver, SemesterSpecialityResolver],
    loadChildren: () => import('./speciality/SemesterSpeciality.page.module').then(m => m.SemesterSpecialityPageModule)
  },
  {
    path: 'departments/:semesterDepartmentId/levels/:semesterLevelId/specialities/:semesterLevelSpecialityId',
    resolve: [SemesterDepartmentResolver, SemesterLevelResolver, SemesterLevelSpecialityResolver],
    loadChildren: () => import('./level-speciality/SemesterLevelSpeciality.page.module')
      .then(m => m.SemesterLevelSpecialityPageModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class SemesterPageModule {

}
