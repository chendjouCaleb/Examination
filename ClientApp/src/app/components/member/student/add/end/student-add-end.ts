import {Component} from '@angular/core';
import {StudentAdd} from '../student-add';
import {StudentAddModel, StudentHttpClient, StudentLoader} from 'examination/models';
import {AlertEmitter} from 'examination/controls';

@Component({
  templateUrl: 'student-add-end.html',
  selector: 'student-add-end'
})
export class StudentAddEnd {
  constructor(private parent: StudentAdd,
              private _httpClient: StudentHttpClient,
              private _loader: StudentLoader,
              private _alertEmitter: AlertEmitter) {}


  get model(): StudentAddModel {
    return this.parent.model;
  }

  async add() {
    const student = await this._httpClient.addStudent(this.model.body, this.model.params);

    this._alertEmitter.info(`L'étudiant ${student.fullName} a été ajouté!`);
    await this._loader.load(student);

    student.level = this.model.level;
    student.levelSpeciality = this.model.levelSpeciality;

    this.model.level?.students?.insert(0, student);
    this.model.levelSpeciality?.students.insert(0, student);


    if (this.parent._modalRef) {
      this.parent._modalRef.close(student);
    }
  }
}
