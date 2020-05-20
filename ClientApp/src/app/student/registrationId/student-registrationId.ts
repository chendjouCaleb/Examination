import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Student, StudentHttpClient} from "src/models";
import {StudentRegistrationIdForm} from "../form";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'student-registrationId.html'
})
export class StudentRegistrationId implements OnInit{
  form: StudentRegistrationIdForm;

  @Input()
  student: Student;

  constructor(private _httpClient: StudentHttpClient,
              private _dialogRef: MsfModalRef<StudentRegistrationId>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.form = new StudentRegistrationIdForm(this.student);
  }



  async change() {
    const model = this.form.getModel();
    await this._httpClient.changeRegistrationId(this.student, model.registrationId);

    this.student.registrationId = model.registrationId;
    this._alertEmitter.info(`Le matricule a été modifié.`);
    this._dialogRef.close( );
  }
}

