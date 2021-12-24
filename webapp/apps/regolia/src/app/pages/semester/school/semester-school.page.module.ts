import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSchoolHomePage} from "./home/SemesterSchoolHome.page";
import {SemesterSchoolPageLayout} from "./layout/SemesterSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {
  ExaminationModule,
  SemesterAddModule, SemesterCourseListModule,
  SemesterListModule, SemesterStudentListModule,
  SemesterTeacherListModule,
  SemesterTeacherModule
} from "@examination/components";
import {MomentModule} from "ngx-moment";
import {SemesterTeachersPage} from "./SemesterTeachers.page";
import {SemesterItemModule} from "../../../components/semester/item";
import {SemesterCoursePage} from "./SemesterCourse.page";
import {SemesterStudentsPage} from "./SemesterStudents.page";
import {SemesterExaminationPage} from "./SemesterExaminationPage";

const routes: Routes = [
  {
    path: '', component: SemesterSchoolPageLayout, children: [
      {path: '', component: SemesterSchoolHomePage, data: {label: 'home'}},
      {path: 'teachers', component: SemesterTeachersPage, data: {label: 'teachers'}},
      {path: 'courses', component: SemesterCoursePage, data: {label: 'courses'}},
      {path: 'students', component: SemesterStudentsPage, data: {label: 'students'}},
      {path: 'examinations', component: SemesterExaminationPage, data: {label: 'examinations'}},
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule, SemesterTeacherModule, MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule,
    MsActionMenuModule, SemesterTeacherListModule, SemesterItemModule, SemesterCourseListModule, SemesterStudentListModule, ExaminationModule],
  declarations: [SemesterSchoolHomePage, SemesterSchoolPageLayout, SemesterTeachersPage,
    SemesterCoursePage, SemesterStudentsPage, SemesterExaminationPage]
})
export class SemesterSchoolPageModule {

}
