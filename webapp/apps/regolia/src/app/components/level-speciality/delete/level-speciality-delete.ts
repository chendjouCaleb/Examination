import {Component} from "@angular/core";
import {MsDialogRef} from "@ms-fluent/components";
import {LevelSpeciality} from "examination/entities";
import {LevelSpecialityHttpClient} from "@examination/http";
import {AlertEmitter} from "src/controls";

@Component({
  templateUrl: 'level-speciality-delete.html'
})
export class LevelSpecialityDelete {
  levelSpeciality: LevelSpeciality;

  constructor(private _dialogRef: MsDialogRef<LevelSpecialityDelete>,
              private _alertEmitter: AlertEmitter,
              private _httpClient: LevelSpecialityHttpClient) {
  }

  async delete() {
    await this._httpClient.delete(this.levelSpeciality.id);

    const message = `La spécialité ${this.levelSpeciality.speciality.name} a été
      enlevée du niveau ${this.levelSpeciality.level.index + 1}.`;

    this._alertEmitter.info(message);

    this.levelSpeciality.level?.department?.removeLevelSpeciality(this.levelSpeciality);
    this._dialogRef.close(true);
  }
}
