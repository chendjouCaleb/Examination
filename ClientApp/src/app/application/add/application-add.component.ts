import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {ApplicationHttpClient, ApplicationLoader, Examination, Speciality, SpecialityHttpClient} from "src/models";
import {ApplicationAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";


@Component({
  templateUrl: 'application-add.component.html'
})
export class ApplicationAddComponent implements OnInit{
  form: ApplicationAddForm;

  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  specialities: List<Speciality>;

  constructor(private _httpClient: ApplicationHttpClient,
              private _identity: AuthorizationManager,
              private _specialityHttpClient: SpecialityHttpClient,
              private _loader: ApplicationLoader,
              private _dialogRef: MsfModalRef<ApplicationAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.form = new ApplicationAddForm(this._identity.user);
    if(this.speciality){
      this.examination = this.speciality.examination;
      this.form.getControl("speciality").setValue(this.speciality);
    }else {
      this.specialities = await this._specialityHttpClient.listByExamination(this.examination);
    }
  }


  async add() {
    const model = this.form.getModel();

    let application = await this._httpClient.add(model.body, {...model.params, examinationId: this.examination.id});
    await this._loader.load(application);
    this._alertEmitter.info(`La demande a été déposée.`);
    this._dialogRef.close(application);
  }
}

