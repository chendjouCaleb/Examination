﻿import {StudentEdit} from './edit/student-edit';
import {Level, LevelSpeciality, Student, StudentHttpClient, User} from 'examination/models';
import {StudentRegistrationId} from './registrationId/student-registrationId';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {StudentUserLink} from './user-link/student-user-link';
import {StudentAdd} from './add/student-add';
import {IStudentService} from './student.service.interface';
import {StudentLevel} from './level/student-level';
import {StudentDetails} from './details/student-details';
import {StudentSpeciality} from 'examination/app/components/member/student/speciality/student-speciality';

@Injectable({providedIn: 'root'})
export class StudentService implements IStudentService {

  constructor(private _dialog: MsfModal, private _confirmation: Confirmation,
              private _httpClient: StudentHttpClient, private _alertEmitter: AlertEmitter) {
  }

  addStudent(level: Level, levelSpeciality: LevelSpeciality): Promise<Student> {
    const modal = this._dialog.open(StudentAdd, {disableClose: false});
    modal.componentInstance.level = level;
    modal.componentInstance.levelSpeciality = levelSpeciality;

    return modal.afterClosed().toPromise();

  }

  detailsStudent(student: Student)  {
    const modal = this._dialog.open(StudentDetails, {disableClose: false});
    modal.componentInstance.student = student;
  }

  editStudent(student: Student): Promise<void> {
    const modal = this._dialog.open(StudentEdit, {disableClose: false});
    modal.componentInstance.student = student;
    return modal.afterClosed().toPromise();
  }

  link(student: Student): Promise<User> {
    const modal = this._dialog.open(StudentUserLink, {disableClose: false});
    modal.componentInstance.student = student;

    return modal.afterClosed().toPromise();
  }

  removeUser(student: Student): Promise<void> {
    const result = this._confirmation.open('Voulez-vous supprimer la liaison entre l\'étudiant et l\'utilisateur');

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.removeUserId(student);
        student.user = null;
        student.userId = null;
        this._alertEmitter.info('La liaison a été supprimée!');
        resolve();
      });
    })
  }

  removeLevelSpeciality(student: Student): Promise<boolean> {
    if (!student.levelSpeciality) {
      return Promise.resolve(true);
    }
    const speciality = student.levelSpeciality.speciality;
    const result = this._confirmation.open(`Enlever cet étudiant de la spécialité ${speciality?.name}`);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.removeLevelSpeciality(student);
        this._alertEmitter.info(`L'étudiant a été enlevé de la spécialité ${speciality?.name}`);
        student.levelSpeciality?.students?.remove(student);
        student.levelSpeciality = null;
        student.levelSpecialityId = null;
      });
      resolve(true);
    })
  }

  changeLevel(student: Student): Promise<boolean> {
    const modal = this._dialog.open(StudentLevel, {disableClose: true});
    modal.componentInstance.student = student;

    return modal.afterClosed().toPromise();
  }

  changeSpeciality(student: Student): Promise<boolean> {
    const modal = this._dialog.open(StudentSpeciality, {disableClose: true});
    modal.componentInstance.student = student;
    return modal.afterClosed().toPromise();
  }

  changeRegistrationId(student: Student): Promise<string> {
    const modal = this._dialog.open(StudentRegistrationId, {disableClose: true});
    modal.componentInstance.student = student;
    return modal.afterClosed().toPromise();
  }


  deleteStudent(student: Student): Promise<boolean> {
    const m = `Supprimer l'étudiant ${student.fullName}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(student.id);

        student.level.department.students?.remove(student);
        student.level.students?.remove(student);
        student.levelSpeciality?.students?.remove(student);
        resolve(true);
      });
      result.reject.subscribe(() => resolve(false));
    });
  }

}