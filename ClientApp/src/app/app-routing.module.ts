import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationResolver, SchoolResolver} from 'examination/app/components';
import {LoadAuthorizationGuard} from "examination/app/authorization";


const routes: Routes = [
  {path: '', redirectTo: '/schools', pathMatch: 'full'},
  {
    path: 'schools', loadChildren: () => import('./pages/organisation/school/school.page.module').then(m => m.SchoolPageModule)
  },
  {
    path: 'schools/:schoolId/departments', canActivate: [ LoadAuthorizationGuard ],
    loadChildren: () => import('./pages/organisation/department/department.page.module').then(m => m.DepartmentPageModule)
  },

  {
    path: 'schools/:schoolId/departments/:departmentId/levels', canActivate: [ LoadAuthorizationGuard ],
    loadChildren: () => import('./pages/organisation/level/level.page.module').then(m => m.LevelPageModule)
  },

  {
    path: 'schools/:schoolId/departments/:departmentId/levels/:levelId/students', canActivate: [ LoadAuthorizationGuard ],
    loadChildren: () => import('./pages/organisation/student/student.page.module').then(m => m.StudentPageModule)
  },

  {
    path: 'schools/:schoolId/departments/:departmentId/specialities', canActivate: [ LoadAuthorizationGuard ],
    loadChildren: () => import('./pages/organisation/speciality/speciality.page.module').then(m => m.SpecialityPageModule)
  },

  {
    path: 'schools/:schoolId/examinations/:examinationId', resolve: [ SchoolResolver, ExaminationResolver],
    loadChildren: () => import('./pages/examination/examination-routing.module').then(m => m.ExaminationRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
