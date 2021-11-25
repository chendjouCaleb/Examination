import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {
  YearDepartmentResolver,
  YearLevelResolver,
  YearLevelSpecialityResolver,
  YearSpecialityResolver
} from "../../components/year";

const routes: Routes = [
  {path: '', loadChildren: () => import('./school/year-school.page.module').then(m => m.YearSchoolPageModule)},
  {
    path: 'departments/:yearDepartmentId', resolve: [YearDepartmentResolver],
    loadChildren: () => import('./department/year-department.page.module').then(m => m.YearDepartmentPageModule)
  },
  {
    path: 'departments/:yearDepartmentId/levels/:yearLevelId',
    resolve: [YearDepartmentResolver, YearLevelResolver],
    loadChildren: () => import('./level/YearLevel.page.module').then(m => m.YearLevelPageModule)
  },
  {
    path: 'departments/:yearDepartmentId/specialities/:yearSpecialityId',
    resolve: [YearDepartmentResolver, YearSpecialityResolver],
    loadChildren: () => import('./speciality/YearSpeciality.page.module').then(m => m.YearSpecialityPageModule)
  },
  {
    path: 'departments/:yearDepartmentId/levels/:yearLevelId/specialities/:yearLevelSpecialityId',
    resolve: [YearDepartmentResolver, YearLevelResolver, YearLevelSpecialityResolver],
    loadChildren: () => import('./level-speciality/YearLevelSpeciality.page.module')
      .then(m => m.YearLevelSpecialityPageModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class YearPageModule {

}
