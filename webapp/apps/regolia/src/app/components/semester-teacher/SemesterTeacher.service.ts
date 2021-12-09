import {Injectable} from "@angular/core";
import {Semester, SemesterDepartment, SemesterTeacher} from "@examination/entities";
import {SemesterTeacherHttpClient} from "@examination/http";
import {AlertEmitter, Confirmation} from "src/controls";
import {MsDialog} from "@ms-fluent/components";
import {SemesterTeacherDelete} from "./Delete/SemesterTeacherDelete";
import {SemesterTeacherAdd} from "./Add/SemesterTeacherAdd";
import {SemesterDepartmentTeacherAdd} from "./Add/SemesterDepartmentTeacherAdd";

@Injectable()
export class SemesterTeacherService {
  constructor(private _httpClient: SemesterTeacherHttpClient,
              private _alertEmitter: AlertEmitter,
              private _dialog: MsDialog,
              private _confirmation: Confirmation) {
  }

  deleteTeacher(semesterTeacher: SemesterTeacher): Promise<boolean> {
    const modalRef = this._dialog.open(SemesterTeacherDelete, {autoFocus: false, data: {semesterTeacher}});
    return modalRef.afterClosed().toPromise();
  }

  addSemesterTeachers(semester: Semester): Promise<SemesterTeacher[]> {
    const modalRef = this._dialog.open(SemesterTeacherAdd, {autoFocus: false, data: {semester}});
    return modalRef.afterClosed().toPromise();
  }

  addSemesterDepartmentTeachers(semesterDepartment: SemesterDepartment): Promise<SemesterTeacher[]> {
    const modalRef = this._dialog.open(SemesterDepartmentTeacherAdd, {autoFocus: false, data: {semesterDepartment}});
    return modalRef.afterClosed().toPromise();
  }
}
