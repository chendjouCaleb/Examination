import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Speciality, SpecialityHttpClient, Application, ApplicationHttpClient, User} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'application-speciality.html'
})
export class ApplicationSpeciality implements OnInit{
  @Input()
  application: Application;

  specialities = new List<Speciality>();
  speciality: Speciality;

  constructor(private _httpClient: ApplicationHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _dialogRef: MsfModalRef<ApplicationSpeciality>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    this.specialities = await this._specialityHttpClient.listByExamination(this.application.examination);
    this.speciality = this.specialities.find(s => s.id === this.application.specialityId);
  }

  async change() {
    await this._httpClient.changeSpeciality(this.application, this.speciality);
    this.application.speciality = this.speciality;
    this._alertEmitter.info(`La demande a migrée vers la spécialité ${this.speciality?.name}.`);
    this._dialogRef.close();
  }
}

