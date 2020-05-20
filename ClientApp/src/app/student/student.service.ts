import {Student, StudentHttpClient} from "examination/models";
import {StudentEditComponent} from "examination/app/student/edit/student-edit.component";
import {StudentUserLink} from "examination/app/student/user-link/student-user-link";
import {StudentSpeciality} from "examination/app/student/speciality/student-speciality";
import {StudentRegistrationId} from "examination/app/student/registrationId/student-registrationId";
import {Injectable} from "@angular/core";
import {MsfModal} from "fabric-docs";
import {AlertEmitter, Confirmation} from "examination/controls";

@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _httpClient: StudentHttpClient, private _alertEmitter: AlertEmitter) {
  }

  edit(student: Student) {
    const modal = this._dialog.open(StudentEditComponent, {disableClose: false});
    modal.componentInstance.student = student;
  }

  link(student: Student) {
    const modal = this._dialog.open(StudentUserLink, {disableClose: false});
    modal.componentInstance.student = student;
  }

  removeUser(student: Student) {
    const result = this._confirmation.open("Voulez-vous supprimer la liaison entre l'étudiant et l'utilisateur");
    result.accept.subscribe(async () => {
      await this._httpClient.changeUserId(student, '');
      student.user = null;
      student.userId = null;
      this._alertEmitter.info('La liaison a été supprimée!');
    });
  }

  removeSpeciality(student: Student) {
    const result = this._confirmation
      .open(`Voulez-vous enlever l'étudiant ${student.fullName} de la spécialité ${student.speciality?.name}`);
    result.accept.subscribe(async () => {
      await this._httpClient.removeSpeciality(student);
      this._alertEmitter.info(`L'étudiant ${student.fullName} a été enlevé de la spécialité ${student.speciality?.name}`);
      student.speciality = null;
      student.specialityId = null;
    });
  }

  changeSpeciality(student: Student) {
    const modal = this._dialog.open(StudentSpeciality, {disableClose: true});
    modal.componentInstance.student = student;
  }

  changeRegistrationId(student: Student) {
    const modal = this._dialog.open(StudentRegistrationId, {disableClose: true});
    modal.componentInstance.student = student;
  }

}
