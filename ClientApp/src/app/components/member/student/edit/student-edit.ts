import {StudentInfoForm} from "../student-form";
import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Student, StudentHttpClient} from "src/models";
import {MsfModalRef} from "fabric-docs";




@Component({
  templateUrl: 'student-edit.html'
})
export class StudentEdit implements OnInit{
  form: StudentInfoForm;

  @Input()
  student: Student;

  constructor(private _httpClient: StudentHttpClient,
              private _dialogRef: MsfModalRef<StudentEdit>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.form = new StudentInfoForm(this.student);
  }



  async edit() {
    const model = this.form.getModel();
    await this._httpClient.update(this.student.id, model);

    this.student.fullName = model.fullName;
    this.student.gender = model.gender;
    this.student.birthDate= model.birthDate;
    this._alertEmitter.info(`L'étudiant ${this.student.fullName} a été modifié.`);
    this._dialogRef.close( );
  }
}

