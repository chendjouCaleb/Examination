 import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Student, StudentHttpClient} from "src/models";
import {StudentRegistrationIdForm} from "../student-form";
import {MsfModalRef} from "fabric-docs";


@Component({
  templateUrl: 'student-registrationId.html'
})
export class StudentRegistrationId implements OnInit {
  form: StudentRegistrationIdForm;

  @Input()
  student: Student;

  constructor(private _httpClient: StudentHttpClient,
              private _dialogRef: MsfModalRef<StudentRegistrationId, string>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    this.form = new StudentRegistrationIdForm(this.student);
  }

  async checkRegistrationId() {
    const registrationId = this.form.getControl("registrationId");
    if (registrationId.value.length > 3) {
      const student = await this._httpClient.findByRegistrationId(this.student.level.department.school, registrationId.value);

      if (student && student.id) {
        registrationId.addError("Le matricule est déjà utilisé par un autre étudiant!");
      }
    }
  }


  async change() {
    const model = this.form.getModel();
    await this._httpClient.changeRegistrationId(this.student, model.registrationId);

    this.student.registrationId = model.registrationId;
    this._alertEmitter.info(`Le matricule a été modifié.`);
    this._dialogRef.close(model.registrationId);
  }
}

