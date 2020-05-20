import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Examination,
  StudentHttpClient,
  StudentLoader,
  Room,
  RoomHttpClient,
  Speciality,
  SpecialityHttpClient, Student
} from "src/models";
import {StudentInfoForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'student-edit.component.html'
})
export class StudentEditComponent implements OnInit{
  form: StudentInfoForm;

  @Input()
  student: Student;

  constructor(private _httpClient: StudentHttpClient,
              private _dialogRef: MsfModalRef<StudentEditComponent>,
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

