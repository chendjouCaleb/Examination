import {Teacher, TeacherHttpClient, TeacherLoader, Department} from 'examination/models';
import {Injectable} from '@angular/core';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {ITeacherService} from './teacher.service.interface';
import {TeacherAdd} from './add/teacher-add';
import {List} from '@positon/collections';
import {MsDialog} from '@ms-fluent/components';


@Injectable({providedIn: 'root'})
export class TeacherService implements ITeacherService {

  constructor(private _dialog: MsDialog, private _confirmation: Confirmation,
              private _loader: TeacherLoader,
              private _httpClient: TeacherHttpClient, private _alertEmitter: AlertEmitter) {
  }


  deleteTeacher(teacher: Teacher): Promise<boolean> {
    const result = this._confirmation.open('Voulez-vous Supprimer cet enseignant?');

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._httpClient.delete(teacher.id);
        teacher.department.teachers?.remove(teacher);
        this._alertEmitter.info('L\'enseignant a été supprimé!');
        resolve(true);
      });
      result.reject.subscribe(() => resolve(false));
    });
  }


  addTeachers(department: Department): Promise<List<Teacher>> {
    const modalRef = this._dialog.open(TeacherAdd, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
