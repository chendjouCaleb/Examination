import {Component, Input, OnInit, Optional} from '@angular/core';
import {LevelSpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {LevelSpecialityLoader, SpecialityLoader} from 'examination/loaders';
import {Level, Speciality} from 'examination/entities';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'level-speciality-add.html',
  selector: 'app-level-speciality-add'
})
export class LevelSpecialityAdd implements OnInit {
  @Input()
  level: Level;

  speciality: Speciality;

  specialities = new List<Speciality>();

  constructor(private _httpClient: LevelSpecialityHttpClient,
              private _specialityLoader: SpecialityLoader,
              private _alertEmitter: AlertEmitter,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Optional() private _modal: MsfModalRef<LevelSpecialityAdd>) {
  }

  async ngOnInit(): Promise<void> {
    await this._specialityLoader.loadByDepartment(this.level.department);
    const specialities = this.level.department.specialities.clone();
    specialities.removeIf(s => this.level.levelSpecialities.containsIf(ls => ls.speciality.id === s.id));

    this.specialities = specialities;
  }

  async add() {
    const levelSpeciality = await this._httpClient.addLevelSpeciality(this.level, this.speciality);
    await this._levelSpecialityLoader.load(levelSpeciality);

    this.speciality.addLevelSpeciality(levelSpeciality);
    this.level.addLevelSpeciality(levelSpeciality);

    this._alertEmitter.info(`La spécialité ${this.speciality.name}  a été ajoutée au niveau ${this.level.index + 1}!`);

    if (this._modal) {
      this._modal.close(levelSpeciality);
    }
  }
}
