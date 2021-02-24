import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';

import {
  ExaminationDepartmentResolver,
  ExaminationLevelResolver, ExaminationLevelSpecialityResolver,
  ExaminationSpecialityResolver, TestResolver
} from 'examination/app/components';
import {MsfModalModule} from 'fabric-docs';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./school/examination-school.page.module').then(e => e.ExaminationSchoolPageModule)
  },
  {
    path: 'departments/:examinationDepartmentId', resolve: [ExaminationDepartmentResolver],
    loadChildren: () => import('./department/examination-department.page.module')
      .then(e => e.ExaminationDepartmentPageModule)
  },

  {
    path: 'departments/:examinationDepartmentId/levels/:examinationLevelId',
    resolve: [ExaminationDepartmentResolver, ExaminationLevelResolver],
    loadChildren: () => import('./level/examination-level.page.module')
      .then(e => e.ExaminationLevelPageModule)
  },

  {
    path: 'departments/:examinationDepartmentId/specialities/:examinationSpecialityId',
    resolve: [ExaminationDepartmentResolver, ExaminationSpecialityResolver],
    loadChildren: () => import('./speciality/examination-speciality.page.module')
      .then(e => e.ExaminationSpecialityPageModule)
  },

  {
    path: 'departments/:examinationDepartmentId/specialities/:examinationSpecialityId/levels/:examinationLevelSpecialityId',
    resolve: [ExaminationDepartmentResolver, ExaminationSpecialityResolver, ExaminationLevelSpecialityResolver],
    loadChildren: () => import('./level-speciality/examination-level-speciality.page.module')
      .then(e => e.ExaminationLevelSpecialityPageModule)
  },

  {
    path: 'departments/:examinationDepartmentId/levels/:examinationLevelId/specialities/:examinationLevelSpecialityId',
    resolve: [ExaminationDepartmentResolver, ExaminationLevelResolver, ExaminationLevelSpecialityResolver],
    loadChildren: () => import('./level-speciality/examination-level-speciality.page.module')
      .then(e => e.ExaminationLevelSpecialityPageModule)
  },

  {
    path: 'departments/:examinationDepartmentId/levels/:examinationLevelId/tests/:testId',
    resolve: [ExaminationDepartmentResolver, ExaminationLevelResolver, TestResolver],
    loadChildren: () => import('./test/test.page.module').then(e => e.TestPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes), MsfModalModule]
})
export class ExaminationRoutingModule { }
